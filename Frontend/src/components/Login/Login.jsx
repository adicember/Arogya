import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:8801";

const Illustration = () => (
  <svg viewBox="0 0 320 260" className="h-full w-full max-w-[320px]" aria-hidden="true">
    <circle cx="160" cy="130" r="82" fill="#fff" opacity=".55" />
    <rect x="112" y="48" width="104" height="146" rx="14" fill="#fff" />
    <rect x="130" y="66" width="68" height="12" rx="6" fill="#F3C6CF" />
    <rect x="130" y="90" width="68" height="20" rx="10" fill="#DCEEE9" />
    <circle cx="142" cy="100" r="4" fill="#3F8F82" />
    <rect x="130" y="124" width="68" height="5" rx="2.5" fill="#E7E0E3" />
    <rect x="130" y="135" width="52" height="5" rx="2.5" fill="#E7E0E3" />
    <rect x="130" y="154" width="68" height="26" rx="8" fill="#862949" />
    <path
      d="M250 70c-8-9-22-1-16 10 4 7 16 14 16 14s12-7 16-14c6-11-8-19-16-10z"
      fill="#C45570"
    />
    <path d="M62 78l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#D97C8C" />
    <path d="M258 168l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#E8C877" />
    <ellipse cx="82" cy="176" rx="12" ry="22" fill="#8CC3B8" transform="rotate(15 82 176)" />
    <ellipse cx="68" cy="204" rx="12" ry="26" fill="#3F8F82" transform="rotate(60 68 204)" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 text-sage-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const inputClass =
  "mt-1.5 block min-h-[48px] w-full rounded-lg border border-ink-300 bg-white px-4 text-ink-900 placeholder:text-ink-500 focus:border-rose-500 focus:shadow-focus";

// eslint-disable-next-line react/prop-types
const Login = ({ initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isLogin) {
        await axios.post(`${API}/register`, formData);
      }
      const response = await axios.post(`${API}/login`, formData);

      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("token", response.data.token ?? "session");
      localStorage.setItem("user_email", formData.email);

      window.location.href = "/";
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.error ||
          (isLogin ? "Invalid email or password." : "Could not create your account.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-paper px-4 py-10 font-sans text-ink-900 sm:px-8 lg:py-14">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-6 lg:flex-row">
        {/* Left panel */}
        <section className="hidden flex-1 flex-col justify-between rounded-[28px] bg-gradient-to-br from-rose-50 via-rose-100 to-sage-50 p-12 lg:flex">
          <div>
            <h1 className="font-display text-5xl font-semibold leading-tight">
              Keep your results{" "}
              <em className="text-rose-700">in one place</em>
            </h1>
            <p className="mt-4 max-w-[460px] text-lg text-ink-700">
              A free account lets you save results, download reports for your
              doctor and see how things change over time.
            </p>
          </div>

          <div className="flex justify-center py-6">
            <Illustration />
          </div>

          <ul className="space-y-3 text-ink-900">
            <li className="flex items-center gap-3">
              <CheckIcon /> We only ask for your email
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon /> Delete your account any time
            </li>
          </ul>
        </section>

        {/* Form card */}
        <section className="w-full rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(74,22,40,.08)] sm:p-8 lg:w-[568px] lg:shrink-0">
          <div role="tablist" className="grid grid-cols-2 rounded-xl bg-ink-100 p-1">
            {[
              ["login", "Log in"],
              ["signup", "Sign up"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => {
                  setMode(key);
                  setError("");
                }}
                className={`min-h-[44px] rounded-lg font-semibold transition-colors ${
                  mode === key
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-ink-700 hover:text-rose-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#E9EEF9] px-4 py-3 text-sm text-[#34479A]">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Sign up to save the result you just saw. You&apos;ll land straight back
            on it.
          </div>

          <h2 className="mt-7 font-display text-3xl font-semibold">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="sita@example.com"
                className={inputClass}
                required
              />
            </label>

            <label htmlFor="password" className="mt-5 block text-sm font-medium">
              Password
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className={inputClass}
                required
              />
            </label>

            <div className="mt-3 flex items-center justify-between text-sm font-semibold text-rose-700">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="min-h-[32px] hover:underline"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
              {isLogin && (
                <button type="button" className="min-h-[32px] underline">
                  Forgot password?
                </button>
              )}
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 min-h-[54px] w-full rounded-xl bg-rose-700 text-lg font-semibold text-white transition-colors hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait…" : isLogin ? "Log in" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-4 text-sm text-ink-500">
            <span className="h-px flex-1 bg-ink-200" />
            or
            <span className="h-px flex-1 bg-ink-200" />
          </div>

          <button
            type="button"
            className="min-h-[54px] w-full rounded-xl border-[1.5px] border-rose-700 bg-white text-lg font-semibold text-rose-700 transition-colors hover:bg-rose-50"
          >
            Continue with Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default Login;
