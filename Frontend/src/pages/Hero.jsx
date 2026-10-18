import React from "react";
import { Link } from "react-router-dom";
import { FiClipboard, FiUploadCloud, FiShield } from "react-icons/fi";

const Hero = () => {
  return (
    <header
      className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-rose-100 to-sage-50"
      style={{ padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 32px) clamp(72px, 9vw, 120px)" }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-10">
        <div className="flex min-w-0 basis-[480px] flex-[999_1_480px] flex-col items-start gap-[18px]">
          <p className="m-0 text-sm font-semibold text-ink-700">
            Free · No sign-up needed · About 5 minutes
          </p>

          <span className="inline-flex items-center gap-2 rounded-full border border-sage-300 bg-sage-100 px-3 py-1 text-sm font-semibold text-sage-700">
            <FiShield aria-hidden="true" className="h-4 w-4" />
            Private screening
          </span>

          <h1
            className="m-0 max-w-[18ch] font-display font-semibold leading-[1.12] text-ink-900"
            style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
          >
            Check your PCOS likelihood in minutes
          </h1>

          <p className="m-0 max-w-[54ch] text-lg leading-relaxed text-ink-700">
            Answer a short survey or upload an ultrasound image. You'll get a
            clear result and know what to do next.
          </p>
          <p className="m-0 max-w-[54ch] text-base leading-relaxed text-ink-700">
            Arogya is a screening tool, not a medical diagnosis. A doctor can
            confirm.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/SurveyForm"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-rose-700 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-rose-600 active:bg-rose-800"
            >
              <FiClipboard aria-hidden="true" className="h-5 w-5" />
              Start survey
            </Link>
            <Link
              to="/UltrasoundImage"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border-[1.5px] border-rose-700 bg-white px-7 py-4 text-base font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              <FiUploadCloud aria-hidden="true" className="h-5 w-5" />
              Upload ultrasound
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_300px] justify-center">
          <svg
            viewBox="0 0 360 340"
            aria-hidden="true"
            className="h-auto w-full max-w-[360px]"
          >
            <defs>
              <clipPath id="ar-hero-clip">
                <circle cx="180" cy="180" r="140" />
              </clipPath>
            </defs>
            <circle cx="180" cy="180" r="140" fill="#F3C6CF" />
            <circle cx="180" cy="180" r="112" fill="#fff" opacity="0.6" />
            <g clipPath="url(#ar-hero-clip)">
              <path
                d="M126 150 C120 86 166 64 190 72 C228 78 246 114 244 152 C244 196 256 236 238 268 L134 268 C116 236 128 196 126 150 Z"
                fill="#4A1628"
              />
              <rect x="166" y="196" width="28" height="36" rx="10" fill="#B9785A" />
              <path
                d="M92 360 C92 272 132 232 180 232 C228 232 268 272 268 360 Z"
                fill="#3F8F82"
              />
              <circle cx="180" cy="156" r="48" fill="#C98A6A" />
              <path
                d="M132 148 C136 104 168 90 192 95 C216 100 230 120 228 142 C210 134 190 124 172 110 C166 130 150 144 132 148 Z"
                fill="#4A1628"
              />
              <path d="M156 160 q7 6 14 0" fill="none" stroke="#2A1F24" strokeWidth="3" strokeLinecap="round" />
              <path d="M190 160 q7 6 14 0" fill="none" stroke="#2A1F24" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 178 q10 8 20 0" fill="none" stroke="#4A1628" strokeWidth="3" strokeLinecap="round" />
              <circle cx="152" cy="174" r="7" fill="#D97C8C" opacity="0.55" />
              <circle cx="208" cy="174" r="7" fill="#D97C8C" opacity="0.55" />
            </g>
            <circle cx="292" cy="78" r="34" fill="#fff" />
            <path
              d="M276 76 C276 66 288 62 292 71 C296 62 308 66 308 76 C308 87 292 96 292 96 C292 96 276 87 276 76 Z"
              fill="#862949"
            />
            <path d="M50 90 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 Z" fill="#E8C77A" />
            <ellipse cx="54" cy="270" rx="26" ry="11" transform="rotate(-40 54 270)" fill="#3F8F82" />
            <ellipse cx="70" cy="236" rx="20" ry="9" transform="rotate(-70 70 236)" fill="#8CC3B8" />
          </svg>
        </div>
      </div>

      {/* Wave divider into the page background */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 block h-[clamp(28px,4vw,56px)] w-full"
      >
        <path
          d="M0 34 C240 8 480 8 720 28 C960 48 1200 48 1440 20 L1440 60 L0 60 Z"
          fill="#FFFBFC"
        />
      </svg>
    </header>
  );
};

export default Hero;
