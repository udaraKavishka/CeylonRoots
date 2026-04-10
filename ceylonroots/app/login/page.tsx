"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Star, Award, Globe } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { getAdminDashboardUrl } from "../lib/admin-url";
import api from "../service/api";

const COUNTRY_FLAGS = ["🇺🇸", "🇬🇧", "🇩🇪", "🇦🇺", "🇫🇷", "🇯🇵"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      const sessionData = await api.get<{ user?: { role?: string; name?: string } }>("/auth/session");
      const isAdmin =
        (sessionData?.user as { role?: string } | undefined)?.role === "admin";
      login({
        firstName: sessionData?.user?.name || email.split("@")[0],
        lastName: "",
        email,
        role: isAdmin ? "admin" : "user",
      });

      if (isAdmin) {
        window.location.href = getAdminDashboardUrl();
        return;
      }

      router.push("/");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">
        {/* Background photo */}
        <Image
          src="https://ceylonrootsbucket.s3.eu-north-1.amazonaws.com/upload/mainimg.jpg"
          alt="Sri Lanka landscape"
          fill
          className="object-cover"
          priority
        />

        {/* Deep dark overlay for editorial feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,28,18,0.92) 0%, rgba(13,43,30,0.80) 45%, rgba(13,43,30,0.65) 100%)",
          }}
        />

        {/* Subtle botanical pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 0 C30 0 20 10 20 20 C20 30 30 30 30 30 C30 30 40 30 40 20 C40 10 30 0 30 0Z'/%3E%3Cpath d='M30 60 C30 60 20 50 20 40 C20 30 30 30 30 30 C30 30 40 30 40 40 C40 50 30 60 30 60Z'/%3E%3Cpath d='M0 30 C0 30 10 20 20 20 C30 20 30 30 30 30 C30 30 30 40 20 40 C10 40 0 30 0 30Z'/%3E%3Cpath d='M60 30 C60 30 50 20 40 20 C30 20 30 30 30 30 C30 30 30 40 40 40 C50 40 60 30 60 30Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(212,175,55,0.2)",
                border: "1px solid rgba(212,175,55,0.4)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8 2 4 6 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 6 16 2 12 2Z"
                  fill="#D4AF37"
                  opacity="0.9"
                />
                <path
                  d="M12 7C12 7 8 10 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 10 12 7 12 7Z"
                  fill="#0D2B1E"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">
              Ceylon<span style={{ color: "#D4AF37" }}>Roots</span>
            </span>
          </Link>

          {/* Hero quote section */}
          <div className="space-y-8 max-w-sm">
            {/* Gold accent line */}
            <div className="flex items-center gap-3">
              <div
                className="h-px w-12 flex-shrink-0"
                style={{
                  background: "linear-gradient(90deg, #D4AF37, transparent)",
                }}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-medium"
                style={{ color: "#D4AF37", letterSpacing: "0.25em" }}
              >
                Est. 2010 · Sri Lanka
              </span>
            </div>

            {/* Main quote */}
            <div>
              <h1
                className="text-white leading-[1.15] mb-4"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                Your Sri Lanka
                <br />
                <span style={{ color: "#D4AF37" }}>Story Begins</span> Here
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-[300px]">
                Curated luxury journeys through ancient temples, emerald tea
                hills, and pristine shores.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "#D4AF37",
                }}
              >
                <Award size={13} strokeWidth={1.5} />
                <span>Eco-Certified Tours</span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <Star size={13} strokeWidth={0} fill="currentColor" />
                <span>4.9 / 5 Rating</span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <Globe size={13} strokeWidth={1.5} />
                <span>50+ Countries</span>
              </div>
            </div>
          </div>

          {/* Social proof footer */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Stacked flags */}
              <div className="flex -space-x-2">
                {COUNTRY_FLAGS.map((flag, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "2px solid rgba(255,255,255,0.25)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    {flag}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium">
                  10,000+ happy travelers
                </p>
                <p className="text-white/45 text-xs">from across the globe</p>
              </div>
            </div>

            {/* Bottom rule */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.3), transparent 60%)",
              }}
            />
            <p className="text-white/30 text-[11px]">
              © {new Date().getFullYear()} CeylonRoots. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12 lg:py-16 relative"
        style={{ background: "#FAF8F5" }}
      >
        {/* Subtle cream texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232E8B57' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(46,139,87,0.12)",
                border: "1px solid rgba(46,139,87,0.25)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8 2 4 6 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 6 16 2 12 2Z"
                  fill="#2E8B57"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Ceylon<span style={{ color: "#2E8B57" }}>Roots</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8" style={{ background: "#D4AF37" }} />
              <span
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: "#D4AF37" }}
              >
                Welcome back
              </span>
            </div>
            <h2
              className="text-gray-900 mb-2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2.25rem",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              Sign in to your
              <br />
              <span style={{ color: "#2E8B57", fontStyle: "italic" }}>
                account
              </span>
            </h2>
            <p className="text-gray-500 text-sm">
              Continue your journey with CeylonRoots
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#3d3d3d" }}
              >
                Email Address
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#2E8B57" }}
                >
                  <Mail size={16} strokeWidth={1.75} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 rounded-xl transition-all duration-200"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E5E0D8",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #2E8B57";
                    e.target.style.boxShadow = "0 0 0 3px rgba(46,139,87,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1.5px solid #E5E0D8";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#3d3d3d" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium transition-colors hover:opacity-80"
                  style={{ color: "#D4AF37" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#2E8B57" }}
                >
                  <Lock size={16} strokeWidth={1.75} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 text-sm text-gray-900 placeholder-gray-400 rounded-xl transition-all duration-200"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E5E0D8",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #2E8B57";
                    e.target.style.boxShadow = "0 0 0 3px rgba(46,139,87,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1.5px solid #E5E0D8";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#9CA3AF" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2E8B57")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9CA3AF")
                  }
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.75} />
                  ) : (
                    <Eye size={16} strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="flex items-start gap-2.5 text-sm rounded-xl px-4 py-3.5 animate-fade-in"
                style={{
                  background: "#FFF5F5",
                  border: "1.5px solid #FCA5A5",
                  color: "#B91C1C",
                }}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, #0D2B1E 0%, #1A5E35 50%, #2E8B57 100%)",
                boxShadow: "0 4px 24px rgba(13,43,30,0.35)",
                letterSpacing: "0.04em",
              }}
            >
              {/* Gold shimmer on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #0D2B1E 0%, #1A4D2E 40%, #D4AF37 100%)",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to CeylonRoots
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 my-1">
              <div className="flex-1 h-px" style={{ background: "#E5E0D8" }} />
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "#B0A898" }}
              >
                or
              </span>
              <div className="flex-1 h-px" style={{ background: "#E5E0D8" }} />
            </div>

            {/* Google sign-in */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm transition-all duration-200"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E5E0D8",
                color: "#3D3D3D",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1.5px solid #D4AF37";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(212,175,55,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1.5px solid #E5E0D8";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
            >
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: "#2E8B57" }}
            >
              Create one free
            </Link>
          </p>

          {/* Security note */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-xs text-gray-400">
              Secured with 256-bit SSL encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
