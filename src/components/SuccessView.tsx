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
      <div className="rounded-none border-2 border-slate-900 bg-white p-8 text-center shadow-2xl sm:p-12">
        {/* Animated Icon Checkmark - sharp border square layout */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-none bg-indigo-50 border-2 border-indigo-600 text-indigo-700">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <CheckCircle2 className="h-10 w-10 text-indigo-600" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="mt-6 inline-block rounded-none border border-emerald-200 bg-emerald-50 px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-emerald-800">
            Form Submitted Successfully
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-widest text-slate-900">
            Entry Confirmed
          </h2>
          <p className="mx-auto mt-2 max-w-md font-sans text-xs text-slate-500 uppercase tracking-wider">
            Thank you for registering at She Can Foundation.
          </p>
        </motion.div>

        {/* Detailed Ticket Summarycard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 overflow-hidden rounded-none border-2 border-slate-900 bg-slate-50 text-left"
        >
          <div className="bg-slate-900 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-widest uppercase text-slate-350">
                Application Receipt
              </span>
              <span className="font-mono text-xs text-indigo-305 text-indigo-300 font-bold uppercase tracking-wider">
                ID: {submissionData.id}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  <span className="inline-block rounded-none bg-indigo-50 px-2 py-0.5 font-sans text-[11px] font-bold text-indigo-700 border border-indigo-100 uppercase tracking-wider">
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
                  <span className="font-sans text-xs text-slate-600 font-semibold">
                    {new Date(submissionData.submittedAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-4">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Statement of Motivation
              </span>
              <p className="mt-1 line-clamp-2 font-sans text-xs italic text-slate-500">
                "{submissionData.message}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Informative notification banner */}
        <div className="mt-6 flex items-start space-x-2.5 rounded-none bg-indigo-50/70 p-4 text-left border border-indigo-200/70 font-sans text-xs text-slate-600">
          <Info className="mt-0.5 h-4.5 w-4.5 text-indigo-600 shrink-0" />
          <div className="leading-relaxed">
            <span className="font-semibold text-indigo-950 uppercase tracking-wider text-[10px] block mb-0.5">What happens next?</span>
            Our admissions and review coordinator will evaluate your background experience (<strong className="text-indigo-905 text-indigo-900">{submissionData.experience}</strong>), check your credentials, and send you next-step interview information to your inbox in 3–5 working days. Keep an eye on your spam folder too!
          </div>
        </div>

        {/* Return Trigger */}
        <button
          onClick={onReset}
          className="mt-8 flex w-full items-center justify-center space-x-2 rounded-none bg-slate-900 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-indigo-700 cursor-pointer"
        >
          <span>Submit Another Response</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
