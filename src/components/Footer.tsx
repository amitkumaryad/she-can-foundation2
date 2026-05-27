import React from "react";
import { Heart, Sparkles, LayoutDashboard } from "lucide-react";

interface FooterProps {
  setIsAdminView: (view: boolean) => void;
  openLoginModal: () => void;
  isLoggedIn: boolean;
}

export function Footer({ setIsAdminView, openLoginModal, isLoggedIn }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-100 bg-slate-50 py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-base font-bold text-slate-900">
                She Can Foundation
              </span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-slate-500">
              Empowering women and girls globally to step up, claim their space in mainstream technical industries, and craft future technologies. Supported by professional career mentors.
            </p>
          </div>

          {/* Col 2: Mission details */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Technical Pathways
            </h3>
            <ul className="mt-3 space-y-2 font-sans text-xs text-slate-500">
              <li>• Full Stack Software Development</li>
              <li>• Product Management & Design</li>
              <li>• Data Science & AI Architecture</li>
              <li>• UI/UX Strategy & Usability Research</li>
            </ul>
          </div>

          {/* Col 3: Portal Admin Access */}
          <div className="space-y-3 md:text-right">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 md:text-right">
              Portal Administration
            </h3>
            <p className="font-sans text-xs text-slate-500">
              Are you an evaluator or foundation administrator? Access database entries instantly.
            </p>
            <div className="flex pt-1 md:justify-end">
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setIsAdminView(true);
                  } else {
                    openLoginModal();
                  }
                }}
                className="flex items-center space-x-1 rounded-full bg-white px-3 py-1.5 font-display text-xs font-semibold text-slate-700 shadow-xs border border-slate-200 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <LayoutDashboard className="h-3 w-3 text-rose-500" />
                <span>Access Evaluation Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200/60 pt-6 font-sans text-xs text-slate-400 md:flex-row">
          <p>© 2026 She Can Foundation. All rights reserved.</p>
          <p className="mt-2 flex items-center md:mt-0">
            Designed with <Heart className="mx-1 h-3.5 w-3.5 fill-rose-500 text-rose-500" /> for the Full Stack Internship Evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
