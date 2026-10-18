/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BLOOD_GROUPS = [
  { value: 11, label: "A+" },
  { value: 12, label: "A-" },
  { value: 13, label: "B+" },
  { value: 14, label: "B-" },
  { value: 15, label: "O+" },
  { value: 16, label: "O-" },
  { value: 17, label: "AB+" },
  { value: 18, label: "AB-" },
];

const STEPS = [
  { title: "About you", sub: "Age, height, weight", blurb: "Just the basics." },
  { title: "Your periods", sub: "Cycle and length", blurb: "About your cycle." },
  { title: "How you feel", sub: "Skin, hair, mood", blurb: "Tick what applies to you." },
  { title: "Daily life", sub: "Food and exercise", blurb: "Everyday habits." },
  { title: "Review", sub: "Check and finish", blurb: "Make sure everything looks right." },
];

const YES_NO = {
  reg_periods: "Are your periods regular?",
  skin_darkening: "Are you noticing skin darkening recently?",
  excessive_hair_growth: "Do you have excessive body/facial hair growth?",
  hair_loss: "Do you have hair loss, thinning or baldness?",
  pimples: "Do you have pimples/acne on your face or jawline?",
  mood_swings: "Do you experience mood swings?",
  gained_weight: "Have you gained weight recently?",
  eat_fast_food: "Do you eat fast food regularly?",
  reg_exercise: "Do you exercise on a regular basis?",
};

const STEP_QUESTIONS = {
  1: [],
  2: ["skin_darkening", "excessive_hair_growth", "hair_loss", "pimples", "mood_swings"],
  3: ["gained_weight", "eat_fast_food", "reg_exercise"],
};

const initialForm = {
  age: "",
  blood_group: "",
  weight: "",
  height: "",
  reg_periods: true,
  period_months: "1",
  period_days: "",
  gained_weight: false,
  excessive_hair_growth: false,
  skin_darkening: false,
  hair_loss: false,
  pimples: false,
  eat_fast_food: false,
  reg_exercise: false,
  mood_swings: false,
};

const RANGES = {
  age: [10, 60],
  weight: [25, 200],
  height: [120, 210],
};

const inputBase =
  "w-full rounded-md border border-ink-300 bg-white px-4 py-3 text-ink-900 outline-none focus:border-rose-500 focus:shadow-focus";

const Icon = ({ children, className = "h-5 w-5" }) => (
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

const ArrowRight = () => (
  <Icon className="h-4 w-4">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

function Field({ label, hint, error, unit, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-900">{label}</span>
      <span className="relative block">
        {children}
        {unit && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-500">
            {unit}
          </span>
        )}
      </span>
      <span className={`mt-1.5 block text-sm ${error ? "text-[#9B2C3A]" : "text-ink-500"}`}>
        {error || hint}
      </span>
    </label>
  );
}

function YesNo({ question, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-ink-200 bg-white px-4 py-3">
      <span className="text-[15px] font-medium text-ink-900">{question}</span>
      <div className="flex overflow-hidden rounded-md border border-ink-300" role="group">
        {[
          [true, "Yes"],
          [false, "No"],
        ].map(([v, text]) => (
          <button
            key={text}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={`min-h-[40px] px-5 text-sm font-semibold transition-colors ${
              value === v ? "bg-rose-700 text-white" : "bg-white text-ink-700 hover:bg-rose-50"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function Girl({ skin = "#7A2D4A", className = "h-40 w-40" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <circle cx="80" cy="80" r="72" fill="#fff" opacity=".7" />
      <path d="M26 150c0-30 24-46 54-46s54 16 54 46z" fill={skin} />
      <path d="M52 70c0-26 12-40 28-40s28 14 28 40v26H52z" fill="#3A1824" />
      <ellipse cx="80" cy="76" rx="22" ry="26" fill="#C98D6F" />
      <path d="M64 70q5 5 11 0M85 70q5 5 11 0" stroke="#3A1824" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M72 88q8 6 16 0" stroke="#3A1824" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M58 56q22-22 44 0v-6q-22-24-44 0z" fill="#3A1824" />
    </svg>
  );
}

const PcosSurveyForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [dismissedSave, setDismissedSave] = useState(false);

  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));
  const setBool = (name) => (v) => setForm((f) => ({ ...f, [name]: v }));

  const rangeError = (name) => {
    if (!touched) return "";
    const v = form[name];
    const [min, max] = RANGES[name];
    if (v === "" || Number.isNaN(Number(v)) || Number(v) < min || Number(v) > max) {
      return `Enter a number from ${min} to ${max}.`;
    }
    return "";
  };

  const stepValid = () => {
    if (step === 0) {
      return (
        !["age", "weight", "height"].some((n) => {
          const v = Number(form[n]);
          return form[n] === "" || v < RANGES[n][0] || v > RANGES[n][1];
        }) && form.blood_group !== ""
      );
    }
    if (step === 1) {
      return form.period_days !== "" && Number(form.period_days) > 0 && form.period_months !== "";
    }
    return true;
  };

  const next = () => {
    setTouched(true);
    if (!stepValid()) return;
    setTouched(false);
    setStep((s) => s + 1);
  };

  const back = () => {
    setTouched(false);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const num = (n) => parseInt(form[n], 10) || 0;
    const flag = (n) => (form[n] ? 1 : 0);
    const preparedData = {
      age: num("age"),
      weight: num("weight"),
      height: num("height"),
      blood_group: num("blood_group"),
      period_months: num("period_months"),
      period_days: num("period_days"),
      gained_weight: flag("gained_weight"),
      excessive_hair_growth: flag("excessive_hair_growth"),
      skin_darkening: flag("skin_darkening"),
      hair_loss: flag("hair_loss"),
      pimples: flag("pimples"),
      eat_fast_food: flag("eat_fast_food"),
      reg_exercise: form.reg_exercise ? 0 : 1, // reversed logic expected by the model
      mood_swings: flag("mood_swings"),
      reg_periods: flag("reg_periods"),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8801/predict-pcos", preparedData);
      setPrediction(response.data.prediction);
      await axios.post("http://localhost:8801/update_pcos", {
        prediction: response.data.prediction,
        user_id: localStorage.getItem("user_id"),
      });
    } catch (err) {
      console.error("Error making prediction:", err);
      if (!prediction) setError("We couldn't get your result just now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const retake = () => {
    setForm(initialForm);
    setPrediction(null);
    setStep(0);
    setTouched(false);
    setError("");
    setShowAnswers(false);
    setDismissedSave(false);
  };

  const yn = (v) => (v ? "Yes" : "No");
  const bloodLabel = BLOOD_GROUPS.find((b) => String(b.value) === String(form.blood_group))?.label;

  const answerRows = [
    ["Age", `${form.age} years`],
    ["Blood group", bloodLabel],
    ["Weight", `${form.weight} kg`],
    ["Height", `${form.height} cm`],
    ["Regular periods", yn(form.reg_periods)],
    ["Period comes every", `${form.period_months} month(s)`],
    ["Period lasts", `${form.period_days} days`],
    ...Object.keys(YES_NO)
      .filter((k) => k !== "reg_periods")
      .map((k) => [YES_NO[k], yn(form[k])]),
  ];

  const downloadReport = () => {
    const lines = [
      "PCOS Survey Report",
      "---------------------",
      ...answerRows.map(([k, v]) => `${k}: ${v}`),
      prediction ? `\nResult: ${prediction}` : "",
      "\nThis is a screening tool, not a medical diagnosis.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PCOS_Survey_Report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ---------------- Results ---------------- */
  if (prediction) {
    const higher = /may have/i.test(prediction);
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const months = parseInt(form.period_months, 10);

    const flagged = [
      !form.reg_periods && "Periods not regular",
      months > 1 && `Period every ${months} months`,
      form.excessive_hair_growth && "Excess hair growth",
      form.pimples && "Pimples on face or jawline",
      form.gained_weight && "Recent weight gain",
      form.mood_swings && "Mood swings",
      form.skin_darkening && "Darker skin patches",
      form.hair_loss && "Hair thinning",
      form.eat_fast_food && "Regular fast food",
      !form.reg_exercise && "Little regular exercise",
    ].filter(Boolean);

    const favourable = [
      form.reg_periods && "Regular periods",
      form.reg_exercise && "Exercises regularly",
      !form.eat_fast_food && "Little fast food",
    ].filter(Boolean);

    const chips = higher ? flagged : [...favourable, ...flagged.filter((c) => c === "Mood swings")];

    const tone = higher
      ? { hero: "bg-rose-100", badge: "bg-white text-rose-700", ring: "bg-rose-200", body: "#7A2D4A" }
      : { hero: "bg-sage-100", badge: "bg-white text-sage-700", ring: "bg-sage-300/50", body: "#3F8F82" };

    const cards = higher
      ? [
          { t: "Book a check-up", d: "A gynecologist or endocrinologist can confirm what’s going on with a few simple tests.", l: "Find a doctor nearby", to: "/find-care", c: "bg-rose-100 text-rose-700" },
          { t: "Take your report", d: "Download a one-page summary of your answers to show your doctor.", l: "Download report", onClick: downloadReport, c: "bg-[#FFF3D6] text-[#7A5200]" },
          { t: "Add an ultrasound", d: "If you have a scan, adding it gives a fuller picture.", l: "Upload a scan", to: "/UltrasoundImage", c: "bg-sage-100 text-sage-700" },
        ]
      : [
          { t: "Add an ultrasound", d: "If you have a scan, adding it gives a fuller picture.", l: "Upload a scan", to: "/UltrasoundImage", c: "bg-sage-100 text-sage-700" },
          { t: "Listen to your body", d: "If symptoms stay or change, a doctor can still check. Feel free to retake the survey any time.", l: "Find a doctor", to: "/find-care", c: "bg-rose-100 text-rose-700" },
          { t: "Keep a record", d: "Download your answers, or save them to see how things change over time.", l: "Download report", onClick: downloadReport, c: "bg-[#FFF3D6] text-[#7A5200]" },
        ];

    const linkCls = "inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 underline";

    return (
      <div className="bg-paper font-sans text-ink-900">
        <section className={`${tone.hero} px-4 py-14 sm:px-8`}>
          <div className="mx-auto flex max-w-[1152px] flex-col-reverse items-center justify-between gap-8 md:flex-row">
            <div className="max-w-[560px]">
              <p className="text-sm text-ink-700">Your survey result &middot; {today}</p>
              <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tone.badge}`}>
                {higher ? "Higher likelihood" : "Lower likelihood"}
              </span>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">
                {higher
                  ? "Your answers show signs often seen with PCOS"
                  : "Your answers suggest a lower likelihood of PCOS"}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                {higher
                  ? "Several features match PCOS patterns. We recommend booking a check-up."
                  : "Your answers suggest a lower likelihood of PCOS. If you still have symptoms, see a doctor."}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                {higher
                  ? "This isn’t a diagnosis, and you’re not alone. PCOS is common and very manageable once a doctor confirms it."
                  : "That’s good to hear. Keep noticing how you feel, and come back whenever something changes."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={higher ? "/find-care" : "/UltrasoundImage"}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-rose-700 px-5 py-3 font-semibold text-white hover:bg-rose-800"
                >
                  {higher ? "Find a doctor" : "Add an ultrasound"}
                </Link>
                <button
                  type="button"
                  onClick={downloadReport}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-rose-700 bg-white px-5 py-3 font-semibold text-rose-700 hover:bg-rose-50"
                >
                  Download report
                </button>
              </div>
            </div>
            <div className={`grid h-56 w-56 shrink-0 place-items-center rounded-full ${tone.ring}`}>
              <Girl skin={tone.body} className="h-48 w-48" />
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-[1152px] flex-col gap-8 px-4 py-10 sm:px-8">
          {chips.length > 0 && (
            <div className="rounded-[20px] border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(74,22,40,.06),0_8px_24px_rgba(74,22,40,.08)]">
              <h2 className="mb-4 font-display text-xl font-semibold">
                {higher ? "What stood out in your answers" : "From your answers"}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-800">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-500">
                These come from your answers. They&apos;re common with PCOS, but each one can have other causes too.
              </p>
            </div>
          )}

          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold">What to do next</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {cards.map((c) => (
                <div key={c.t} className="flex flex-col gap-3 rounded-[20px] border border-ink-200 bg-white p-6">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${c.c}`}>
                    <Icon>
                      <circle cx="12" cy="12" r="9" />
                      <path d="m9 12 2 2 4-4" />
                    </Icon>
                  </span>
                  <h3 className="font-semibold">{c.t}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-ink-700">{c.d}</p>
                  {c.to ? (
                    <Link to={c.to} className={linkCls}>
                      {c.l} <ArrowRight />
                    </Link>
                  ) : (
                    <button type="button" onClick={c.onClick} className={linkCls}>
                      {c.l} <ArrowRight />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {!dismissedSave && !localStorage.getItem("user_id") && (
            <div className="max-w-[560px] rounded-[20px] bg-sage-50 p-5">
              <p className="text-sm font-semibold">Want to keep this result? Create a free account to save it.</p>
              <p className="mt-1 text-xs text-ink-500">Not saved unless you create an account.</p>
              <div className="mt-3 flex items-center gap-4">
                <Link to="/signup" className="rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800">
                  Save result
                </Link>
                <button type="button" onClick={() => setDismissedSave(true)} className="text-sm font-semibold text-rose-700 underline">
                  No thanks
                </button>
              </div>
            </div>
          )}

          <div className="rounded-[20px] border border-ink-200 bg-white">
            <button
              type="button"
              onClick={() => setShowAnswers((s) => !s)}
              aria-expanded={showAnswers}
              className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
            >
              Your answers
              <span className="text-sm font-semibold text-rose-700 underline">{showAnswers ? "Hide" : "Show"}</span>
            </button>
            {showAnswers && (
              <dl className="grid gap-x-8 gap-y-2 border-t border-ink-200 px-6 py-4 text-sm sm:grid-cols-2">
                {answerRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="rounded-md bg-ink-100 px-4 py-3 text-sm text-ink-700">
            This is a screening tool, not a medical diagnosis.
          </div>
          <p className="text-sm text-[#3A5A9B]">For severe pain or heavy bleeding, seek urgent care.</p>

          <button type="button" onClick={retake} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-rose-700">
            <Icon className="h-4 w-4">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </Icon>
            Retake survey
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Survey ---------------- */
  const questions = STEP_QUESTIONS[step] || [];
  const monthsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-rose-50 to-paper px-4 py-12 font-sans text-ink-900 sm:px-8 lg:py-16">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-10 lg:flex-row lg:gap-14">
        {/* Left rail */}
        <aside className="w-full shrink-0 lg:w-[300px]">
          <p className="text-xs font-semibold text-rose-700">PCOS survey</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">
            A few gentle <em className="text-rose-700">questions</em>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            About 5 minutes. Answer what you know; you can go back any time.
          </p>

          <ol className="mt-6 hidden flex-col gap-1 lg:flex">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                  i === step ? "bg-white shadow-[0_1px_2px_rgba(74,22,40,.06),0_8px_24px_rgba(74,22,40,.08)]" : ""
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                    i === step ? "bg-rose-700 text-white" : i < step ? "bg-rose-200 text-rose-800" : "bg-ink-100 text-ink-700"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[13px] font-semibold leading-tight">{s.title}</span>
                  <span className="block text-[11px] leading-tight text-ink-500">{s.sub}</span>
                </span>
              </li>
            ))}
          </ol>

          {/* <div className="mt-6 hidden items-start gap-2 rounded-[14px] bg-sage-50 p-3 text-xs leading-relaxed text-ink-700 lg:flex">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-700">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </Icon>
            <span>
              Your answers stay on this device until you see your result. Nothing is saved unless you create an account.
            </span>
          </div> */}
        </aside>

        {/* Card */}
        <div className="min-w-0 flex-1 self-start rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(74,22,40,.16)] sm:p-10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold">{STEPS[step].title}</span>
            <span className="text-ink-500">Step {step + 1} of 5</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-200">
            <div className="h-full rounded-full bg-rose-700 transition-all" style={{ width: `${((step + 1) / 5) * 100}%` }} />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700">
              <Icon className="h-6 w-6">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </Icon>
            </span>
            <div>
              <h2 className="text-xl font-semibold leading-tight">{STEPS[step].title}</h2>
              <p className="text-sm text-ink-500">{STEPS[step].blurb}</p>
            </div>
          </div>

          <div className="mt-6">
            {step === 0 && (
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Age (in years)" unit="years" hint="Between 10 and 60." error={rangeError("age")}>
                  <input type="number" inputMode="numeric" className={`${inputBase} pr-16`} value={form.age} onChange={set("age")} />
                </Field>
                <Field
                  label="Blood group"
                  hint="Pick yours from the list."
                  error={touched && form.blood_group === "" ? "Please choose one." : ""}
                >
                  <select className={inputBase} value={form.blood_group} onChange={set("blood_group")}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Weight (in kg)" unit="kg" hint="Between 25 and 200 kg." error={rangeError("weight")}>
                  <input type="number" inputMode="numeric" className={`${inputBase} pr-12`} value={form.weight} onChange={set("weight")} />
                </Field>
                <Field label="Height (in cm)" unit="cm" hint="Between 120 and 210 cm." error={rangeError("height")}>
                  <input type="number" inputMode="numeric" className={`${inputBase} pr-12`} value={form.height} onChange={set("height")} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <YesNo question={YES_NO.reg_periods} value={form.reg_periods} onChange={setBool("reg_periods")} />
                <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                  <Field label="Your period comes every" hint="Roughly, in months.">
                    <select className={inputBase} value={form.period_months} onChange={set("period_months")}>
                      {monthsOptions.map((m) => (
                        <option key={m} value={m}>
                          {m} {m === 1 ? "month" : "months"}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="How long does it last?"
                    unit="days"
                    hint="Number of days."
                    error={touched && !(Number(form.period_days) > 0) ? "Enter the number of days." : ""}
                  >
                    <input type="number" inputMode="numeric" className={`${inputBase} pr-14`} value={form.period_days} onChange={set("period_days")} />
                  </Field>
                </div>
              </div>
            )}

            {(step === 2 || step === 3) && (
              <div className="flex flex-col gap-3">
                {questions.map((k) => (
                  <YesNo key={k} question={YES_NO[k]} value={form[k]} onChange={setBool(k)} />
                ))}
              </div>
            )}

            {step === 4 && (
              <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                {answerRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-ink-100 py-1.5">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {error && <p className="mt-4 text-sm text-[#9B2C3A]">{error}</p>}

          <div className="mt-8 flex items-center justify-between border-t border-ink-200 pt-5">
            {step > 0 ? (
              <button type="button" onClick={back} className="min-h-[44px] rounded-md px-4 font-semibold text-rose-700 hover:bg-rose-50">
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-rose-700 px-6 py-3 font-semibold text-white hover:bg-rose-800"
              >
                Next <ArrowRight />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-rose-700 px-6 py-3 font-semibold text-white hover:bg-rose-800 disabled:opacity-60"
              >
                {loading ? "Checking…" : "See my result"} {!loading && <ArrowRight />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcosSurveyForm;
