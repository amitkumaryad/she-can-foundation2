import React from "react";
import { CheckCircle2, ArrowRight, User, Mail, Briefcase, Calendar, Info } from "lucide-react";
import { motion } from "motion/react";
import { Submission } from "../types";

interface SuccessViewProps {
  submissionData: Submission;
  onReset: () => void;
}

export function SuccessView({ submissionData, onReset }: SuccessViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl px-4 py-8"
    >
      <div className="rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-xl shadow-rose-100/40 sm:p-12">
        {/* Animated Icon Checkmark */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <CheckCircle2 className="h-12 w-12 text-rose-500" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="mt-6 inline-block rounded-full bg-emerald-50 px-3 py-1 font-sans text-xs font-bold text-emerald-700">
            Application Received Successfully
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Form Submitted Successfully!
          </h2>
          <p className="mx-auto mt-2 max-w-md font-sans text-sm text-slate-500">
            Thank you for registering. Your interest in partnering or studying at She Can Foundation is incredibly valuable.
          </p>
        </motion.div>

        {/* Detailed Ticket Summarycard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-left"
        >
          <div className="bg-slate-900 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400">
                Application Receipt
              </span>
              <span className="font-mono text-xs text-rose-400 font-bold">
                {submissionData.id}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start space-x-2.5">
                <User className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    Full Name
                  </span>
                  <span className="font-sans text-sm font-semibold text-slate-800">
                    {submissionData.fullName}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    Email Address
                  </span>
                  <span className="font-sans text-sm font-semibold text-slate-800 truncate block">
                    {submissionData.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Briefcase className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    Technical Track
                  </span>
                  <span className="inline-block rounded-md bg-rose-50 px-2 py-0.5 font-sans text-xs font-semibold text-rose-600 border border-rose-100">
                    {submissionData.track}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Calendar className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    Registered On
                  </span>
                  <span className="font-sans text-xs text-slate-600">
                    {new Date(submissionData.submittedAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-4">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Message Statement
              </span>
              <p className="mt-1 line-clamp-2 font-sans text-xs italic text-slate-500">
                "{submissionData.message}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Informative notification banner */}
        <div className="mt-6 flex items-start space-x-2.5 rounded-xl bg-blue-50/70 p-4 text-left border border-blue-100/60 font-sans text-xs text-slate-600">
          <Info className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
          <div>
            <span className="font-semibold text-blue-900 block">What happens next?</span>
            Our admissions and review coordinator will evaluate your background experience (<strong className="text-slate-800">{submissionData.experience}</strong>), check your credentials, and send you next-step interview information to your inbox in 3–5 working days. Keep an eye on your spam folder too!
          </div>
        </div>

        {/* Return Trigger */}
        <button
          onClick={onReset}
          className="mt-8 flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-900 py-3.5 font-display text-sm font-bold text-white shadow-md transition hover:bg-slate-800"
        >
          <span>Register/Submit Another Response</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
