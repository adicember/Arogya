/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png"];

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Icon({ className = "h-5 w-5", children }) {
  return (
    <svg {...svgProps} className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const imageIcon = (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </>
);

const infoIcon = (
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </>
);

const tips = [
  "Use a clear, well-lit photo or the original file from your scan.",
  "Make sure the whole ovary image is visible and not cropped.",
  "Avoid glare, shadows and photos taken at a steep angle.",
  "Remove or hide your name and other personal details if you can.",
];

function formatSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function Illustration() {
  return (
    <svg viewBox="0 0 266 216" className="h-full w-full" aria-hidden="true">
      <circle cx="133" cy="108" r="73" fill="#fff" opacity=".7" />
      <rect x="85" y="52" width="96" height="116" rx="16" fill="#7D2C48" />
      <rect x="95" y="62" width="76" height="76" rx="8" fill="#4A1628" />
      <path d="M133 78l24 44h-48z" fill="#6A203A" />
      <ellipse cx="133" cy="112" rx="13" ry="9" fill="#F4C6D2" />
      <rect x="116" y="148" width="34" height="6" rx="3" fill="#F4C6D2" />
      <circle cx="187" cy="64" r="18" fill="#3F8F82" />
      <polyline points="178 64 185 71 197 58" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57 78l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#D97C8C" />
      <path d="M80 140c-6-12 0-24 8-28 6 10 4 22-8 28z" fill="#7FB5A8" />
      <path d="M66 164c-6-8-4-16 4-22 6 8 4 18-4 22z" fill="#A8CFC4" />
    </svg>
  );
}

function UltrasoundImage() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const choose = (f) => {
    if (!f) return;
    setPrediction(null);
    if (!TYPES.includes(f.type)) {
      setError("Please choose a JPG or PNG image.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("That file is over 10 MB. Please choose a smaller one.");
      return;
    }
    setError("");
    setFile(f);
  };

  const remove = () => {
    setFile(null);
    setPrediction(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const analyse = async () => {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("save", save ? "true" : "false");

    setLoading(true);
    setError("");
    setPrediction(null);
    try {
      const response = await fetch("http://localhost:8801/predict", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const result = await response.json();
      if (result.error) setError(String(result.error));
      else setPrediction(String(result.prediction));
    } catch (e) {
      console.error("Error uploading the image:", e);
      setError("We couldn’t analyse that image. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-sage-50 to-paper px-4 py-12 font-sans text-ink-900 sm:px-8 lg:py-16">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-10 lg:flex-row lg:gap-14">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-sage-700">Ultrasound check</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-[44px]">
            Share your <em className="text-rose-700">scan</em>, we&apos;ll take a look
          </h1>
          <p className="mt-4 max-w-[600px] text-[17px] leading-[1.6] text-ink-700">
            Upload a photo or file of your ovary ultrasound. You&apos;ll see a
            likelihood with how confident the check is, usually in a few seconds.
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(74,22,40,.12)] sm:p-7">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => choose(e.target.files[0])}
            />

            {file ? (
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(74,22,40,.12)]">
                <div className="grid h-[69px] w-[69px] shrink-0 place-items-center overflow-hidden rounded-lg bg-ink-900 text-white">
                  {preview ? (
                    <img src={preview} alt="Selected scan" className="h-full w-full object-cover" />
                  ) : (
                    <Icon>{imageIcon}</Icon>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{file.name}</p>
                  <p className="text-sm text-ink-700">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={remove}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <Icon className="h-4 w-4">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </Icon>
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  choose(e.dataTransfer.files[0]);
                }}
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                  dragging ? "border-rose-700 bg-rose-50" : "border-ink-200 bg-paper hover:border-rose-400"
                }`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-rose-700">
                  <Icon className="h-7 w-7">{imageIcon}</Icon>
                </span>
                <span className="font-semibold">Choose an image, or drop it here</span>
                <span className="text-sm text-ink-700">JPG or PNG, up to 10 MB</span>
              </button>
            )}

            <div className="rounded-2xl bg-rose-50">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                aria-expanded={showTips}
                className="flex min-h-[56px] w-full items-center gap-3 px-5 text-left font-semibold text-rose-800"
              >
                <Icon>{infoIcon}</Icon>
                Tips for a good image
              </button>
              {showTips && (
                <ul className="list-disc space-y-1 px-5 pb-4 pl-11 text-[15px] text-ink-700">
                  {tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>

            <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-ink-200 p-5">
              <span className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={save}
                  onChange={(e) => setSave(e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-rose-700"
                />
                <span>Save this image to my account so I can see it later.</span>
              </span>
              <span className="pl-9 text-sm text-ink-700">
                If you don&apos;t tick the box, your image is scored and then
                discarded.{" "}
                <a href="#" className="font-semibold text-rose-800 underline">
                  What we store
                </a>
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-[15px] font-medium text-rose-800">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={analyse}
                disabled={!file || loading}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-rose-700 px-5 text-base font-semibold text-white transition-colors hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analysing…" : "Analyse image"}
                {!loading && (
                  <Icon className="h-4 w-4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </Icon>
                )}
              </button>
              <span className="text-sm text-ink-700">
                {file ? "Ready when you are." : "Choose an image to begin."}
              </span>
            </div>

            {prediction && (
              <div role="status" className="rounded-2xl bg-sage-50 p-5">
                <p className="text-sm font-semibold text-sage-700">Your result</p>
                <p className="mt-1 text-lg font-semibold">{prediction}</p>
                <p className="mt-2 text-sm text-ink-700">
                  This is a screening result, not a diagnosis. Please share it
                  with a doctor.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[266px] lg:justify-center">
          <div className="h-[216px] overflow-hidden rounded-[28px] bg-rose-100">
            <Illustration />
          </div>

          {/* <div className="rounded-[20px] border border-ink-200 bg-white p-5">
            <h2 className="font-semibold">Good to know</h2>
            <ul className="mt-4 space-y-4 text-sm text-ink-700">
              {[
                ["JPG or PNG, up to 10 MB.", imageIcon],
                [
                  "Results usually take under 5 seconds.",
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </>,
                ],
                [
                  "Only you can see saved images, through private links.",
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </>,
                ],
              ].map(([text, icon]) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-sage-700">
                    <Icon>{icon}</Icon>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div> */}

          <div className="flex items-start gap-3 rounded-xl bg-ink-100 px-4 py-3 text-sm text-ink-700">
            <Icon className="mt-0.5 h-4 w-4 shrink-0">{infoIcon}</Icon>
            This is a screening tool, not a medical diagnosis.
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UltrasoundImage;
