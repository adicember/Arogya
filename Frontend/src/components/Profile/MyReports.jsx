import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

// Sample data until the backend exposes saved reports.
const reports = [
  { id: 1, type: "Survey", date: "14 Oct 2026", level: "high", note: "Irregular periods, extra hair growth, pimples" },
  { id: 2, type: "Ultrasound scan", date: "12 Oct 2026", level: "high", note: "Image saved to your account", confidence: "Medium" },
  { id: 3, type: "Survey", date: "20 Aug 2026", level: "moderate", note: "Irregular periods, mood swings" },
  { id: 4, type: "Survey", date: "02 Jun 2026", level: "low", note: "No strong signs in your answers" },
];

const levels = {
  high: { label: "Higher likelihood", pill: "bg-rose-100 text-rose-800 border-rose-200", bar: "bg-rose-300", text: "Higher" },
  moderate: { label: "Moderate likelihood", pill: "bg-[#FFF3D6] text-[#7A5A00] border-[#F3DFA2]", bar: "bg-[#E3C77E]", text: "Moderate" },
  low: { label: "Lower likelihood", pill: "bg-sage-100 text-sage-700 border-sage-300", bar: "bg-sage-300", text: "Lower" },
};

const barHeight = { high: "h-[84px]", moderate: "h-[56px]", low: "h-[32px]" };

// eslint-disable-next-line react/prop-types
const Icon = ({ className = "h-5 w-5", children }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Avatar = () => (
  <svg viewBox="0 0 72 72" className="h-[72px] w-[72px]" aria-hidden="true">
    <circle cx="36" cy="36" r="36" fill="#FAE3E8" />
    <path d="M14 72c2-16 12-22 22-22s20 6 22 22z" fill="#862949" />
    <path d="M20 34c0-14 8-20 16-20s16 6 16 20c0 4-1 10-2 12H22c-1-2-2-8-2-12z" fill="#4A1628" />
    <ellipse cx="36" cy="38" rx="12" ry="14" fill="#C98A64" />
    <circle cx="31" cy="38" r="1.4" fill="#2A1F24" />
    <circle cx="41" cy="38" r="1.4" fill="#2A1F24" />
    <path d="M32 45q4 3 8 0" fill="none" stroke="#862949" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { label: "My reports", icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />, active: true },
  { label: "Find a doctor", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> },
  { label: "Privacy & settings", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
];

const MyReports = () => {
  const [filter, setFilter] = useState("All");

  const email = localStorage.getItem("user_email") || "";
  const name = email ? email.split("@")[0] : "there";
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  if (!localStorage.getItem("user_id")) {
    return <Navigate to="/login" replace />;
  }

  const shown = reports.filter(
    (r) => filter === "All" || r.type.toLowerCase().startsWith(filter.toLowerCase())
  );
  const trend = [...reports].reverse();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-rose-50/60 to-paper px-4 py-10 font-sans text-ink-900 sm:px-8">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[196px]">
          <div className="rounded-[20px] border border-ink-200 bg-white p-5 text-center shadow-[0_4px_16px_rgba(74,22,40,.05)]">
            <div className="mx-auto w-fit">
              <Avatar />
            </div>
            <p className="mt-3 font-display text-lg font-semibold">Hi, {displayName}</p>
            <p className="truncate text-xs text-ink-500">{email}</p>
          </div>

          <nav className="rounded-[20px] border border-ink-200 bg-white p-1.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-2 text-left text-sm font-medium ${
                  item.active ? "bg-rose-50 text-rose-700" : "text-ink-700 hover:bg-ink-100"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    item.active ? "bg-rose-700 text-white" : "bg-ink-100"
                  }`}
                >
                  <Icon className="h-4 w-4">{item.icon}</Icon>
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-semibold">
                My <em className="text-rose-700">reports</em>
              </h1>
              <p className="mt-1 text-sm text-ink-700">Every check you&apos;ve saved, newest first.</p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/UltrasoundImage"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-[1.5px] border-rose-700 bg-white px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              >
                <Icon className="h-4 w-4">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </Icon>
                Upload ultrasound
              </Link>
              <Link
                to="/SurveyForm"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-rose-700 px-4 text-sm font-semibold text-white hover:bg-rose-800"
              >
                New survey
                <Icon className="h-4 w-4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </Icon>
              </Link>
            </div>
          </div>

          {/* Check-up banner */}
          <div className="mt-5 flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl bg-rose-700 p-4 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-700">
              <Icon>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </Icon>
            </span>
            <div className="min-w-[200px] flex-1">
              <p className="font-semibold">Your latest results suggest a check-up</p>
              <p className="text-sm text-rose-100">
                A gynecologist can look at this properly. We can help you find one nearby.
              </p>
            </div>
            <Link
              to="/find-care"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-rose-700"
            >
              Find a doctor
              <Icon className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </Icon>
            </Link>
          </div>

          {/* Trend */}
          <section className="mt-5 rounded-2xl border border-ink-200 bg-white p-5">
            <h2 className="text-sm font-semibold">How your results have changed</h2>
            <div className="mt-4 flex items-end justify-around gap-2">
              {trend.map((r) => (
                <div key={r.id} className="flex flex-col items-center gap-1 text-xs">
                  <div className={`w-[52px] rounded-t-xl rounded-b-md ${barHeight[r.level]} ${levels[r.level].bar}`} />
                  <span className="mt-1 font-medium">{levels[r.level].text}</span>
                  <span className="text-ink-500">{r.date.slice(3)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Filters */}
          <div className="mt-6 flex gap-2">
            {["All", "Survey", "Ultrasound"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-[36px] rounded-lg border px-3 text-sm font-semibold ${
                  filter === f
                    ? "border-rose-700 bg-rose-700 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:bg-ink-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <ul className="mt-4 space-y-3">
            {shown.map((r) => {
              const lv = levels[r.level];
              const isScan = r.type.startsWith("Ultrasound");
              return (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-[0_2px_10px_rgba(74,22,40,.04)]"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      isScan ? "bg-sage-100 text-sage-700" : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    <Icon>
                      {isScan ? (
                        <>
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </>
                      ) : (
                        <>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </>
                      )}
                    </Icon>
                  </span>

                  <div className="min-w-[200px] flex-1">
                    <p className="font-semibold">
                      {r.type} <span className="ml-1 text-xs font-normal text-ink-500">{r.date}</span>
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${lv.pill}`}>
                        {lv.label}
                      </span>
                      {r.confidence && (
                        <span className="text-xs text-ink-700">Confidence: {r.confidence}</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-ink-700">{r.note}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="button" className="min-h-[44px] px-2 text-sm font-semibold text-rose-700 hover:underline">
                      View
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-[1.5px] border-rose-700 bg-white px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      <Icon className="h-4 w-4">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </Icon>
                      Report
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-100"
                    >
                      <Icon className="h-4 w-4">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </Icon>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 flex items-center gap-2 rounded-xl bg-ink-100 px-4 py-3 text-xs text-ink-700">
            <Icon className="h-4 w-4 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </Icon>
            These are screening results, not a medical diagnosis. Share your report with a doctor
            to understand what they mean for you.
          </p>
        </main>
      </div>
    </div>
  );
};

export default MyReports;
