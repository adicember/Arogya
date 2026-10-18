import { Link } from "react-router-dom";

const avatars = [
  { bg: "#FAE3E8", skin: "#7A4B35", hair: "#2A1F24", top: "#3F8F82", bun: false },
  { bg: "#DCEEE9", skin: "#D9A68C", hair: "#6A203A", top: "#D97C8C", bun: false },
  { bg: "#FFF3D6", skin: "#B87A5C", hair: "#4F4249", top: "#6A203A", bun: true },
];

function Avatar({ bg, skin, hair, top, bun }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className="h-20 w-20 rounded-full border-2 border-rose-700"
      aria-hidden="true"
    >
      <rect width="80" height="80" fill={bg} />
      <path d="M12 80c0-16 12-24 28-24s28 8 28 24z" fill={top} />
      {bun && <circle cx="40" cy="14" r="9" fill={hair} />}
      <path d="M22 36c0-14 8-20 18-20s18 6 18 20v10H22z" fill={hair} />
      <ellipse cx="40" cy="42" rx="14" ry="16" fill={skin} />
      <path d="M30 40q3 3 6 0M44 40q3 3 6 0" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M35 50q5 4 10 0" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Testimonial() {
  return (
    <section className="px-4 py-10 font-sans sm:px-8">
      <div className="relative mx-auto flex max-w-[1152px] flex-col items-center gap-8 overflow-hidden rounded-[28px] bg-rose-700 px-8 py-10 text-white md:flex-row md:px-14">
        <span className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10" />

        <div className="relative flex shrink-0 -space-x-3">
          {avatars.map((a, i) => (
            <Avatar key={i} {...a} />
          ))}
        </div>

        <div className="relative flex-1 text-center md:text-left">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            You&apos;re not alone in wondering
          </h2>
          <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-rose-50">
            Lots of women have questions about their periods, skin or hair and
            aren&apos;t sure who to ask. Checking is a normal, caring thing to do
            for yourself.
          </p>
        </div>

        <Link
          to="/SurveyForm"
          className="relative inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
        >
          Start the survey
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default Testimonial;
