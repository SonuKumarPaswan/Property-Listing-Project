"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";



const SignInPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ identifier?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isMobile = (val: string) => /^[6-9]\d{9}$/.test(val);

  const validateIdentifier = (val: string) => {
    if (!val.trim()) return "Email or mobile number is required.";
    if (!isEmail(val) && !isMobile(val))
      return "Enter a valid email address or 10-digit mobile number.";
    return "";
  };
   const router = useRouter();

  const validatePassword = (val: string) => {
    if (!val) return "Password is required.";
    if (val.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleBlur = (field: "identifier" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "identifier")
      setErrors((prev) => ({ ...prev, identifier: validateIdentifier(identifier) }));
    if (field === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleChange = (field: "identifier" | "password", val: string) => {
    if (field === "identifier") {
      setIdentifier(val);
      if (touched.identifier)
        setErrors((prev) => ({ ...prev, identifier: validateIdentifier(val) }));
    } else {
      setPassword(val);
      if (touched.password)
        setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setTouched({ identifier: true, password: true });

  const idErr = validateIdentifier(identifier);
  const pwErr = validatePassword(password);

  setErrors({ identifier: idErr, password: pwErr });
  if (idErr || pwErr) return;

  try {
    setLoading(true);

    console.log("Attempting login with:", { identifier, password: "******" });
    const res = await api.post("/users/login", {
      email: identifier,  
      password: password,
    });

   
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      console.log("Login successful, token stored:", res.data.token);
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard"); 
      }, 1500);
    }

  } catch (error: any) {
    console.error("Login error:", error);

    // backend error show
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Login failed";

    setSuccessMsg(errorMessage); // UI me show
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    setSuccessMsg("Redirecting to Google Sign-In…");
  };

  const handleOtpLogin = async () => {
    setTouched((prev) => ({ ...prev, identifier: true }));
    const idErr = validateIdentifier(identifier);
    setErrors((prev) => ({ ...prev, identifier: idErr }));
    if (idErr) return;

    setOtpLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOtpLoading(false);
    setSuccessMsg(`OTP sent to ${identifier}. Please check!`);
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* LEFT PANEL: brand/hero */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a1628 0%, #0f2044 50%, #1a3a6b 100%)" }}
      >
        {/* City silhouette BG */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect x="50" y="300" width="60" height="300" fill="white" />
            <rect x="60" y="260" width="40" height="50" fill="white" />
            <rect x="130" y="250" width="80" height="350" fill="white" />
            <rect x="145" y="200" width="50" height="60" fill="white" />
            <rect x="220" y="320" width="50" height="280" fill="white" />
            <rect x="280" y="200" width="100" height="400" fill="white" />
            <rect x="295" y="150" width="70" height="60" fill="white" />
            <rect x="390" y="270" width="70" height="330" fill="white" />
            <rect x="470" y="180" width="90" height="420" fill="white" />
            <rect x="480" y="130" width="70" height="60" fill="white" />
            <rect x="570" y="310" width="60" height="290" fill="white" />
            <rect x="640" y="240" width="80" height="360" fill="white" />
            <rect x="655" y="190" width="50" height="60" fill="white" />
            <rect x="730" y="290" width="70" height="310" fill="white" />
          </svg>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* 🔥 INCREASED LOGO ON DESKTOP (PC) */}
        <div className="relative z-10 p-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Mishti Houses Logo"
              width={320}           // Increased size
              height={140}
              priority
              className="rounded-lg"
              style={{
                width: "280px",     // You can change this value to make it bigger/smaller
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Headline + stats */}
        <div className="relative z-10 px-10 pb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-widest uppercase"
            style={{ background: "rgba(37,99,235,0.3)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.4)" }}
          >
            Real Estate Platform
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Find Your<br />
            <span style={{ color: "#3b82f6" }}>Dream Home</span><br />
            Today
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
            Buy, sell or rent properties easily with Mishti Houses. Thousands of verified listings across India.
          </p>
          <div className="flex gap-8">
            {[
              { value: "12K+", label: "Properties" },
              { value: "8K+", label: "Happy Clients" },
              { value: "50+", label: "Cities" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: form */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12 relative"
        style={{ background: "#f8fafc" }}
      >
        <div className="relative w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Mishti Houses Logo"
                width={180}
                height={160}
                priority
                style={{ width: "auto", height: "auto", maxHeight: "120px", objectFit: "contain" }}
              />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#0f172a" }}>Welcome back</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>Sign in to your account to continue</p>
          </div>

          {successMsg && (
            <div
              className="mb-5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium border"
              style={{ background: "#eff6ff", borderColor: "#bfdbfe", color: "#1d4ed8" }}
            >
              {successMsg}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-5">
            {/* Identifier Field */}
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: "#374151" }}>
                Email or Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none" style={{ color: "#9ca3af" }}>
                  <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => handleChange("identifier", e.target.value)}
                  onBlur={() => handleBlur("identifier")}
                  placeholder="you@example.com or 9876543210"
                  style={{
                    background: touched.identifier && errors.identifier ? "#fef2f2" : "#ffffff",
                    borderColor: touched.identifier && errors.identifier ? "#f87171" : "#d1d5db",
                    color: "#111827",
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {touched.identifier && errors.identifier && (
                <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#374151" }}>Password</label>
                <button type="button" className="text-xs font-semibold hover:underline" style={{ color: "#2563eb" }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none" style={{ color: "#9ca3af" }}>
                  <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Min. 6 characters"
                  style={{
                    background: touched.password && errors.password ? "#fef2f2" : "#ffffff",
                    borderColor: touched.password && errors.password ? "#f87171" : "#d1d5db",
                    color: "#111827",
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border text-sm placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                  style={{ color: "#9ca3af" }}
                >
                  {showPassword ? (
                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)" }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span className="mx-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#9ca3af" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>

          {/* Google & OTP Buttons */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 border-2 active:scale-95 transition-all duration-200 shadow-sm mb-3 hover:border-blue-500 hover:bg-blue-50"
            style={{ background: "#ffffff", borderColor: "#e5e7eb", color: "#374151" }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={handleOtpLogin}
            disabled={otpLoading}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border-2 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-blue-100"
            style={{ background: "#eff6ff", borderColor: "#bfdbfe", color: "#1d4ed8" }}
          >
            {otpLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending OTP…
              </>
            ) : (
              <>
                <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Login with OTP
              </>
            )}
          </button>

          <p className="mt-6 text-center text-sm" style={{ color: "#6b7280" }}>
            Don't have an account?{" "}
             <button
      onClick={() => router.push("/sign-up")}
      className="font-bold hover:underline"
      style={{ color: "#2563eb" }}
    >
      Create account
    </button>

          </p>
        </div>
      </div>
    </div >
  );
};

export default SignInPage;