import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf-8");
}

// Helpers for reading and writing submissions
interface Submission {
  id: string;
  fullName: string;
  email: string;
  track: string; // e.g., "Software Engineering", "Product Management", "UI/UX Design", "Data Science"
  experience: string; // e.g., "Student", "Career Changer", "Self-taught"
  linkedin: string;
  message: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Contacted";
}

function readSubmissions(): Submission[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading submissions", err);
    return [];
  }
}

function writeSubmissions(submissions: Submission[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing submissions", err);
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Admin Passcode
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "SheCan2026!";

// Helper to validate Admin Authorization Header
function getIsAuthorized(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "").trim();
  return token === "she-can-admin-authenticated-token-2026";
}

// === API ROUTES ===

// 1. Submit Application
app.post("/api/submissions", (req, res) => {
  try {
    const { fullName, email, track, experience, linkedin, message } = req.body;

    // Field Validation
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ error: "Please enter a valid full name (minimum 2 characters)." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    const validTracks = ["Software Engineering", "Product Management", "UI/UX Design", "Data Science"];
    if (!track || !validTracks.includes(track)) {
      return res.status(400).json({ error: "Please select a valid technical interest track." });
    }
    const validExp = ["Student", "Career Changer", "Self-taught"];
    if (!experience || !validExp.includes(experience)) {
      return res.status(400).json({ error: "Please select a valid background experience level." });
    }
    if (linkedin && !linkedin.startsWith("http://") && !linkedin.startsWith("https://") && !linkedin.includes("linkedin.com")) {
      return res.status(400).json({ error: "If provided, LinkedIn URL should be a valid URL link." });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: "Please provide a message or motivation statement (minimum 10 characters)." });
    }

    // Save to database/JSON file
    const submissions = readSubmissions();
    const newSubmission: Submission = {
      id: "sub_" + Math.random().toString(36).substr(2, 9),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      track,
      experience,
      linkedin: linkedin ? linkedin.trim() : "",
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: "Pending",
    };

    submissions.unshift(newSubmission);
    writeSubmissions(submissions);

    return res.status(201).json({
      success: true,
      message: "Form Submitted Successfully",
      data: newSubmission,
    });
  } catch (error: any) {
    console.error("Submission API Error:", error);
    return res.status(500).json({ error: "An internal server error occurred while processing your request." });
  }
});

// 2. Admin Login Verification
app.post("/api/admin/login", (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    return res.json({
      token: "she-can-admin-authenticated-token-2026",
      success: true,
    });
  } else {
    return res.status(401).json({ error: "Incorrect admin passcode. Please try again." });
  }
});

// 3. Get All Submissions (Admin Only)
app.get("/api/admin/submissions", (req, res) => {
  if (!getIsAuthorized(req)) {
    return res.status(403).json({ error: "Access denied. Unauthorized." });
  }
  const submissions = readSubmissions();
  return res.json(submissions);
});

// 4. Update Submission Status (Admin Only)
app.patch("/api/admin/submissions/:id/status", (req, res) => {
  if (!getIsAuthorized(req)) {
    return res.status(403).json({ error: "Access denied. Unauthorized." });
  }
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Reviewed", "Contacted"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const submissions = readSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Submission not found." });
  }

  submissions[index].status = status;
  writeSubmissions(submissions);
  return res.json({ success: true, submission: submissions[index] });
});

// 5. Delete Submission (Admin Only)
app.delete("/api/admin/submissions/:id", (req, res) => {
  if (!getIsAuthorized(req)) {
    return res.status(403).json({ error: "Access denied. Unauthorized." });
  }
  const { id } = req.params;
  const submissions = readSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);

  if (submissions.length === filtered.length) {
    return res.status(404).json({ error: "Submission not found." });
  }

  writeSubmissions(filtered);
  return res.json({ success: true, message: "Submission deleted successfully." });
});

// 6. Get Admin Portal Stats (Admin Only)
app.get("/api/admin/stats", (req, res) => {
  if (!getIsAuthorized(req)) {
    return res.status(403).json({ error: "Access denied. Unauthorized." });
  }
  const submissions = readSubmissions();

  // Count by Track
  const trackCounts: Record<string, number> = {
    "Software Engineering": 0,
    "Product Management": 0,
    "UI/UX Design": 0,
    "Data Science": 0,
  };
  // Count by Experience Level
  const experienceCounts: Record<string, number> = {
    "Student": 0,
    "Career Changer": 0,
    "Self-taught": 0,
  };
  // Count by status
  const statusCounts: Record<string, number> = {
    "Pending": 0,
    "Reviewed": 0,
    "Contacted": 0,
  };

  submissions.forEach((s) => {
    if (trackCounts[s.track] !== undefined) trackCounts[s.track]++;
    if (experienceCounts[s.experience] !== undefined) experienceCounts[s.experience]++;
    if (statusCounts[s.status] !== undefined) statusCounts[s.status]++;
  });

  // Submission Timeline (last 7 days counts - mock historical data filler to make it look full-fledged + actual real data combined)
  const timeline: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    timeline[dateStr] = 0;
  }

  submissions.forEach((s) => {
    const dateStr = s.submittedAt.split("T")[0];
    if (timeline[dateStr] !== undefined) {
      timeline[dateStr]++;
    } else {
      // Just in case it's older
      timeline[dateStr] = 1;
    }
  });

  const timelineData = Object.entries(timeline).map(([date, count]) => ({
    date,
    count,
  })).sort((a, b) => a.date.localeCompare(b.date));

  return res.json({
    total: submissions.length,
    tracks: Object.entries(trackCounts).map(([name, value]) => ({ name, value })),
    experience: Object.entries(experienceCounts).map(([name, value]) => ({ name, value })),
    statuses: Object.entries(statusCounts).map(([name, value]) => ({ name, value })),
    timeline: timelineData,
  });
});

// Configure Vite middleware or Static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
