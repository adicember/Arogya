const iconProps = {
  viewBox: "0 0 24 24",
  width: 28,
  height: 28,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const steps = [
  {
    title: "Answer or upload",
    text: "A short survey about your cycle and how you feel, or an ultrasound image if you have one.",
    circle: "bg-rose-100 text-rose-700",
    num: "text-rose-300",
    icon: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    title: "See your likelihood",
    text: "Lower, Moderate or Higher, with a kind, plain explanation of what stood out.",
    circle: "bg-sage-100 text-sage-700",
    num: "text-sage-300",
    icon: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3.9 11.5 8.5 8.5 0 0 1 12.4 3 8.4 8.4 0 0 1 21 11.5z" />
        <path d="M12 14.5s-3-1.8-3-3.6a1.7 1.7 0 0 1 3-1.1 1.7 1.7 0 0 1 3 1.1c0 1.8-3 3.6-3 3.6z" />
      </>
    ),
  },
  {
    title: "Take the next step",
    text: "Find a gynecologist nearby and download a report to take along.",
    circle: "bg-[#FFF3D6] text-[#7A5200]",
    num: "text-[#E8C77A]",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="bg-sage-50 px-8 py-16 font-sans text-ink-900">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            How it works
          </h2>
          <p className="mt-2 text-base text-ink-700">
            Three easy steps, at your own pace. No account needed.
          </p>
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex flex-col items-center rounded-[28px] bg-white px-8 pb-8 pt-7 text-center shadow-[0_1px_2px_rgba(74,22,40,.06),0_8px_24px_rgba(74,22,40,.08)]"
            >
              <span
                className={`absolute left-5 top-4 font-display text-2xl font-semibold italic ${s.num}`}
              >
                {i + 1}
              </span>
              <span
                className={`grid h-20 w-20 place-items-center rounded-full ${s.circle}`}
              >
                <svg {...iconProps}>{s.icon}</svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
