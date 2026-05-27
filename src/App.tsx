import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Users, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  ArrowRight, 
  ArrowUpRight,
  ShieldAlert,
  Code,
  Palette,
  Compass,
  LineChart
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ApplicationForm } from "./components/ApplicationForm";
import { SuccessView } from "./components/SuccessView";
import { AdminPanel } from "./components/AdminPanel";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { Submission } from "./types";

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Completed application memory
  const [completedSubmission, setCompletedSubmission] = useState<Submission | null>(null);

  // Restore authentication from localStorage if it exists
  useEffect(() => {
    const savedToken = localStorage.getItem("she_can_admin_auth_token_2026");
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("she_can_admin_auth_token_2026", token);
    setIsAdminView(true);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setIsAdminView(false);
    localStorage.removeItem("she_can_admin_auth_token_2026");
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 selection:bg-rose-200">
      {/* 1. Header Navbar */}
      <Navbar
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        isLoggedIn={!!authToken}
        onLogout={handleLogout}
        openLoginModal={() => setIsLoginOpen(true)}
      />

      {/* 2. Main Page Content View */}
      {isAdminView && authToken ? (
        <main className="min-h-[70vh]">
          <AdminPanel token={authToken} />
        </main>
      ) : (
        <main className="min-h-[70vh]">
          {completedSubmission ? (
            /* Submission success visual ticket confirmation */
            <div className="py-12 bg-linear-to-b from-rose-50/30 to-transparent">
              <SuccessView
                submissionData={completedSubmission}
                onReset={() => setCompletedSubmission(null)}
              />
            </div>
          ) : (
            /* Normal candidate view (Landing Page Hero + Bento Grid Metrics + Registration Form) */
            <div>
              {/* Hero Banner Section */}
              <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
                {/* Visual grid blur backdrop decoration */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    {/* Animated pill button */}
                    <div className="mx-auto inline-flex items-center space-x-1.5 rounded-full bg-rose-50 px-3 py-1.5 font-sans text-xs font-semibold text-rose-600 transition duration-150 hover:bg-rose-100">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Empowering Diverse Careers in Tech</span>
                    </div>

                    <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl uppercase-tight">
                      Empathetic Mentoring<span className="text-rose-500">.</span><br />
                      Real Career Placement.
                    </h1>
                    
                    <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-slate-500 sm:text-lg">
                      She Can Foundation provides hands-on engineering internships, strategic career coaching, and industry study tracks to equip women and non-binary developers with high-demand professional skills.
                    </p>

                    <div className="mt-8 flex justify-center space-x-3 font-sans">
                      <button
                        onClick={() => {
                          const el = document.getElementById("registration-form-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center space-x-2 rounded-xl bg-slate-900 px-6 py-3.5 font-display text-sm font-bold text-white shadow-md shadow-slate-100 transition hover:bg-slate-800"
                      >
                        <span>Start Registration Form</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          const el = document.getElementById("pathways-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3.5 font-display text-sm font-semibold transition"
                      >
                        Explore Pathways
                      </button>
                    </div>
                  </div>

                  {/* Impact metrics bento highlights */}
                  <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-100 bg-slate-50/50 p-6 sm:p-8 shadow-xs">
                    <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4 font-sans">
                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">180+</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Alumni Placed</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">4 Core</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Syllabus Tracks</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">92%</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Employment Rate</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">20+</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Advisors & Coaches</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pathways deep-dive grid section */}
              <section id="pathways-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                  <span className="font-sans text-xs font-bold tracking-wider uppercase text-rose-500">Curriculums</span>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Structured Development Pathways
                  </h2>
                  <p className="mx-auto mt-2 max-w-md font-sans text-xs text-slate-500">
                    Find which pathway fits your goals best. Mentor coaches are assigned dynamically to suit your track.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans text-xs">
                  {/* Track 1 */}
                  <div className="rounded-2xl border border-slate-150/60 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500 border border-rose-100">
                        <Code className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-sm font-bold text-slate-900">Software Engineering</h3>
                      <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                        Learn foundational frontend, full stack systems, API services, Git controls, and database design.
                      </p>
                    </div>
                    <span className="mt-4 text-[10px] uppercase font-bold text-rose-500 tracking-wider">MAPPED PATH</span>
                  </div>

                  {/* Track 2 */}
                  <div className="rounded-2xl border border-slate-150/60 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 border border-indigo-100">
                        <Palette className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-sm font-bold text-slate-900">UI/UX Strategy & Usability</h3>
                      <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                        Design high-fidelity interactive wireframes, explore user research methodologies, typography pairing, and user journeys.
                      </p>
                    </div>
                    <span className="mt-4 text-[10px] uppercase font-bold text-indigo-500 tracking-wider">MAPPED PATH</span>
                  </div>

                  {/* Track 3 */}
                  <div className="rounded-2xl border border-slate-150/60 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500 border border-sky-100">
                        <Compass className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-sm font-bold text-slate-900">Product Management</h3>
                      <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                        Manage agile product backlogs, write product requirements, structure sprint cycles, and analyze metrics dashboards.
                      </p>
                    </div>
                    <span className="mt-4 text-[10px] uppercase font-bold text-sky-500 tracking-wider">MAPPED PATH</span>
                  </div>

                  {/* Track 4 */}
                  <div className="rounded-2xl border border-slate-150/60 bg-white p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 border border-emerald-100">
                        <LineChart className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-sm font-bold text-slate-900">Data Science & AI</h3>
                      <p className="mt-2 text-slate-500 font-medium leading-relaxed">
                        Perform mathematical model analysis, execute complex SQL retrievals, build dashboard visualizers, and master Python.
                      </p>
                    </div>
                    <span className="mt-4 text-[10px] uppercase font-bold text-emerald-500 tracking-wider">MAPPED PATH</span>
                  </div>
                </div>
              </section>

              {/* Registration Form container */}
              <section className="bg-slate-50/50 py-12 border-t border-slate-100">
                <ApplicationForm onSubmitSuccess={(data) => setCompletedSubmission(data)} />
              </section>
            </div>
          )}
        </main>
      )}

      {/* 3. Footer Bottom info */}
      <Footer
        setIsAdminView={setIsAdminView}
        openLoginModal={() => setIsLoginOpen(true)}
        isLoggedIn={!!authToken}
      />

      {/* Admin Login Modal security sheet */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
