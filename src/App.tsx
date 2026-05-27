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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
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
            <div className="py-12 bg-linear-to-b from-indigo-50/20 to-transparent">
              <SuccessView
                submissionData={completedSubmission}
                onReset={() => setCompletedSubmission(null)}
              />
            </div>
          ) : (
            /* Normal candidate view (Landing Page Hero + Bento Grid Metrics + Registration Form) */
            <div>
              {/* Hero Banner Section */}
              <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b-2 border-slate-900">
                {/* Visual grid backdrop decoration */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    {/* Geometric label pill */}
                    <div className="mx-auto inline-flex items-center space-x-1.5 rounded-none border-2 border-indigo-900 bg-indigo-50 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-widest text-indigo-900">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
                      <span>Empowerment through balance</span>
                    </div>

                    <h1 className="mt-8 font-display text-4xl font-extrabold tracking-wider text-slate-900 sm:text-5xl lg:text-6xl uppercase leading-none">
                      Structured Tech Mentoring<span className="text-indigo-600">.</span><br />
                      Empathetic Growth.
                    </h1>
                    
                    <p className="mx-auto mt-6 max-w-2xl font-sans text-xs sm:text-sm leading-relaxed text-slate-500 uppercase tracking-widest">
                      She Can Foundation provides rigorous client-authorized pathways, individual mentor pairing, and structural curricula to equip diverse coders.
                    </p>

                    <div className="mt-8 flex justify-center space-x-4 font-display">
                      <button
                        onClick={() => {
                          const el = document.getElementById("registration-form-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center space-x-2 rounded-none bg-slate-900 border-2 border-slate-900 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-indigo-900 hover:border-indigo-900 duration-150 cursor-pointer"
                      >
                        <span>Candidate Entry</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          const el = document.getElementById("pathways-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="rounded-none border-2 border-slate-205 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-700 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition duration-150 cursor-pointer"
                      >
                        Syllabi Outline
                      </button>
                    </div>
                  </div>

                  {/* Impact metrics geometric highlights block */}
                  <div className="mx-auto mt-16 max-w-5xl rounded-none border-2 border-slate-900 bg-white p-6 sm:p-8 relative">
                    {/* Sharp aesthetic frame corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-600 -mt-1 -ml-1"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-600 -mt-1 -mr-1"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-600 -mb-1 -ml-1"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-600 -mb-1 -mr-1"></div>

                    <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4 font-sans">
                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
                          <Users className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">180+</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">Alumni Output</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
                          <GraduationCap className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">4 Majors</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">Study Majors</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
                          <Briefcase className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">92%</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">Placement KPI</p>
                      </div>

                      <div>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
                          <TrendingUp className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">20+</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">Staff Advisers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pathways deep-dive grid section */}
              <section id="pathways-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                  <span className="font-display text-[10px] font-bold tracking-widest uppercase text-indigo-600 block">Syllabus Framework</span>
                  <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-widest text-slate-900 sm:text-3xl">
                    Structured Tech Pathways
                  </h2>
                  <div className="my-3 w-16 h-0.5 bg-indigo-600 mx-auto"></div>
                  <p className="mx-auto mt-2 max-w-sm font-sans text-xs text-slate-450 leading-relaxed">
                    Evaluators and staff coaches design targeted training modules customized for your track selection.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans text-xs">
                  {/* Track 1 */}
                  <div className="rounded-none border-2 border-slate-900 bg-white p-6 shadow-none flex flex-col justify-between hover:border-indigo-600 transition-colors duration-150">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <Code className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-slate-900">Software Engineering</h3>
                      <p className="mt-2 text-slate-500 leading-relaxed font-normal">
                        Fulfill web structures, asynchronous API clients, transactional storage, and modular systems.
                      </p>
                    </div>
                    <span className="mt-4 text-[9px] uppercase font-bold text-indigo-600 tracking-widest">MAJOR CURRICULUM</span>
                  </div>

                  {/* Track 2 */}
                  <div className="rounded-none border-2 border-slate-900 bg-white p-6 shadow-none flex flex-col justify-between hover:border-indigo-600 transition-colors duration-150">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <Palette className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-slate-900">UI/UX Strategy & Usability</h3>
                      <p className="mt-2 text-slate-500 leading-relaxed font-normal">
                        Coordinate design components, user maps, visual metrics, typography systems, and interaction layouts.
                      </p>
                    </div>
                    <span className="mt-4 text-[9px] uppercase font-bold text-indigo-600 tracking-widest">MAJOR CURRICULUM</span>
                  </div>

                  {/* Track 3 */}
                  <div className="rounded-none border-2 border-slate-900 bg-white p-6 shadow-none flex flex-col justify-between hover:border-indigo-600 transition-colors duration-150">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <Compass className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-slate-900">Product Management</h3>
                      <p className="mt-2 text-slate-500 leading-relaxed font-normal">
                        Author comprehensive requirements, organize sprint schedules, trace target user KPI matrices.
                      </p>
                    </div>
                    <span className="mt-4 text-[9px] uppercase font-bold text-indigo-600 tracking-widest">MAJOR CURRICULUM</span>
                  </div>

                  {/* Track 4 */}
                  <div className="rounded-none border-2 border-slate-900 bg-white p-6 shadow-none flex flex-col justify-between hover:border-indigo-600 transition-colors duration-150">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <LineChart className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-slate-900">Data Science & AI</h3>
                      <p className="mt-2 text-slate-500 leading-relaxed font-normal">
                        Apply statistical models, formulate structured SQL, execute clean analytical visualizations.
                      </p>
                    </div>
                    <span className="mt-4 text-[9px] uppercase font-bold text-indigo-600 tracking-widest">MAJOR CURRICULUM</span>
                  </div>
                </div>
              </section>

              {/* Registration Form container */}
              <section className="bg-slate-50/50 py-16 border-t-2 border-slate-900">
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
