import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Linkedin, 
  MessageSquare, 
  Code, 
  Sparkles, 
  Compass, 
  LineChart, 
  Palette,
  Loader2,
  CheckCircle2,
  Info
} from "lucide-react";
import { TrackType, ExperienceType, Submission } from "../types";

interface ApplicationFormProps {
  onSubmitSuccess: (data: Submission) => void;
}

export function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  // Form values state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState<TrackType>("Software Engineering");
  const [experience, setExperience] = useState<ExperienceType>("Student");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Validate fields on the client before request
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please input a valid email address.";
    }

    if (linkedin.trim()) {
      if (!linkedin.startsWith("http://") && !linkedin.startsWith("https://")) {
        newErrors.linkedin = "URL must start with http:// or https://";
      } else if (!linkedin.includes("linkedin.com") && !linkedin.includes("github.com")) {
        newErrors.linkedin = "Please enter a valid LinkedIn or Portfolio URL.";
      }
    }

    if (!message.trim()) {
      newErrors.message = "Please write a brief motivation statement.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Motivation statement must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Run client side checks
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          track,
          experience,
          linkedin,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "Failed to submit application. Please check input formats.");
      } else {
        // Success
        onSubmitSuccess(result.data);
      }
    } catch (err) {
      console.error("Submitting error", err);
      setServerError("Connecting to server failed. Please ensure the backend is running properly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper arrays for tracks with descriptions & icons
  const tracksConfig = [
    {
      id: "Software Engineering" as TrackType,
      title: "Software Engineering",
      desc: "Web dev, algorithms, databases, building full-scale systems.",
      icon: Code,
      accent: "border-rose-200 bg-rose-50 text-rose-500",
    },
    {
      id: "UI/UX Design" as TrackType,
      title: "UI/UX Strategy",
      desc: "User paths, branding, low/high-fidelity interactive wireframes.",
      icon: Palette,
      accent: "border-indigo-200 bg-indigo-50 text-indigo-500",
    },
    {
      id: "Product Management" as TrackType,
      title: "Product Mgt.",
      desc: "Agile sprints, user metrics research, product lifecycles.",
      icon: Compass,
      accent: "border-sky-200 bg-sky-50 text-sky-500",
    },
    {
      id: "Data Science" as TrackType,
      title: "Data Science",
      desc: "Insights extraction, SQL, exploratory modeling, trend charts.",
      icon: LineChart,
      accent: "border-emerald-200 bg-emerald-50 text-emerald-500",
    },
  ];

  const experienceConfig = [
    {
      id: "Student" as ExperienceType,
      title: "Academic / Student",
      sub: "In college or training bootcamp",
    },
    {
      id: "Career Changer" as ExperienceType,
      title: "Career Changer",
      sub: "Transitioning to tech roles",
    },
    {
      id: "Self-taught" as ExperienceType,
      title: "Self-Taught Dev",
      sub: "Individual project developer",
    },
  ];

  return (
    <div id="registration-form-section" className="mx-auto max-w-3xl px-4 py-12">
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/40">
        {/* Card Header Banner */}
        <div className="bg-slate-900 px-6 py-8 text-center text-white sm:px-10">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-rose-500/20 px-3 py-1 font-sans text-xs font-bold text-rose-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Apply Now • Cohort 2026</span>
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            She Can Foundation Internship
          </h2>
          <p className="mx-auto mt-2 max-w-md font-sans text-xs text-slate-300">
            Submit your candidate registration form to be paired with expert mentors and gain industry experience.
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 sm:p-10">
          {/* Error Panel if Server returns error */}
          {serverError && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 font-sans text-sm text-rose-800">
              <strong className="font-semibold text-rose-950 block mb-1">Submission Failed</strong>
              {serverError}
            </div>
          )}

          {/* Grid Blocks for Personal Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* 1. Full name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 transition">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. Maya Lin"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                    }
                  }}
                  className="block w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 font-sans text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>
              {errors.fullName && (
                <p className="font-sans text-xs font-medium text-rose-500">{errors.fullName}</p>
              )}
            </div>

            {/* 2. Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 transition">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  className="block w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 font-sans text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>
              {errors.email && (
                <p className="font-sans text-xs font-medium text-rose-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* 3. Segmented Interest Track Selector */}
          <div className="space-y-2.5">
            <span className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Choose a Technical Pathway <span className="text-rose-500">*</span>
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tracksConfig.map((t) => {
                const IconComp = t.icon;
                const isSelected = track === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTrack(t.id)}
                    className={`flex items-start space-x-3 rounded-2xl border p-4 text-left transition duration-200 cursor-pointer ${
                      isSelected 
                        ? "border-rose-500 bg-rose-50/40 ring-1 ring-rose-500/30 shadow-xs" 
                        : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-transparent ${
                      isSelected ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className={`font-display text-sm font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {t.title}
                      </h4>
                      <p className="mt-0.5 font-sans text-xs text-slate-500 leading-tight">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Experience Level Section */}
          <div className="space-y-2.5">
            <span className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Your Current Experience / Background <span className="text-rose-500">*</span>
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {experienceConfig.map((exp) => {
                const isSelected = experience === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setExperience(exp.id)}
                    className={`rounded-2xl border p-4 text-center transition cursor-pointer ${
                      isSelected
                        ? "border-rose-500 bg-rose-50/20 ring-1 ring-rose-500/30"
                        : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <span className={`block font-display text-sm font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                      {exp.title}
                    </span>
                    <span className="mt-0.5 block font-sans text-[11px] text-slate-500 leading-tight">
                      {exp.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. LinkedIn / Portfolio URL (Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="linkedin" className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
                LinkedIn / GitHub/ Portfolio URL
              </label>
              <span className="font-sans text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Optional
              </span>
            </div>
            <div className="relative rounded-xl border border-slate-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 transition">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Linkedin className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <input
                type="url"
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                  if (errors.linkedin) {
                    setErrors((prev) => ({ ...prev, linkedin: "" }));
                  }
                }}
                className="block w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 font-sans text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
            </div>
            {errors.linkedin ? (
              <p className="font-sans text-xs font-medium text-rose-500">{errors.linkedin}</p>
            ) : (
              <p className="font-sans text-[11px] text-slate-400">
                Helps us learn more about your technical portfolio, studies, or blog.
              </p>
            )}
          </div>

          {/* 6. Message / Motivation */}
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
                Statement of Motivation <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                message.length >= 10 ? "text-emerald-500" : "text-slate-400"
              }`}>
                {message.length} chars
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-1">
              Please share why you wish to join this program and what goals or skills you hope to accomplish.
            </p>
            <div className="relative rounded-xl border border-slate-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 transition">
              <div className="pointer-events-none absolute top-3 left-3">
                <MessageSquare className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <textarea
                id="message"
                rows={4}
                placeholder="e.g., I'm passionate about developing software to solve ecological challenges. I want to build clean React architectures, master server communication, and learn under structured engineering coaching..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: "" }));
                  }
                }}
                className="block w-full rounded-xl bg-transparent py-3 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none resize-none"
              />
            </div>
            {errors.message && (
              <p className="text-xs font-medium text-rose-500">{errors.message}</p>
            )}
          </div>

          {/* Informational Guidelines Card */}
          <div className="flex items-start space-x-2.5 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500">
            <Info className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <p>
              By submitting this form, you certify the information provided is correct. Admissions are granted on a rolling basis. All women/non-binary coders are strongly encouraged to submit.
            </p>
          </div>

          {/* Button Submit Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex w-full items-center justify-center space-x-2 rounded-xl py-4 font-display text-sm font-bold text-white shadow-md shadow-rose-200 transition ${
              isSubmitting 
                ? "bg-rose-400 cursor-not-allowed" 
                : "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 hover:shadow-lg hover:shadow-rose-300/40"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Your Application...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4.5 w-4.5" />
                <span>Submit Form Response</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
