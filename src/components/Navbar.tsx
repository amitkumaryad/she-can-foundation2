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
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => setIsAdminView(false)} 
          className="flex cursor-pointer items-center space-x-2 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-rose-600 text-white shadow-md shadow-rose-200">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              She Can<span className="text-rose-500">.</span>
            </span>
            <p className="-mt-1 font-sans text-[10px] font-semibold tracking-wider uppercase text-slate-400">
              Foundation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {isAdminView ? (
            <>
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden items-center space-x-1.5 rounded-full bg-rose-50 px-3 py-1 font-sans text-xs font-semibold text-rose-700 md:flex">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Admin Active</span>
                  </div>
                  <button
                    onClick={() => setIsAdminView(false)}
                    className="flex items-center space-x-1 rounded-lg px-3 py-2 font-display text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <UserCheck className="h-4 w-4 text-slate-500" />
                    <span className="hidden sm:inline">Apply Form</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="rounded-lg bg-slate-950 px-3.5 py-2 font-display text-xs font-bold text-white shadow-sm transition hover:bg-rose-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center space-x-1.5 rounded-lg bg-rose-50 px-3.5 py-2 font-display text-xs font-bold text-rose-600 transition hover:bg-rose-100"
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
                className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 font-display text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <LayoutDashboard className="h-4 w-4 text-slate-400" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={() => {
                  const formElement = document.getElementById("registration-form-section");
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hidden rounded-lg bg-rose-500 px-4 py-2 font-display text-xs font-bold text-white shadow-md shadow-rose-100 transition hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200 md:block"
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
