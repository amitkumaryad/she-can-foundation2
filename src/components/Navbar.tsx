import React from "react";
import { Sparkles, LayoutDashboard, UserCheck, ShieldCheck } from "lucide-react";

interface NavbarProps {
  isAdminView: boolean;
  setIsAdminView: (view: boolean) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  openLoginModal: () => void;
}

export function Navbar({
  isAdminView,
  setIsAdminView,
  isLoggedIn,
  onLogout,
  openLoginModal,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo with sharp geometric symbol */}
        <div 
          onClick={() => setIsAdminView(false)} 
          className="flex cursor-pointer items-center space-x-3 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-950 text-white border-2 border-indigo-900">
            <div className="w-4 h-4 border-2 border-indigo-400 rotate-45"></div>
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-wider uppercase text-slate-900 sm:text-xl">
              She Can<span className="text-indigo-600">.</span>
            </span>
            <p className="-mt-1 font-sans text-[9px] font-semibold tracking-[0.16em] uppercase text-slate-400">
              Foundation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 text-xs">
          {isAdminView ? (
            <>
              {isLoggedIn ? (
                <div className="flex items-center space-x-3 font-sans">
                  <div className="hidden items-center space-x-1.5 rounded-none border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-800 md:flex">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span className="uppercase tracking-wider">Staff Active</span>
                  </div>
                  <button
                    onClick={() => setIsAdminView(false)}
                    className="flex items-center space-x-1 rounded-none border border-slate-200 px-3 py-2 font-display text-xs font-bold tracking-wider uppercase text-slate-700 transition hover:bg-slate-50"
                  >
                    <UserCheck className="h-4 w-4 text-slate-500" />
                    <span className="hidden sm:inline">Apply Form</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="rounded-none bg-slate-950 px-3.5 py-3 font-display text-xs font-bold uppercase tracking-widest text-white transition hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center space-x-1.5 rounded-none bg-indigo-50 border border-indigo-100 px-3.5 py-2.5 font-display text-xs font-bold tracking-wider uppercase text-indigo-700 transition hover:bg-indigo-100"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Verify Passcode</span>
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setIsAdminView(true);
                  } else {
                    openLoginModal();
                  }
                }}
                className="flex items-center space-x-1.5 rounded-none border-2 border-slate-200 bg-white px-3.5 py-2.5 font-display text-[11px] font-bold uppercase tracking-wider text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-slate-400" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={() => {
                  const formElement = document.getElementById("registration-form-section");
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hidden rounded-none bg-indigo-900 border border-indigo-700 px-5 py-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-indigo-950 md:block"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
