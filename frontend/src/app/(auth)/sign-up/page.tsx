"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "buyer" | "agent";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agencyName: string;
  licenseNumber: string;
  agreeTerms: boolean;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agencyName?: string;
  licenseNumber?: string;
  agreeTerms?: string;
}

// ─── SVG Icons (no emoji) ─────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IconShield = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
  </svg>
);
const IconClipboard = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
  </svg>
);
const IconEyeOpen = () => (
  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);
const IconEyeClosed = () => (
  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);
const IconHome = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const IconSpinner = () => (
  <svg style={{ animation: "spin 1s linear infinite" }} width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
    <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);
const IconCheckMark = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

// ─── City Skyline ─────────────────────────────────────────────────────────────
const CitySVG = () => (
  <svg viewBox="0 0 760 480" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxHeight: 400, opacity: 0.38 }}>
    {[
      { x: 10,  w: 52, h: 255 }, { x: 68,  w: 38, h: 188 },
      { x: 112, w: 62, h: 315 }, { x: 180, w: 48, h: 242 },
      { x: 234, w: 78, h: 395 }, { x: 318, w: 52, h: 282 },
      { x: 376, w: 68, h: 350 }, { x: 450, w: 44, h: 215 },
      { x: 500, w: 88, h: 370 }, { x: 594, w: 52, h: 265 },
      { x: 652, w: 38, h: 190 }, { x: 696, w: 52, h: 300 },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={480 - b.h} width={b.w} height={b.h}
        fill={i % 3 === 0 ? "#152848" : i % 3 === 1 ? "#193260" : "#0f2040"} rx={2}/>
    ))}
    {[
      [25,290],[36,248],[125,182],[125,222],[125,260],
      [248,138],[248,176],[248,215],[263,160],[263,198],
      [388,148],[388,188],[388,226],[403,168],
      [513,160],[513,198],[527,180],[527,218],
      [608,228],[700,168],[700,208],
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width={8} height={12} rx={1}
        fill={i % 3 === 0 ? "#00c6ff" : i % 3 === 1 ? "#1e6bff" : "#4da6ff"}
        opacity={0.72}/>
    ))}
    <rect x={0} y={479} width={760} height={1} fill="rgba(30,107,255,0.16)"/>
    <ellipse cx={380} cy={480} rx={370} ry={52} fill="url(#sg)" opacity={0.22}/>
    <defs>
      <radialGradient id="sg" cx="50%" cy="100%" r="50%">
        <stop offset="0%" stopColor="#1e6bff"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>
  </svg>
);

const Particles = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
    {[
      { left: "14%", top: "18%", size: 3, delay: "0s",   dur: "4s"   },
      { left: "72%", top: "32%", size: 2, delay: "1.2s", dur: "5.5s" },
      { left: "44%", top: "55%", size: 4, delay: "2.1s", dur: "3.8s" },
      { left: "86%", top: "14%", size: 2, delay: "0.6s", dur: "6s"   },
      { left: "28%", top: "76%", size: 3, delay: "1.8s", dur: "4.2s" },
    ].map((p, i) => (
      <div key={i} style={{
        position: "absolute", left: p.left, top: p.top,
        width: p.size, height: p.size, borderRadius: "50%",
        background: "#1e6bff",
        animation: `twinkle ${p.dur} ${p.delay} infinite`,
      }}/>
    ))}
  </div>
);

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8)           s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  const map = [
    { label: "",       color: "#dce3f0" },
    { label: "Weak",   color: "#ff4f6a" },
    { label: "Fair",   color: "#ffa94d" },
    { label: "Good",   color: "#00c6a0" },
    { label: "Strong", color: "#1e6bff" },
  ];
  return { score: s, ...map[s] };
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page:      { minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif", background: "#0a1628", overflow: "hidden" },
  left:      { width: "52%", minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "36px 48px 48px", background: "linear-gradient(160deg,#0a1628 0%,#0d1f3c 55%,#091522 100%)", overflow: "hidden" },
  cityBg:    { position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "none", zIndex: 0 },
  logoRow:   { display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 2 },
  logoBox:   { width: 44, height: 44, background: "linear-gradient(135deg,#1e6bff,#00c6ff)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(30,107,255,0.42)" },
  logoName:  { fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px", lineHeight: 1.1 },
  logoSub:   { fontSize: 11, color: "#00c6ff", fontWeight: 500 },
  hero:      { position: "relative", zIndex: 2, paddingBottom: 28 },
  badge:     { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(30,107,255,0.13)", border: "1px solid rgba(30,107,255,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20, fontSize: 11, fontWeight: 600, color: "#4da6ff", letterSpacing: "0.08em", textTransform: "uppercase" as const },
  h1:        { fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 14 },
  accent:    { background: "linear-gradient(90deg,#1e6bff,#00c6ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  heroP:     { fontSize: 14, color: "#7a94b8", lineHeight: 1.75, maxWidth: 370, marginBottom: 30 },
  statsRow:  { display: "flex", gap: 28 },
  statNum:   { fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff" },
  statLbl:   { fontSize: 12, color: "#7a94b8", marginTop: 2 },
  right:     { width: "48%", minHeight: "100vh", background: "#f2f5fb", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", overflowY: "auto" as const },
  card:      { width: "100%", maxWidth: 476 },
  cardTitle: { fontFamily: "'Syne', sans-serif", fontSize: 27, fontWeight: 800, color: "#0a1628", marginBottom: 4, letterSpacing: "-0.4px" },
  cardSub:   { fontSize: 14, color: "#6b7f9e", marginBottom: 26 },
  tabs:      { display: "grid", gridTemplateColumns: "1fr 1fr", background: "#e4e9f3", borderRadius: 13, padding: 4, marginBottom: 26, gap: 3 },
  tab:       { padding: "11px 0", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7f9e", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all 0.22s ease", fontFamily: "'DM Sans', sans-serif" },
  tabActive: { background: "#fff", color: "#1e6bff", boxShadow: "0 2px 10px rgba(0,0,0,0.09)" },
  twoCol:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
  field:     { marginBottom: 14 },
  lbl:       { display: "block", fontSize: 10.5, fontWeight: 700, color: "#0a1628", letterSpacing: "0.09em", textTransform: "uppercase" as const, marginBottom: 7 },
  wrap:      { position: "relative", display: "flex", alignItems: "center" },
  icoL:      { position: "absolute", left: 13, color: "#9aafcc", pointerEvents: "none", display: "flex", alignItems: "center" },
  input:     { width: "100%", padding: "12px 12px 12px 40px", border: "1.5px solid #d8e1f0", borderRadius: 11, fontSize: 14, color: "#0a1628", background: "#fff", outline: "none", transition: "all 0.18s", fontFamily: "'DM Sans', sans-serif" },
  inputErr:  { borderColor: "#ff4f6a", background: "#fff8f9" },
  inputOk:   { borderColor: "#00c6a0" },
  eyeBtn:    { position: "absolute", right: 11, background: "none", border: "none", cursor: "pointer", color: "#9aafcc", display: "flex", alignItems: "center", padding: 4 },
  errMsg:    { fontSize: 11.5, color: "#ff4f6a", marginTop: 5, display: "flex", alignItems: "center", gap: 4, fontWeight: 500 },
  okMsg:     { fontSize: 11.5, color: "#00c6a0", marginTop: 5, display: "flex", alignItems: "center", gap: 4, fontWeight: 500 },
  strengthRow: { display: "flex", alignItems: "center", gap: 4, marginTop: 8 },
  strengthSeg: { flex: 1, height: 3, borderRadius: 3, background: "#dce3f0", transition: "background 0.28s" },
  checkRow:  { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18, marginTop: 2 },
  checkbox:  { width: 17, height: 17, marginTop: 2, accentColor: "#1e6bff", cursor: "pointer", flexShrink: 0 },
  checkLbl:  { fontSize: 13, color: "#6b7f9e", lineHeight: 1.55 },
  lnk:       { color: "#1e6bff", textDecoration: "none", fontWeight: 600 },
  divRow:    { display: "flex", alignItems: "center", gap: 12, marginBottom: 14, marginTop: 4 },
  divLine:   { flex: 1, height: 1, background: "#d8e1f0" },
  divTxt:    { fontSize: 11.5, color: "#9aafcc", fontWeight: 600, letterSpacing: "0.05em" },
  submitBtn: { width: "100%", padding: "14px", background: "linear-gradient(90deg,#1e6bff,#1055d4)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 14, letterSpacing: "0.02em", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 18px rgba(30,107,255,0.36)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  googleBtn: { width: "100%", padding: "13px", background: "#fff", border: "1.5px solid #d8e1f0", borderRadius: 12, color: "#0a1628", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.18s", marginBottom: 20 },
  bottomTxt: { textAlign: "center" as const, fontSize: 13, color: "#6b7f9e" },
  bottomLnk: { color: "#1e6bff", fontWeight: 700, textDecoration: "none", marginLeft: 4 },
  successBox:{ textAlign: "center" as const, padding: "44px 24px", background: "linear-gradient(135deg,#f0fdf9,#eaf3ff)", borderRadius: 16, border: "1.5px solid #00c6a0" },
  toast:     { position: "fixed" as const, bottom: 30, right: 28, background: "#fff", borderRadius: 14, padding: "15px 20px", boxShadow: "0 8px 36px rgba(0,0,0,0.13)", display: "flex", alignItems: "center", gap: 12, zIndex: 1000, border: "1px solid #d8e1f0", minWidth: 270 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const [role, setRole]         = useState<Role>("buyer");
  const [showPw, setShowPw]     = useState(false);
  const [showCpw, setShowCpw]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [toast, setToast]       = useState<string | null>(null);

  const emptyForm: FormData = {
    fullName: "", email: "", phone: "", password: "",
    confirmPassword: "", agencyName: "", licenseNumber: "", agreeTerms: false,
  };
  const [form, setForm]       = useState<FormData>(emptyForm);
  const [errors, setErrors]   = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const pw = getStrength(form.password);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.fullName.trim())                            e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2)             e.fullName = "Name is too short";
    if (!form.email.trim())                               e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim())                               e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()\u200c]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.password)                                   e.password = "Password is required";
    else if (form.password.length < 8)                    e.password = "Minimum 8 characters required";
    else if (pw.score < 2)                                e.password = "Password is too weak";
    if (!form.confirmPassword)                            e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)      e.confirmPassword = "Passwords do not match";
    if (role === "agent") {
      if (!form.agencyName.trim())    e.agencyName    = "Agency name is required";
      if (!form.licenseNumber.trim()) e.licenseNumber = "License number is required";
    }
    if (!form.agreeTerms) e.agreeTerms = "You must accept the terms to continue";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (touched[name]) {
      const upd = validate();
      setErrors(prev => ({ ...prev, [name]: upd[name as keyof Errors] }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(t => ({ ...t, [name]: true }));
    const e = validate();
    setErrors(prev => ({ ...prev, [name]: e[name as keyof Errors] }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const all: Record<string, boolean> = {};
    Object.keys(form).forEach(k => (all[k] = true));
    setTouched(all);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setToast(`${role === "buyer" ? "Buyer" : "Agent"} account created successfully`);
    setTimeout(() => setToast(null), 4000);
  };

  const switchRole = (r: Role) => { setRole(r); setErrors({}); setTouched({}); };

  const fStyle = (name: string): React.CSSProperties => ({
    ...S.input,
    ...(errors[name as keyof Errors] && touched[name] ? S.inputErr : {}),
    ...(!errors[name as keyof Errors] && touched[name] && form[name as keyof FormData] ? S.inputOk : {}),
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.16} 50%{opacity:.72} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        .lp-in   { animation:slideIn .62s ease both; }
        .cd-in   { animation:fadeUp  .52s .16s ease both; }
        .f-in    { animation:fadeUp  .36s ease both; }
        input:focus { border-color:#1e6bff!important; box-shadow:0 0 0 3px rgba(30,107,255,.1); }
        .sbtn:hover  { transform:translateY(-2px); box-shadow:0 8px 28px rgba(30,107,255,.52)!important; }
        .sbtn:active { transform:translateY(0); }
        .gbtn:hover  { border-color:#1e6bff!important; box-shadow:0 2px 10px rgba(30,107,255,.1); }
        .rtab:hover  { color:#1e6bff!important; }
        @media(max-width:860px){ .lp-r{display:none!important} .rp-r{width:100%!important} }
      `}</style>

      <div style={S.page}>

        {/* LEFT */}
        <div style={S.left} className="lp-in lp-r">
          <Particles/>
          <div style={S.cityBg}><CitySVG/></div>

          <div style={S.logoRow}>
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
            {/* <div>
              <div style={S.logoName}>MishtiHouses</div>
              <div style={S.logoSub}>Real Estate Platform</div>
            </div> */}
          </div>

          <div style={S.hero}>
            <div style={S.badge}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c6ff", display: "inline-block" }}/>
              Real Estate Platform
            </div>
            <h1 style={S.h1}>
              Find Your<br/>
              <span style={S.accent}>Dream Home</span><br/>
              Today
            </h1>
            <p style={S.heroP}>
              Buy, sell or rent properties with ease. Thousands of verified listings across India, trusted by buyers and agents alike.
            </p>
            <div style={S.statsRow}>
              {[["12K+","Properties"],["8K+","Happy Clients"],["50+","Cities"]].map(([n, l]) => (
                <div key={l} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={S.statNum}>{n}</span>
                  <span style={S.statLbl}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={S.right} className="rp-r">
          <div style={S.card} className="cd-in">
            <h2 style={S.cardTitle}>Create your account</h2>
            <p style={S.cardSub}>Join thousands of property seekers today</p>

            {/* Role tabs: Buyer | Agent only */}
            <div style={S.tabs}>
              {([
                { key: "buyer" as Role, label: "Property Buyer",    icon: <IconHome/>      },
                { key: "agent" as Role, label: "Real Estate Agent",  icon: <IconBriefcase/> },
              ]).map(r => (
                <button key={r.key} type="button" className="rtab"
                  style={{ ...S.tab, ...(role === r.key ? S.tabActive : {}) }}
                  onClick={() => switchRole(r.key)}>
                  {r.icon} {r.label}
                </button>
              ))}
            </div>

            {success ? (
              <div style={S.successBox}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,198,160,0.13)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#00c6a0" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 21, color: "#0a1628", marginBottom: 8 }}>Account Created!</h3>
                <p style={{ color: "#6b7f9e", fontSize: 14, marginBottom: 22 }}>
                  Welcome to MishtiHouses as a{" "}
                  <strong style={{ color: "#1e6bff" }}>
                    {role === "buyer" ? "Property Buyer" : "Real Estate Agent"}
                  </strong>.
                  {" "}Check your email to verify your account.
                </p>
                <button className="sbtn" style={{ ...S.submitBtn, width: "auto", padding: "12px 28px", display: "inline-flex" }}
                  onClick={() => { setSuccess(false); setForm(emptyForm); setTouched({}); }}>
                  Create Another Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {/* Full Name + Email */}
                <div style={S.twoCol}>
                  <div className="f-in" style={{ animationDelay: "0.04s" }}>
                    <label style={S.lbl}>Full Name</label>
                    <div style={S.wrap}>
                      <span style={S.icoL}><IconUser/></span>
                      <input name="fullName" value={form.fullName} onChange={handleChange}
                        onBlur={() => handleBlur("fullName")} placeholder="Your full name"
                        style={fStyle("fullName")} autoComplete="name"/>
                    </div>
                    {errors.fullName && touched.fullName &&
                      <div style={S.errMsg}>{errors.fullName}</div>}
                  </div>
                  <div className="f-in" style={{ animationDelay: "0.08s" }}>
                    <label style={S.lbl}>Email Address</label>
                    <div style={S.wrap}>
                      <span style={S.icoL}><IconMail/></span>
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        onBlur={() => handleBlur("email")} placeholder="you@example.com"
                        style={fStyle("email")} autoComplete="email"/>
                    </div>
                    {errors.email && touched.email &&
                      <div style={S.errMsg}>{errors.email}</div>}
                  </div>
                </div>

                {/* Phone */}
                <div style={S.field} className="f-in">
                  <label style={S.lbl}>Phone Number</label>
                  <div style={S.wrap}>
                    <span style={S.icoL}><IconPhone/></span>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      onBlur={() => handleBlur("phone")} placeholder="+91 XXXXX XXXXX"
                      style={fStyle("phone")} autoComplete="tel"/>
                  </div>
                  {errors.phone && touched.phone &&
                    <div style={S.errMsg}>{errors.phone}</div>}
                </div>

                {/* Agent-only */}
                {role === "agent" && (
                  <div style={{ ...S.twoCol }} className="f-in">
                    <div>
                      <label style={S.lbl}>Agency Name</label>
                      <div style={S.wrap}>
                        <span style={S.icoL}><IconBuilding/></span>
                        <input name="agencyName" value={form.agencyName} onChange={handleChange}
                          onBlur={() => handleBlur("agencyName")} placeholder="Agency name"
                          style={fStyle("agencyName")} autoComplete="organization"/>
                      </div>
                      {errors.agencyName && touched.agencyName &&
                        <div style={S.errMsg}>{errors.agencyName}</div>}
                    </div>
                    <div>
                      <label style={S.lbl}>License No.</label>
                      <div style={S.wrap}>
                        <span style={S.icoL}><IconClipboard/></span>
                        <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange}
                          onBlur={() => handleBlur("licenseNumber")} placeholder="REA-XXXX-XXXX"
                          style={fStyle("licenseNumber")} autoComplete="off"/>
                      </div>
                      {errors.licenseNumber && touched.licenseNumber &&
                        <div style={S.errMsg}>{errors.licenseNumber}</div>}
                    </div>
                  </div>
                )}

                {/* Password */}
                <div style={S.field} className="f-in">
                  <label style={S.lbl}>Password</label>
                  <div style={S.wrap}>
                    <span style={S.icoL}><IconLock/></span>
                    <input name="password" type={showPw ? "text" : "password"} value={form.password}
                      onChange={handleChange} onBlur={() => handleBlur("password")}
                      placeholder="Min. 8 characters" style={fStyle("password")} autoComplete="new-password"/>
                    <button type="button" style={S.eyeBtn} onClick={() => setShowPw(v => !v)}>
                      {showPw ? <IconEyeOpen/> : <IconEyeClosed/>}
                    </button>
                  </div>
                  {form.password && (
                    <div style={S.strengthRow}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ ...S.strengthSeg, background: i <= pw.score ? pw.color : "#dce3f0" }}/>
                      ))}
                      <span style={{ fontSize: 10.5, color: pw.color, marginLeft: 6, fontWeight: 700, minWidth: 38 }}>
                        {pw.label}
                      </span>
                    </div>
                  )}
                  {errors.password && touched.password &&
                    <div style={S.errMsg}>{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div style={S.field} className="f-in">
                  <label style={S.lbl}>Confirm Password</label>
                  <div style={S.wrap}>
                    <span style={S.icoL}><IconShield/></span>
                    <input name="confirmPassword" type={showCpw ? "text" : "password"} value={form.confirmPassword}
                      onChange={handleChange} onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Re-enter password" style={fStyle("confirmPassword")} autoComplete="new-password"/>
                    <button type="button" style={S.eyeBtn} onClick={() => setShowCpw(v => !v)}>
                      {showCpw ? <IconEyeOpen/> : <IconEyeClosed/>}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword &&
                    <div style={S.errMsg}>{errors.confirmPassword}</div>}
                  {!errors.confirmPassword && touched.confirmPassword &&
                   form.confirmPassword && form.password === form.confirmPassword &&
                    <div style={S.okMsg}><IconCheckMark/> Passwords match</div>}
                </div>

                {/* Terms */}
                <div style={S.checkRow}>
                  <input type="checkbox" id="terms" name="agreeTerms"
                    checked={form.agreeTerms} onChange={handleChange} style={S.checkbox}/>
                  <label htmlFor="terms" style={S.checkLbl}>
                    I agree to the{" "}
                    <a href="#" style={S.lnk}>Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" style={S.lnk}>Privacy Policy</a>
                  </label>
                </div>
                {errors.agreeTerms && touched.agreeTerms &&
                  <div style={{ ...S.errMsg, marginTop: -10, marginBottom: 12 }}>{errors.agreeTerms}</div>}

                {/* Submit */}
                <button type="submit" style={S.submitBtn} className="sbtn" disabled={loading}>
                  {loading
                    ? <><IconSpinner/> Creating your account…</>
                    : `Create ${role === "buyer" ? "Buyer" : "Agent"} Account`}
                </button>

                <div style={S.divRow}>
                  <div style={S.divLine}/><span style={S.divTxt}>OR</span><div style={S.divLine}/>
                </div>

                {/* Google */}
                <button type="button" style={S.googleBtn} className="gbtn">
                  <svg width="19" height="19" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>

                <p style={S.bottomTxt}>
                  Already have an account?
                  <a href="/sign-In" style={S.bottomLnk}>Sign In</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={S.toast} className="f-in">
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,198,160,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#00c6a0" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#0a1628", fontSize: 13.5 }}>{toast}</div>
            <div style={{ fontSize: 12, color: "#6b7f9e", marginTop: 2 }}>Welcome to MishtiHouses!</div>
          </div>
        </div>
      )}
    </>
  );
}