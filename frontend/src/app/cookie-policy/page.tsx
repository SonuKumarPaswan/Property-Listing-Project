"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement>) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return inView;
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children, delay = 0, className = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<HTMLElement>);
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        }}>
            {children}
        </div>
    );
};

// ─── Cookie SVG illustration ──────────────────────────────────────────────────
const CookieSVG: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="28" fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="22" cy="24" r="3.5" fill="#3B82F6" opacity="0.7" />
        <circle cx="38" cy="20" r="2.5" fill="#22d3ee" opacity="0.6" />
        <circle cx="42" cy="34" r="3" fill="#3B82F6" opacity="0.5" />
        <circle cx="28" cy="38" r="2.5" fill="#60A5FA" opacity="0.6" />
        <circle cx="18" cy="36" r="2" fill="#22d3ee" opacity="0.45" />
        <circle cx="34" cy="46" r="3" fill="#3B82F6" opacity="0.55" />
        <circle cx="44" cy="26" r="2" fill="#93C5FD" opacity="0.7" />
        <path d="M26 28 Q32 22 38 28 Q32 34 26 28Z" fill="#3B82F6" opacity="0.1" />
        <circle cx="32" cy="32" r="28" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />
    </svg>
);

// ─── Cookie type data ─────────────────────────────────────────────────────────
const cookieTypes = [
    { label: "Essential",  desc: "Platform login & security",     always: true,  emoji: "🔒" },
    { label: "Analytics",  desc: "Usage patterns & performance",  always: false, emoji: "📊" },
    { label: "Functional", desc: "Saved searches & preferences",  always: false, emoji: "⚙️" },
    { label: "Marketing",  desc: "Relevant property promotions",  always: false, emoji: "📣" },
];

// ─── Policy sections ──────────────────────────────────────────────────────────
const sections = [
    {
        num: "01", icon: "🍪",
        title: "What Are Cookies?",
        text: "Cookies are small text files placed on your device when you visit MishtiHouses.com. They allow our platform to remember your preferences, login sessions, and browsing behaviour. Cookies do not harm your device and cannot execute code. They exist solely to make your real estate search experience faster, personalised, and seamless across every visit.",
    },
    {
        num: "02", icon: "🔍",
        title: "Data We Collect Via Cookies",
        text: "We collect session identifiers, device type, browser language, pages visited, time spent per listing, and search filters applied. This data is anonymised where possible and never sold to advertisers. It is used exclusively to improve platform performance, surface relevant property listings, and measure the effectiveness of our features.",
    },
    {
        num: "03", icon: "🛡️",
        title: "How We Protect Your Privacy",
        text: "All cookie data is encrypted in transit using TLS 1.3 and stored on ISO 27001-certified servers within India. We comply fully with the Information Technology Act, 2000 and applicable Indian data protection regulations. You retain the right to access, correct, or delete your data at any time by contacting privacy@mishthouses.com.",
    },
    {
        num: "04", icon: "⚙️",
        title: "Your Cookie Choices",
        text: "You may accept, reject, or customise cookie preferences at any time via our Cookie Settings panel. Disabling non-essential cookies will not prevent access to listings but may affect personalisation features. Most browsers also allow you to delete cookies through their settings menu. We honour all user preferences within 24 hours of submission.",
    },
];

const rights = [
    { icon: "📋", title: "Right to Access",  body: "Request a full export of all personal data we hold about you at any time." },
    { icon: "✏️", title: "Right to Correct", body: "Update or rectify any inaccurate personal information stored on our platform." },
    { icon: "🗑️", title: "Right to Delete",  body: "Ask us to permanently erase your data. We'll action all requests within 72 hours." },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CookiePolicyPage() {
    const [accepted, setAccepted] = useState<Record<string, boolean>>({
        Analytics: true, Functional: true, Marketing: false,
    });
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [heroLoaded, setHeroLoaded]           = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeroLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    const heroStyle = (delay: number): React.CSSProperties => ({
        opacity:    heroLoaded ? 1 : 0,
        transform:  heroLoaded ? "none" : "translateY(22px)",
        transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');
        *, body { font-family: 'Manrope', sans-serif; }
        :root   { color-scheme: dark; }
        html    { scroll-behavior: smooth; }

        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: #040d18; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 6px; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes float-a {
          0%,100% { transform: translateY(0px)   rotate(0deg);  }
          33%     { transform: translateY(-14px)  rotate(3deg);  }
          66%     { transform: translateY(-7px)   rotate(-2deg); }
        }
        @keyframes float-b {
          0%,100% { transform: translateY(0px)   rotate(0deg);  }
          50%     { transform: translateY(-18px)  rotate(-4deg); }
        }
        @keyframes float-c {
          0%,100% { transform: translateY(0px)  rotate(0deg); }
          40%     { transform: translateY(-9px)  rotate(5deg); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes banner-up {
          from { transform: translateY(120%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes glow-pulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1;   }
        }

        .fa { animation: float-a 6s ease-in-out infinite; }
        .fb { animation: float-b 8s ease-in-out infinite; }
        .fc { animation: float-c 5s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 22s linear infinite; }
        .spin-rev  { animation: spin-slow 30s linear infinite reverse; }
        .banner-in { animation: banner-up 0.55s cubic-bezier(.22,1,.36,1) forwards; }
        .glow-line { animation: glow-pulse 3s ease-in-out infinite; }

        .card-lift {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-5px);
          border-color: rgba(59,130,246,0.35) !important;
          box-shadow: 0 20px 48px rgba(59,130,246,0.12);
        }
        .toggle-thumb { transition: transform 0.25s cubic-bezier(.22,1,.36,1); }
        .toggle-track { transition: background 0.25s ease; }
      `}</style>

            <div className="min-h-screen bg-[#061A2D] grid-bg text-white overflow-x-hidden">

                {/* ── Ambient glows ──────────────────────────────────────────── */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/[0.055] blur-[110px]" />
                    <div className="absolute top-[40%] -right-64 w-[450px] h-[450px] rounded-full bg-[#0D6269]/[0.07] blur-[130px]" />
                    <div className="absolute bottom-20 left-1/3 w-[320px] h-[320px] rounded-full bg-[#1d4ed8]/[0.04] blur-[90px]" />
                </div>

                <section className="relative pt-14 min-h-[88vh] flex items-center overflow-hidden">

                    {/* Spinning geometric rings */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#3B82F6]/[0.06] spin-slow" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#22d3ee]/[0.04] spin-rev" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#3B82F6]/[0.08]" />
                        {[...Array(5)].map((_, r) =>
                            [...Array(11)].map((_, c) => (
                                <div key={`${r}-${c}`}
                                    className="absolute w-0.5 h-0.5 rounded-full bg-[#3B82F6]/20"
                                    style={{ top: `${12 + r * 16}%`, left: `${5 + c * 9}%` }} />
                            ))
                        )}
                    </div>

                    {/* Floating cookies */}
                    <div className="fa absolute top-24 left-[7%] opacity-55"><CookieSVG size={80} /></div>
                    <div className="fb absolute top-36 right-[9%] opacity-45" style={{ animationDelay: "1s" }}><CookieSVG size={60} /></div>
                    <div className="fc absolute bottom-32 left-[17%] opacity-35" style={{ animationDelay: "0.5s" }}><CookieSVG size={48} /></div>
                    <div className="fa absolute bottom-24 right-[18%] opacity-30" style={{ animationDelay: "2s" }}><CookieSVG size={40} /></div>
                    <div className="fb absolute top-1/2 right-[4%] opacity-25" style={{ animationDelay: "1.5s" }}><CookieSVG size={32} /></div>

                    {/* Hero content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center w-full">

                        {/* Legal badge — matches ToS style */}
                        <div style={heroStyle(0)}
                            className="inline-flex items-center gap-2 border border-[#3B82F6]/25 bg-[#3B82F6]/[0.08] text-[#93C5FD] text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-8">
                            🍪 &nbsp;Data Privacy & Transparency · Effective April 2, 2026
                        </div>

                        {/* Headline */}
                        <h1 style={{ ...heroStyle(150), fontFamily: "'Syne',sans-serif" }}
                            className="text-5xl sm:text-6xl lg:text-[78px] font-bold leading-[1.05] tracking-tight mb-6">
                            Our Cookie
                            <br />
                            <span className="bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>

                        {/* Sub */}
                        <p style={heroStyle(300)} className="text-[#94A3B8] text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-12">
                            We believe your privacy is a right, not a privilege. Here's exactly how MishtiHouses.com uses cookies — with full transparency.
                        </p>

                        {/* Stat pills — same style as ToS meta pills */}
                        <div style={heroStyle(450)} className="flex flex-wrap justify-center gap-2.5">
                            {[
                                { v: "4",    label: "Cookie Types" },
                                { v: "0",    label: "Data Sold"    },
                                { v: "100%", label: "Encrypted"    },
                                { v: "24hr", label: "Opt-out SLA"  },
                            ].map((s) => (
                                <div key={s.label}
                                    className="flex flex-col items-center bg-white/[0.04] border border-white/[0.07] rounded-lg px-5 py-3 hover:border-[#3B82F6]/30 transition-colors">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] bg-clip-text text-transparent"
                                        style={{ fontFamily: "'Syne',sans-serif" }}>
                                        {s.v}
                                    </span>
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom wave + glow line */}
                    <div className="absolute bottom-0 inset-x-0 pointer-events-none">
                        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                            <path d="M0 40 Q180 0 360 40 Q540 80 720 40 Q900 0 1080 40 Q1260 80 1440 40 L1440 80 L0 80Z"
                                fill="#061A2D" />
                        </svg>
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent glow-line" />
                    </div>
                </section>

                {/* ── Section heading ─────────────────────────────────────────── */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-4">
                    <Reveal className="text-center mb-14">
                        <p className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-semibold mb-3">
                            What You Should Know
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
                            Privacy, explained{" "}
                            <span className="bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] bg-clip-text text-transparent">
                                plainly.
                            </span>
                        </h2>
                    </Reveal>
                </section>

                {/* ── Policy cards — exact AnimSection card style from ToS ──── */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
                    <div className="grid md:grid-cols-2 gap-4">
                        {sections.map((s, i) => (
                            <Reveal key={s.num} delay={i * 70}>
                                <div className="card-lift group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden h-full">
                                    {/* Top glow line on hover */}
                                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Section label strip */}
                                    <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-white/[0.05]">
                                        <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-base flex-shrink-0">
                                            {s.icon}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]/60">{s.num}</span>
                                            <h3 className="font-bold text-white text-[15px] leading-tight"
                                                style={{ fontFamily: "'Syne',sans-serif" }}>
                                                {s.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="px-6 py-5">
                                        <p className="text-[#94A3B8] text-[14px] leading-[1.85]">{s.text}</p>
                                    </div>

                                    {/* Subtle watermark */}
                                    <div className="absolute bottom-3 right-3 opacity-[0.035] pointer-events-none">
                                        <CookieSVG size={60} />
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Divider ─────────────────────────────────────────────────── */}
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>

                {/* ── Cookie controls ──────────────────────────────────────────── */}
                <section className="relative z-10 py-20">
                    <div className="max-w-3xl mx-auto px-6">
                        <Reveal className="text-center mb-12">
                            <p className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-semibold mb-3">Your Control</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
                                Manage Your{" "}
                                <span className="bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] bg-clip-text text-transparent">
                                    Cookies
                                </span>
                            </h2>
                            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-md mx-auto">
                                Toggle each cookie category on or off. Essential cookies are always active to keep the platform running securely.
                            </p>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden">
                                {cookieTypes.map((ct, i) => (
                                    <div key={ct.label}
                                        className={`flex items-center justify-between px-6 py-5 ${i < cookieTypes.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                                                ct.always
                                                    ? "bg-[#3B82F6]/15 border border-[#3B82F6]/25"
                                                    : "bg-white/[0.04] border border-white/[0.07]"
                                            }`}>
                                                {ct.emoji}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white text-sm">{ct.label}</p>
                                                <p className="text-[12px] text-white/35">{ct.desc}</p>
                                            </div>
                                        </div>

                                        {ct.always ? (
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/[0.08] border border-[#3B82F6]/20 px-3 py-1 rounded-full">
                                                Always On
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setAccepted((p) => ({ ...p, [ct.label]: !p[ct.label] }))}
                                                className={`toggle-track relative w-12 h-6 rounded-full flex-shrink-0 ${
                                                    accepted[ct.label] ? "bg-[#3B82F6]" : "bg-white/[0.08]"
                                                }`}
                                                aria-label={`Toggle ${ct.label}`}
                                            >
                                                <span className={`toggle-thumb absolute top-0.5 w-5 h-5 rounded-full bg-white shadow shadow-black/30 ${
                                                    accepted[ct.label] ? "translate-x-6" : "translate-x-0.5"
                                                }`} />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Action bar */}
                                <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.05] flex flex-col sm:flex-row gap-3 items-center justify-between">
                                    <p className="text-[12px] text-white/25">Changes take effect within 24 hours.</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setAccepted({ Analytics: false, Functional: false, Marketing: false })}
                                            className="px-4 py-2 rounded-xl border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20 text-xs font-medium transition-colors"
                                        >
                                            Reject All
                                        </button>
                                        <button
                                            onClick={() => setAccepted({ Analytics: true, Functional: true, Marketing: true })}
                                            className="px-5 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold transition-colors shadow-lg shadow-[#3B82F6]/25"
                                        >
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Divider ─────────────────────────────────────────────────── */}
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>

                {/* ── Data Rights ──────────────────────────────────────────────── */}
                <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                    <Reveal className="text-center mb-10">
                        <p className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-semibold mb-3">Data Rights</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
                            Your Data Rights
                        </h2>
                    </Reveal>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {rights.map((r, i) => (
                            <Reveal key={r.title} delay={i * 90}>
                                <div className="card-lift group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-6 text-center h-full overflow-hidden">
                                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="text-3xl mb-4">{r.icon}</div>
                                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>{r.title}</h3>
                                    <p className="text-[#94A3B8] text-[13.5px] leading-relaxed">{r.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── CTA — same style as ToS bottom CTA ──────────────────────── */}
                <Reveal>
                    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
                        <div className="relative rounded-2xl overflow-hidden border border-[#3B82F6]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#061A2D] to-[#0D3355]" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
                            <div className="absolute inset-0 grid-bg opacity-60" />

                            {/* Floating cookies decoration */}
                            <div className="fa absolute top-6 left-8 opacity-[0.12] pointer-events-none"><CookieSVG size={64} /></div>
                            <div className="fb absolute bottom-6 right-8 opacity-[0.08] pointer-events-none"><CookieSVG size={80} /></div>
                            <div className="fc absolute top-1/2 left-2 -translate-y-1/2 opacity-[0.06] pointer-events-none"><CookieSVG size={44} /></div>

                            <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 mb-3 text-[#93C5FD] text-[10px] uppercase tracking-widest font-semibold">
                                        🍪 Questions?
                                    </div>
                                    <h2 className="text-2xl sm:text-[28px] font-bold text-white mb-2 leading-tight"
                                        style={{ fontFamily: "'Syne',sans-serif" }}>
                                        We're here to help.
                                    </h2>
                                    <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
                                        For any privacy questions, data requests, or cookie-related concerns, reach our dedicated privacy team directly.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 flex-shrink-0">
                                    <a href="mailto:privacy@mishthouses.com"
                                        className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)]">
                                        📧 &nbsp;privacy@mishthouses.com
                                    </a>
                                    <p className="text-white/20 text-[11px] text-center">
                                        Sector-63, Noida, 201301, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>


                {/* ── Cookie consent banner ──────────────────────────────────── */}
                {!bannerDismissed && (
                    <div className="banner-in fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-auto sm:right-5 sm:max-w-sm z-50">
                        <div className="rounded-2xl border border-white/[0.09] bg-[#0A1F35]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                            <div className="h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />
                            <div className="px-5 pt-5 pb-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🍪</span>
                                    <div>
                                        <p className="font-semibold text-white text-sm mb-1"
                                            style={{ fontFamily: "'Syne',sans-serif" }}>
                                            We use cookies
                                        </p>
                                        <p className="text-[#94A3B8] text-[12px] leading-relaxed">
                                            We use cookies to personalise your property search, analyse usage, and ensure platform security. Your data is never sold.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 pb-4 flex gap-2">
                                <button
                                    onClick={() => setBannerDismissed(true)}
                                    className="flex-1 border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20 text-xs font-medium py-2 rounded-xl transition-colors"
                                >
                                    Manage
                                </button>
                                <button
                                    onClick={() => setBannerDismissed(true)}
                                    className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-lg shadow-[#3B82F6]/25"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}