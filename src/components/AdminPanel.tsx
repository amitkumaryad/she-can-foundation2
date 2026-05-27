import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  ChevronDown, 
  Check, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Sparkles,
  RefreshCw,
  FolderOpen,
  PieChart as PieIcon,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Submission, AdminStats } from "../types";

interface AdminPanelProps {
  token: string;
}

export function AdminPanel({ token }: AdminPanelProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected Submission detail modal state
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  
  // Quick action states
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch admin content
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      // 1. Get submissions
      const submissionsRes = await fetch("/api/admin/submissions", { headers });
      if (!submissionsRes.ok) throw new Error("Could not fetch submissions database.");
      const listData = await submissionsRes.json();
      setSubmissions(listData);

      // 2. Get stats
      const statsRes = await fetch("/api/admin/stats", { headers });
      if (!statsRes.ok) throw new Error("Could not fetch database stats.");
      const chartsData = await statsRes.json();
      setStats(chartsData);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while loading administrative reports.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        alert("Failed to update status.");
      } else {
        // Success: update locally
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus as any } : s))
        );
        // Refresh statistical metrics
        const statsRes = await fetch("/api/admin/stats", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (statsRes.ok) {
          const updatedStats = await statsRes.json();
          setStats(updatedStats);
        }
        // Update currently selected modal view
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub((prev) => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle Delete
  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this applicant's form response permanently? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert("Could not delete submission.");
      } else {
        // Update local list
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub(null);
        }
        // Refresh stats
        const statsRes = await fetch("/api/admin/stats", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (statsRes.ok) {
          const updatedStats = await statsRes.json();
          setStats(updatedStats);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Submissions logic
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch = 
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTrack = trackFilter === "All" || s.track === trackFilter;
    const matchesExp = experienceFilter === "All" || s.experience === experienceFilter;
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;

    return matchesSearch && matchesTrack && matchesExp && matchesStatus;
  });

  // Recharts style definitions
  const TRACK_COLORS = ["#e11d48", "#6366f1", "#0ea5e9", "#10b981"];
  const EXP_COLORS = ["#f59e0b", "#6366f1", "#ec4899"];

  if (isLoading && submissions.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center space-y-3 font-sans text-slate-500">
        <RefreshCw className="h-8 w-8 animate-spin text-rose-500" />
        <p className="text-sm font-semibold">Retrieving secure foundation data...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Upper Title Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="font-sans text-xs font-bold tracking-wider uppercase text-rose-500 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Evaluation Command Console
          </span>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            She Can Admin Panel
          </h1>
          <p className="font-sans text-xs text-slate-500 mt-0.5">
            Real-time candidate registrations, pathways breakdown distributions, and applicant profile triage.
          </p>
        </div>
        <div>
          <button
            onClick={fetchData}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 font-display text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh Databases</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-rose-50 border border-rose-200 p-4 font-sans text-sm text-rose-800">
          <p className="font-bold">Error Accessing Data</p>
          <p>{error}</p>
        </div>
      )}

      {/* Metrics Dashboard Widgets (Stats Counter Cards) */}
      {stats && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-sans">
          {/* Card 1: Total registrations */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Total Applicants</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">{stats.total}</p>
              <span className="mt-1 text-[10px] text-slate-400 font-medium block">Form submissions in database</span>
            </div>
          </div>

          {/* Card 2: Pending registrations */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Pending Review</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                {submissions.filter((s) => s.status === "Pending").length}
              </p>
              <span className="mt-1 text-[10px] text-slate-400 font-medium block">Awaiting interviewer action</span>
            </div>
          </div>

          {/* Card 3: Contacted registrations */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Contacted Candidates</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                <Check className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                {submissions.filter((s) => s.status === "Contacted").length}
              </p>
              <span className="mt-1 text-[10px] text-slate-400 font-medium block">Outreach successfully performed</span>
            </div>
          </div>

          {/* Card 4: Main Track */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Dominant Pathway</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-base font-extrabold tracking-tight text-slate-900 truncate">
                {stats.tracks.length > 0 
                  ? [...stats.tracks].sort((a,b) => b.value - a.value)[0]?.name || "N/A"
                  : "N/A"
                }
              </p>
              <span className="mt-2 text-[10px] text-slate-400 font-medium block">Highly-requested course track</span>
            </div>
          </div>
        </div>
      )}

      {/* Visual Analytics Charts Panel */}
      {stats && stats.total > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 font-sans">
          {/* Chart 1: Interest pathways bar representation */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs lg:col-span-2">
            <h3 className="font-display text-xs font-bold tracking-wider uppercase text-slate-900 mb-4 flex items-center gap-1.5 label">
              <BookOpen className="h-4 w-4 text-rose-500" />
              Registration counts by Technical track
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="105%" height="100%">
                <BarChart data={stats.tracks} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', fontFamily: 'Inter' }} />
                  <Bar dataKey="value" fill="#f43f5e" radius={[4, 4, 0, 0]}>
                    {stats.tracks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRACK_COLORS[index % TRACK_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Experience Distribution (Donut Pie) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
            <h3 className="font-display text-xs font-bold tracking-wider uppercase text-slate-900 mb-4 flex items-center gap-1.5 label">
              <PieIcon className="h-4 w-4 text-indigo-500" />
              Registrants Background Experience
            </h3>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.experience}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats.experience.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={EXP_COLORS[index % EXP_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom legends */}
            <div className="mt-2 flex flex-wrap justify-between text-xs text-slate-600 font-semibold px-4">
              {stats.experience.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-1.5">
                  <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: EXP_COLORS[index % EXP_COLORS.length] }}></span>
                  <span className="text-[11px] text-slate-500">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Database Filter and Listing Section */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs">
        {/* Top filter Controls bar */}
        <div className="border-b border-slate-100 bg-slate-50/70 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search inputs */}
            <div className="relative max-w-md w-full font-sans">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search candidates by name, email, background statement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-3 font-sans text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition"
              />
            </div>

            {/* Dropdown filters block */}
            <div className="flex flex-wrap items-center gap-3 font-sans">
              <div className="flex items-center space-x-2">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Filter:</span>
              </div>

              {/* Filter 1: Track selection */}
              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none focus:border-rose-400 cursor-pointer"
              >
                <option value="All">All Pathways</option>
                <option value="Software Engineering">Software Eng.</option>
                <option value="UI/UX Design">UI/UX Strategy</option>
                <option value="Product Management">Product Mgt.</option>
                <option value="Data Science">Data Science</option>
              </select>

              {/* Filter 2: Experience level selection */}
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none focus:border-rose-400 cursor-pointer"
              >
                <option value="All">All Backgrounds</option>
                <option value="Student">Academic / Student</option>
                <option value="Career Changer">Career Change</option>
                <option value="Self-taught">Self-Taught</option>
              </select>

              {/* Filter 3: Status state selection */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none focus:border-rose-400 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Contacted">Contacted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database List rendering container */}
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-sans">
            <FolderOpen className="mx-auto h-10 w-10 text-slate-300 stroke-1 mb-2" />
            <p className="text-xs font-semibold">No target registrant matches the search criteria.</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Toggle filtering criteria or search keywords to locate documents.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-sans text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Technical Pathway</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4">Application Date</th>
                  <th className="px-6 py-4 text-center">Status Triage</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredSubmissions.map((s) => {
                  return (
                    <tr 
                      key={s.id} 
                      className={`transition duration-150 hover:bg-slate-50/80 ${
                        selectedSub?.id === s.id ? "bg-rose-50/30" : ""
                      }`}
                    >
                      {/* Name & Email detail columns */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <button
                            onClick={() => setSelectedSub(s)}
                            className="font-semibold text-slate-900 group flex items-center hover:text-rose-600 outline-none"
                          >
                            <span>{s.fullName}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 duration-150 ml-1" />
                          </button>
                          <span className="text-slate-400 mt-0.5 text-[11px] select-all">{s.email}</span>
                        </div>
                      </td>

                      {/* Pathway badge design column */}
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-600">
                          {s.track}
                        </span>
                      </td>

                      {/* Pathway badge design column */}
                      <td className="px-6 py-4">
                        <span className="text-slate-500 font-medium">{s.experience}</span>
                      </td>

                      {/* Submission Date formatted */}
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(s.submittedAt).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                        })}
                      </td>

                      {/* Inline Status selectors triage dropdown */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center">
                          <select
                            disabled={updatingId === s.id}
                            value={s.status}
                            onChange={(e) => handleUpdateStatus(s.id, e.target.value)}
                            className={`rounded-full px-3 py-1 font-sans text-[10px] font-bold outline-none cursor-pointer border ${
                              s.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-100"
                                : s.status === "Reviewed"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                                : "bg-emerald-50 text-emerald-700 border-emerald-100"
                            }`}
                          >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Reviewed">🔍 Reviewed</option>
                            <option value="Contacted">✉️ Contacted</option>
                          </select>
                        </div>
                      </td>

                      {/* Action Triggers trigger cell */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedSub(s)}
                            className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 font-semibold text-[10px] duration-150"
                          >
                            Open Review
                          </button>
                          <button
                            onClick={() => handleDeleteSubmission(s.id)}
                            className="rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 transition"
                            title="Delete Submission"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Candidate full details review panel details sheet */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs font-sans">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Header section block */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-slate-400 font-bold uppercase block">
                  CANDIDATE DOSSIER
                </span>
                <h3 className="font-display text-xl font-extrabold text-slate-900 mt-0.5">
                  {selectedSub.fullName}
                </h3>
                <p className="text-[11px] text-slate-400 block mt-0.5 select-all">{selectedSub.email}</p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="rounded-xl border border-slate-200 bg-slate-50 text-slate-600 p-2 text-xs font-bold transition hover:bg-slate-100"
              >
                Close View
              </button>
            </div>

            {/* Profile fields content block */}
            <div className="mt-6 space-y-6">
              {/* Metadata row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs leading-relaxed">
                <div>
                  <span className="text-slate-400 font-medium block">Technical Track Interest</span>
                  <span className="inline-block mt-1 rounded-md bg-rose-50 px-2 py-0.5 font-bold text-rose-600 border border-rose-100">
                    {selectedSub.track}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Candidate Background</span>
                  <span className="inline-block mt-1 font-bold text-slate-800">
                    {selectedSub.experience}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Register Time</span>
                  <span className="inline-block mt-1 text-slate-500 font-semibold">
                    {new Date(selectedSub.submittedAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}{" "}
                    {new Date(selectedSub.submittedAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Status & Quick Change */}
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <span className="text-slate-400 font-medium block text-xs">Evaluate and update candidate state:</span>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  {["Pending", "Reviewed", "Contacted"].map((st) => {
                    const isActive = selectedSub.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedSub.id, st)}
                        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                          st === "Pending"
                            ? isActive 
                              ? "bg-amber-500 text-white border-transparent" 
                              : "bg-amber-50 hover:bg-amber-100 text-amber-700"
                            : st === "Reviewed"
                            ? isActive 
                              ? "bg-indigo-600 text-white border-transparent" 
                              : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                            : isActive 
                            ? "bg-emerald-600 text-white border-transparent" 
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {st === "Pending" ? "🕒 Pending" : st === "Reviewed" ? "🔍 Reviewed" : "✉️ Contacted"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio / LinkedIn Link sheet */}
              {selectedSub.linkedin && (
                <div>
                  <span className="text-slate-400 font-semibold block text-xs">Professional Portfolio / LinkedIn profile</span>
                  <a
                    href={selectedSub.linkedin}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs px-3.5 py-2 font-semibold text-slate-700 duration-150"
                  >
                    <span>{selectedSub.linkedin}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500" />
                  </a>
                </div>
              )}

              {/* Motivation letter text block */}
              <div>
                <span className="text-slate-400 font-semibold block text-xs">Application Statement / Experience message:</span>
                <div className="mt-2 rounded-2xl bg-slate-50 p-5 border border-slate-200/50 leading-relaxed text-slate-700 text-xs text-left max-h-[250px] overflow-y-auto whitespace-pre-wrap font-sans">
                  "{selectedSub.message}"
                </div>
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <button
                onClick={() => {
                  handleDeleteSubmission(selectedSub.id);
                }}
                className="flex items-center space-x-1 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 px-3.5 py-2 text-xs font-bold transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Candidate</span>
              </button>

              <button
                onClick={() => setSelectedSub(null)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold duration-150"
              >
                Finished Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
