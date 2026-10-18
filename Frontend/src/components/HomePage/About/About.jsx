import { Link } from "react-router-dom";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const tones = {
  rose: "bg-rose-100 text-rose-700",
  sage: "bg-sage-100 text-sage-700",
  amber: "bg-[#FFF3D6] text-[#7A5200]",
};

const signs = [
  {
    label: "Irregular or missed periods",
    tone: "rose",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  },
  {
    label: "Extra hair on face or body",
    tone: "sage",
    icon: (
      <>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </>
    ),
  },
  {
    label: "Pimples that won’t settle",
    tone: "amber",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="14.5" cy="9" r="1" />
        <circle cx="13" cy="14.5" r="1" />
      </>
    ),
  },
  {
    label: "Hair thinning",
    tone: "rose",
    icon: (
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    ),
  },
  {
    label: "Weight changes",
    tone: "sage",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="4" />
        <path d="M8 11a4 4 0 0 1 8 0" />
        <line x1="12" y1="11" x2="13.5" y2="8.5" />
      </>
    ),
  },
  {
    label: "Darker skin patches",
    tone: "amber",
    icon: (
      <>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </>
    ),
  },
  {
    label: "Mood swings",
    tone: "rose",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </>
    ),
  },
];

function About() {
  return (
    <section id="about-pcos" className="px-8 py-20 font-sans text-ink-900">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
            <h2 className="font-display text-4xl font-semibold leading-tight">
              What is PCOS?
            </h2>
            <p className="max-w-[746px] text-[17px] leading-[1.6] text-ink-700">
              Polycystic ovary syndrome (PCOS) is a common hormonal condition. It
              can affect your periods, skin, hair and weight, and sometimes
              fertility. Many women live with it for years without knowing, and
              it&apos;s very manageable once you do.
            </p>
          </div>
          <Link
            to="/AboutPCOS"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-rose-700 underline"
          >
            Learn about PCOS
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-5 rounded-[28px] bg-rose-50 p-9">
          <h3 className="text-xl font-semibold text-rose-800">
            Signs women often notice
          </h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {signs.map((s) => (
              <li
                key={s.label}
                className="flex flex-col items-start gap-3 rounded-[20px] bg-white px-4 py-[18px]"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[s.tone]}`}>
                  <svg {...iconProps}>{s.icon}</svg>
                </span>
                <span className="text-[15px] font-semibold leading-snug">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-2 text-[15px] text-ink-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              One sign on its own doesn&apos;t mean PCOS. If you notice several
              together, it&apos;s worth a gentle check.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
