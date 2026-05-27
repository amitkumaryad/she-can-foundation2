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
      <div className="overflow-hidden rounded-none border-2 border-slate-900 bg-white shadow-2xl">
        {/* Card Header Banner in Indigo */}
        <div className="bg-indigo-950 px-6 py-10 text-center text-white sm:px-10 relative">
          {/* Subtle Geometric Backing Element */}
          <div className="absolute top-0 right-0 w-24 h-24 border-[12px] border-indigo-900/30 -mr-6 -mt-6"></div>
          
          <span className="inline-flex items-center space-x-1.5 rounded-none border border-indigo-700 bg-indigo-900/50 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-indigo-200">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span>Apply Now • Cohort 2026</span>
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-wider sm:text-3xl">
            Candidate Registration
          </h2>
          <div className="my-3 w-12 h-1 bg-indigo-500 mx-auto"></div>
          <p className="mx-auto mt-2 max-w-sm font-sans text-xs text-indigo-250 leading-relaxed">
            Partner with dedicated, experienced tech coaches and secure a mapped development pathway.
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 sm:p-10">
          {/* Error Panel if Server returns error */}
          {serverError && (
            <div className="rounded-none bg-rose-50 border-l-4 border-rose-600 p-4 font-sans text-xs text-rose-800">
              <strong className="font-bold uppercase tracking-wider text-rose-950 block mb-1">Submission Failed</strong>
              {serverError}
            </div>
          )}

          {/* Grid Blocks for Personal Details */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* 1. Full name with custom border-b styling */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="fullName" className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Full Name <span className="text-indigo-605 text-indigo-600">*</span>
              </label>
              <div className="relative border-b-2 border-slate-200 focus-within:border-indigo-600 transition duration-150">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. Alex Rivera"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                    }
                  }}
                  className="block w-full py-3 pl-7 pr-3 font-sans text-sm text-slate-800 placeholder-slate-350 outline-none bg-transparent"
                />
              </div>
              {errors.fullName && (
                <p className="font-sans text-[11px] font-semibold text-rose-600">{errors.fullName}</p>
              )}
            </div>

            {/* 2. Email Address with border-b styling */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Email Address <span className="text-indigo-600">*</span>
              </label>
              <div className="relative border-b-2 border-slate-200 focus-within:border-indigo-600 transition duration-150">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  className="block w-full py-3 pl-7 pr-3 font-sans text-sm text-slate-800 placeholder-slate-350 outline-none bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="font-sans text-[11px] font-semibold text-rose-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* 3. Geometric Pathway Selector */}
          <div className="space-y-3.5 text-left">
            <span className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              1. Pathway Major Interest <span className="text-indigo-600">*</span>
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tracksConfig.map((t) => {
                const IconComp = t.icon;
                const isSelected = track === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTrack(t.id)}
                    className={`flex items-start space-x-3 rounded-none border-2 p-4 text-left transition duration-150 cursor-pointer ${
                      isSelected 
                        ? "border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600/10" 
                        : "border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none border ${
                      isSelected ? "bg-indigo-900 border-indigo-750 text-white" : "bg-white border-slate-200 text-slate-400"
                    }`}>
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className={`font-display text-xs font-bold uppercase tracking-wider ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {t.title}
                      </h4>
                      <p className="mt-1 font-sans text-[11px] text-slate-450 leading-tight">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Experience Level Section with sharp buttons */}
          <div className="space-y-3.5 text-left">
            <span className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              2. Technical Background Level <span className="text-indigo-600">*</span>
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {experienceConfig.map((exp) => {
                const isSelected = experience === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setExperience(exp.id)}
                    className={`rounded-none border-2 p-4 text-left transition duration-150 cursor-pointer ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/20"
                        : "border-slate-100 bg-slate-50/45 hover:bg-slate-50 hover:border-slate-350"
                    }`}
                  >
                    <span className={`block font-display text-xs font-bold uppercase tracking-wide ${isSelected ? "text-slate-900" : "text-slate-600"}`}>
                      {exp.title}
                    </span>
                    <span className="mt-1.5 block font-sans text-[11px] text-slate-400 leading-tight">
                      {exp.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. LinkedIn / Portfolio URL (Optional) */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="linkedin" className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Portfolios, GitHub OR LinkedIn link
              </label>
              <span className="font-sans text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Optional
              </span>
            </div>
            <div className="relative border-b-2 border-slate-200 focus-within:border-indigo-600 transition duration-150">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <Linkedin className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="url"
                id="linkedin"
                placeholder="https://linkedin.com/in/alexrivera"
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                  if (errors.linkedin) {
                    setErrors((prev) => ({ ...prev, linkedin: "" }));
                  }
                }}
                className="block w-full py-3 pl-7 pr-3 font-sans text-sm text-slate-800 placeholder-slate-350 outline-none bg-transparent"
              />
            </div>
            {errors.linkedin ? (
              <p className="font-sans text-[11px] font-semibold text-rose-600">{errors.linkedin}</p>
            ) : (
              <p className="font-sans text-[11px] text-slate-400">
                Optionally link your profile so evaluators can review engineering repositories.
              </p>
            )}
          </div>

          {/* 6. Message / Motivation Statement with block container */}
          <div className="space-y-1.5 font-sans text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="block font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                What drives you to join She Can? <span className="text-indigo-600">*</span>
              </label>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${
                message.length >= 10 ? "text-emerald-650 font-bold" : "text-slate-400"
              }`}>
                {message.length} characters
              </span>
            </div>
            <div className="relative border-2 border-slate-100 bg-slate-50/50 p-1 focus-within:border-indigo-600 transition">
              <textarea
                id="message"
                rows={4}
                placeholder="How will this mentorship help you reach your tech goals?"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: "" }));
                  }
                }}
                className="block w-full p-3 text-sm text-slate-800 placeholder-slate-400 outline-none resize-none bg-transparent"
              />
            </div>
            {errors.message && (
              <p className="text-[11px] font-semibold text-rose-600">{errors.message}</p>
            )}
          </div>

          {/* Informational Guidelines Card */}
          <div className="flex items-start space-x-3 rounded-none bg-slate-50 p-4 border border-slate-200 text-xs text-slate-500 leading-relaxed">
            <Info className="h-4.5 w-4.5 text-indigo-500 mt-0.5 shrink-0" />
            <p>
              By transmitting this form, you verify the accuracy of your answers. Reviewers and committee staff select candidates on a rolling basis. Women and gender-marginalized tech coders are prioritized.
            </p>
          </div>

          {/* Button Submit Trigger - Bold upper tracked geometric button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-display text-xs font-bold uppercase tracking-[0.22em] text-white py-4 px-6 transition-all duration-150 rounded-none cursor-pointer ${
              isSubmitting 
                ? "bg-slate-500 cursor-not-allowed" 
                : "bg-slate-900 hover:bg-indigo-700 active:bg-indigo-900 shadow-md"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating Entry...</span>
              </div>
            ) : (
              <span>Submit Inquiry</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
