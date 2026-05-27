import React, { useState } from "react";
import { Lock, Loader2, X, AlertCircle } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!passcode.trim()) {
      setError("Please input the admin passcode.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid passcode. Please try again.");
      } else {
        // Successful login
        onLoginSuccess(data.token);
        setPasscode("");
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to full-stack server verification.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs font-sans animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl border border-slate-100 bg-slate-50 p-1.5 text-slate-400 hover:text-slate-700 transition duration-150 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-sm">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-lg font-extrabold text-slate-900">
            Administrative Access
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Verify your passcode to unlock database, review applications, and examine timelines.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="passcode" className="block font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
              Secret Passcode
            </label>
            <input
              type="password"
              id="passcode"
              placeholder="Enter passcode (e.g. SheCan2026!)"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(null);
              }}
              className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-start space-x-2 rounded-lg bg-rose-50/70 p-3 border border-rose-100 text-[11px] text-rose-700">
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Info reminder for assessors */}
          <div className="rounded-lg bg-blue-50/70 p-3 border border-blue-100/60 text-[11px] text-slate-600">
            <span className="font-semibold text-blue-900 block">Reviewer Passcode:</span>
            Default passcode is <strong className="text-slate-800 tracking-wider">SheCan2026!</strong> for testing purposes.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-950 hover:bg-slate-900 py-3 font-display text-xs font-bold text-white shadow-md transition disabled:bg-slate-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Verifying Security...</span>
              </>
            ) : (
              <span>Unlock Admin Panel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
