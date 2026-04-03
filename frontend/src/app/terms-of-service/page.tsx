"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Home, CheckCircle2, UserCheck, ShieldCheck, Building2,
    ClipboardList, Ban, CreditCard, Copyright, ExternalLink,
    Scale, Eye, PowerOff, RefreshCcw, Gavel, Mail,
    ChevronRight, ArrowUpRight, Star, AlertTriangle, X, Menu,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionDef {
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

// ─── Primitives ───────────────────────────────────────────────────────────────

const Note: React.FC<{ children: React.ReactNode; warn?: boolean }> = ({ children, warn }) => (
    <div className={`relative my-5 rounded-xl border px-5 py-4 text-sm leading-relaxed ${
        warn ? "border-amber-500/25 bg-amber-500/[0.08] text-amber-200/80"
             : "border-blue-500/20 bg-blue-500/[0.07] text-blue-300"
    }`}>
        <AlertTriangle size={13} className={`absolute right-4 top-4 ${warn ? "text-amber-400/50" : "text-blue-500/50"}`} />
        {children}
    </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400 text-[14px] leading-relaxed">
                <ChevronRight size={13} className="mt-0.5 flex-shrink-0 text-blue-500" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-slate-400 text-[14.5px] leading-[1.85] mb-4 last:mb-0">{children}</p>
);

// ─── Section content factory ──────────────────────────────────────────────────

function buildSections(): SectionDef[] {
    return [
        {
            id: "introduction", label: "Introduction", icon: <Home size={15} />,
            content: (
                <>
                    <P>Welcome to <strong className="text-white font-semibold">MishtiHouses.com</strong> — a premium <em>real estate platform</em> built to transform the way people discover, evaluate, and transact in property across India. Whether you intend to <em>buy, sell, or rent property</em>, MishtiHouses.com provides a secure, transparent, and technology-first environment.</P>
                    <P>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User") and MishtiHouses.com ("Company", "we", "us", or "our"), governing your access to and use of the Platform.</P>
                    <Note>By accessing any part of this Platform — even without creating an account — you confirm that you have read, understood, and agreed to these Terms in their entirety. If you disagree with any provision, please discontinue use immediately.</Note>
                    <P>MishtiHouses.com serves as a neutral digital marketplace connecting buyers, sellers, landlords, tenants, and registered agents. We do not directly own, manage, or sell any property featured herein.</P>
                </>
            ),
        },
        {
            id: "acceptance", label: "Acceptance of Terms", icon: <CheckCircle2 size={15} />,
            content: (
                <>
                    <P>Your continued use of MishtiHouses.com — regardless of whether you have created an account — constitutes your unconditional acceptance of these Terms, our Privacy Policy, and any supplementary guidelines published on the Platform.</P>
                    <P>Acceptance is automatic and binding upon your first interaction with the Platform. This includes browsing property listings, saving a search, submitting an enquiry, or completing the registration process.</P>
                    <Note warn><strong>Important:</strong> If you are using this Platform on behalf of a business entity, you represent that you are duly authorised to bind that entity to these Terms.</Note>
                </>
            ),
        },
        {
            id: "eligibility", label: "User Eligibility", icon: <UserCheck size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com is available to individuals who meet all of the following criteria. By using the Platform, you represent and warrant that:</P>
                    <Bullets items={[
                        "You are at least 18 years of age, or the legal age of majority in your jurisdiction, whichever is higher.",
                        "You possess full legal capacity to enter into a binding contract under Indian law.",
                        "You are not subject to any legal prohibition that prevents you from using this Platform.",
                        "You will use the Platform exclusively for lawful purposes related to real estate transactions.",
                        "You have not been previously banned or suspended from MishtiHouses.com.",
                    ]} />
                    <P>Corporate entities — including private limited companies, LLPs, trusts, and partnerships — may register for legitimate commercial real estate activity, provided a duly authorised representative accepts these Terms.</P>
                </>
            ),
        },
        {
            id: "account", label: "Account Registration & Security", icon: <ShieldCheck size={15} />,
            content: (
                <>
                    <P>Certain features of our real estate platform — including posting property listings, managing leads, and scheduling viewings — require a registered account. When creating your account, you agree to provide truthful, current, and complete information.</P>
                    <Note>We may require additional identity or document verification (e.g., Aadhaar, PAN, RERA registration number) before activating premium listing privileges on your account.</Note>
                    <P>You are solely responsible for safeguarding your credentials. You agree to:</P>
                    <Bullets items={[
                        "Use a strong, unique password and enable two-factor authentication where available.",
                        "Never share your login credentials with any third party.",
                        "Immediately notify us at security@mishthouses.com upon detecting unauthorised access.",
                        "Log out from shared or public devices after every session.",
                    ]} />
                    <P>MishtiHouses.com will never request your password via email, SMS, or phone call. Accounts found to have been created using fraudulent information will be permanently suspended without prior notice.</P>
                </>
            ),
        },
        {
            id: "listings", label: "Property Listings & Accuracy", icon: <Building2 size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com functions as a <em>property listings</em> marketplace. All listings are published by Listers — individual owners, registered agents, or developers — who are entirely responsible for the content they submit.</P>
                    <P>By submitting a property listing, you warrant that:</P>
                    <Bullets items={[
                        "You are the legal owner of the property or hold a valid authorisation to list it.",
                        "All stated details — price, area, amenities, ownership status, location — are accurate and current.",
                        "Photographs and media genuinely represent the actual property being listed.",
                        "The property complies with RERA and all applicable local authority regulations.",
                        "The listing will be promptly removed or updated once the property is no longer available.",
                    ]} />
                    <Note warn>MishtiHouses.com does not independently verify the accuracy of every listing. Users are strongly advised to conduct independent due diligence before initiating any property transaction.</Note>
                </>
            ),
        },
        {
            id: "responsibilities", label: "User Responsibilities", icon: <ClipboardList size={15} />,
            content: (
                <>
                    <P>All users of MishtiHouses.com are expected to engage lawfully and professionally. You agree to:</P>
                    <Bullets items={[
                        "Use the Platform only for genuine property-related purposes — searching, listing, or transacting.",
                        "Communicate honestly and professionally with other users, agents, and property owners.",
                        "Comply with all applicable Indian laws, including RERA, FEMA, Income Tax Act, and GST provisions.",
                        "Ensure that all submitted content — text, images, and documents — is accurate and does not infringe third-party rights.",
                        "Promptly report any suspicious listings or policy violations to our support team.",
                    ]} />
                    <P>You further agree not to use any automated tools, bots, web scrapers, or crawlers to access or aggregate Platform data without prior written consent from MishtiHouses.com</P>
                </>
            ),
        },
        {
            id: "prohibited", label: "Prohibited Activities", icon: <Ban size={15} />,
            content: (
                <>
                    <P>The following activities are strictly prohibited and may result in immediate account termination, civil action, or referral to law enforcement:</P>
                    <div className="grid sm:grid-cols-2 gap-2 mt-4">
                        {[
                            "Posting false, misleading, or duplicate property listings.",
                            "Impersonating any person, agent, builder, or authority.",
                            "Harvesting personal data of other users without consent.",
                            "Listing properties you do not own or aren't authorised to list.",
                            "Sending spam, unsolicited bulk messages, or phishing links.",
                            "Attempting to hack, probe, or disrupt Platform infrastructure.",
                            "Uploading viruses, malware, or malicious code of any kind.",
                            "Engaging in money laundering or transactions of illegal origin.",
                            "Circumventing subscription paywalls or security mechanisms.",
                            "Publishing defamatory, discriminatory, or obscene content.",
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2 bg-red-500/[0.06] border border-red-500/10 rounded-lg px-3 py-2.5">
                                <Ban size={11} className="mt-0.5 flex-shrink-0 text-red-400/70" />
                                <span className="text-red-300/70 text-xs leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: "payments", label: "Payments & Transactions", icon: <CreditCard size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com offers tiered subscription plans for individuals, real estate professionals, and developers. Premium features — such as promoted listings, verified seller badges, lead management tools, and advanced analytics — are exclusive to paid plans.</P>
                    <P>All fees are denominated in Indian Rupees (INR) and include applicable GST unless expressly stated otherwise. Payments are processed via PCI-DSS-compliant third-party gateways. We do not store card or banking details on our servers.</P>
                    <Note><strong>Refund Policy:</strong> Subscription fees are non-refundable once a billing cycle has commenced. Promotional credits are non-transferable and carry a defined expiry date communicated at the time of issuance.</Note>
                    <P>MishtiHouses.com is not a party to property purchase, sale, or lease transactions between users. We strongly recommend consulting a qualified legal or financial advisor before committing to any real estate transaction.</P>
                </>
            ),
        },
        {
            id: "ip", label: "Intellectual Property", icon: <Copyright size={15} />,
            content: (
                <>
                    <P>All content, features, and functionality on MishtiHouses.com — including text, graphics, logos, UI design, source code, and data compilations — are the exclusive intellectual property of MishtiHouses.com or its licensors, protected under Indian and international copyright and trademark laws.</P>
                    <P>By submitting content to the Platform (including property photos, descriptions, and floor plans), you grant MishtiHouses.com a non-exclusive, royalty-free, worldwide, sublicensable licence to use, display, and distribute such content solely for operating and promoting the Platform.</P>
                    <Note warn>Unauthorised reproduction, redistribution, or commercial exploitation of any content from this Platform is strictly prohibited and may result in civil and criminal liability under the Copyright Act, 1957.</Note>
                </>
            ),
        },
        {
            id: "third-party", label: "Third-Party Services", icon: <ExternalLink size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com may integrate or link to third-party services — including mapping tools, mortgage calculators, legal advisory portals, and payment gateways — to enhance your experience on our real estate platform. These are provided for convenience only.</P>
                    <P>We do not control, endorse, or assume responsibility for the content, privacy practices, or security of any third-party service. Your use of any linked external platform is entirely at your own risk and is governed by that platform's own terms and policies.</P>
                    <P>MishtiHouses.com shall not be liable for any loss, damage, or inconvenience arising from your reliance on or interaction with third-party tools or services accessed through the Platform.</P>
                </>
            ),
        },
        {
            id: "liability", label: "Limitation of Liability", icon: <Scale size={15} />,
            content: (
                <>
                    <P>To the fullest extent permitted under applicable law, MishtiHouses.com — including its directors, officers, employees, agents, and licensors — shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:</P>
                    <Bullets items={[
                        "Your use of, or inability to use, any part of the Platform.",
                        "Inaccuracies, omissions, or errors in any property listing.",
                        "Transactions, agreements, or disputes between Platform users.",
                        "Unauthorised access to your account or personal data.",
                        "Interruptions, downtime, or technical failures on the Platform.",
                    ]} />
                    <Note>In no event shall MishtiHouses.com's total aggregate liability to you exceed the amount paid by you to the Company in the twelve (12) months preceding the event giving rise to the claim.</Note>
                </>
            ),
        },
        {
            id: "privacy", label: "Privacy Policy", icon: <Eye size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com is committed to protecting the privacy and security of your personal information. Our Privacy Policy explains in detail how we collect, use, store, share, and safeguard your data when you interact with the Platform.</P>
                    <P>By accepting these Terms, you simultaneously acknowledge and agree to our Privacy Policy, which is incorporated herein by reference and forms an inseparable part of this agreement.</P>
                    <Note>MishtiHouses.com complies with the Information Technology Act, 2000, the IT (Reasonable Security Practices) Rules, 2011, and applicable Indian data protection frameworks.</Note>
                </>
            ),
        },
        {
            id: "termination", label: "Termination", icon: <PowerOff size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com reserves the right to suspend, restrict, or permanently terminate your access to the Platform at any time, with or without prior notice, for reasons including breach of these Terms, fraudulent activity, or conduct deemed harmful to other users or the Platform's integrity.</P>
                    <P>You may terminate your account at any time by using the account deletion option in your profile settings or by writing to support@mishthouses.com. Upon termination, your right to access the Platform ceases immediately.</P>
                    <P>Provisions that by their nature survive termination — including intellectual property rights, limitation of liability, dispute resolution, and governing law — shall remain in full force after your account is closed.</P>
                </>
            ),
        },
        {
            id: "changes", label: "Changes to Terms", icon: <RefreshCcw size={15} />,
            content: (
                <>
                    <P>MishtiHouses.com may revise these Terms from time to time to reflect changes in our services, applicable laws, or operational requirements. We will notify registered users of material changes via email and through a prominent in-Platform notice.</P>
                    <P>The "Last Updated" date at the top of this page reflects the most recent revision. Minor clarifications may be made without separate notification.</P>
                    <Note>Your continued use of MishtiHouses.com after any revised Terms take effect constitutes your binding acceptance of the updated agreement. If you do not agree with a revision, you must discontinue use immediately.</Note>
                </>
            ),
        },
        {
            id: "governing", label: "Governing Law", icon: <Gavel size={15} />,
            content: (
                <>
                    <P>These Terms shall be governed by, and construed in accordance with, the laws of the Republic of India. Any dispute arising out of or in connection with these Terms or your use of MishtiHouses.com shall be subject to the exclusive jurisdiction of the courts of <strong className="text-white">New Delhi, India</strong>.</P>
                    <P>In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation within thirty (30) calendar days. If unsuccessful, disputes shall be resolved through binding arbitration under the Arbitration and Conciliation Act, 1996, conducted in English in New Delhi.</P>
                    <P>Nothing herein prevents MishtiHouses.com from seeking injunctive or equitable relief from a court of competent jurisdiction to protect intellectual property rights or prevent imminent irreparable harm.</P>
                </>
            ),
        },
        {
            id: "contact", label: "Contact Information", icon: <Mail size={15} />,
            content: (
                <>
                    <P>For any questions, legal notices, or complaints regarding these Terms of Service, please reach out to our dedicated support team through the appropriate channel below:</P>
                    <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                        {[
                            { role: "General Enquiries", email: "enquiries@mishthouses.com" },
                            { role: "Legal & Compliance", email: "legal@mishthouses.com" },
                            { role: "Account Support", email: "support@mishthouses.com" },
                            { role: "Security Reports", email: "security@mishthouses.com" },
                        ].map((c) => (
                            <div key={c.role} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 hover:border-blue-500/25 transition-colors">
                                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">{c.role}</p>
                                <p className="text-sm text-blue-400 font-medium">{c.email}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Registered Office</p>
                        <p className="text-sm text-slate-400">MishtiHouses.com , Basement B-07, AGS Building, C-27 Sector-63, Noida, 201301, India.</p>
                    </div>
                </>
            ),
        },
    ];
}

// ─── Dynamic Heading Component ────────────────────────────────────────────────
// Animates when the active section label changes

const DynamicHeading: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => {
    const [displayLabel, setDisplayLabel] = useState(label);
    const [displayIcon, setDisplayIcon] = useState(icon);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        // Trigger exit → update → enter animation
        setAnimKey((k) => k + 1);
        // Small delay so the exit animation plays before the content swaps
        const t = setTimeout(() => {
            setDisplayLabel(label);
            setDisplayIcon(icon);
        }, 120);
        return () => clearTimeout(t);
    }, [label, icon]);

    return (
        <div className="overflow-hidden">
            <div
                key={animKey}
                style={{ animation: "headingEnter 0.28s cubic-bezier(.22,1,.36,1) forwards" }}
                className="flex items-center gap-3"
            >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/20 flex-shrink-0">
                    {displayIcon}
                </span>
                <h2 className="text-xl font-bold text-white truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {displayLabel}
                </h2>
            </div>
        </div>
    );
};

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard: React.FC<{ section: SectionDef; observerRef: (el: HTMLDivElement | null) => void }> = ({
    section,
    observerRef,
}) => (
    <div
        id={section.id}
        data-section-id={section.id}
        ref={observerRef}
        className="mb-4 group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden hover:border-blue-500/25 hover:bg-white/[0.04] transition-all duration-300"
    >
        {/* Hover glow line */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Section label pill */}
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-white/[0.05]">
            <span className="text-blue-400/70">{section.icon}</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">{section.label}</span>
        </div>
        <div className="px-6 py-5">{section.content}</div>
    </div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TermsOfServicePage() {
    const sections = buildSections();
    const [activeId, setActiveId] = useState(sections[0].id);
    const [mobileOpen, setMobileOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionEls = useRef<Map<string, HTMLDivElement>>(new Map());

    // ── IntersectionObserver — scoped to the right scroll pane ────────────────
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // rootMargin: trigger when a section enters the top 40% of the pane
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the topmost intersecting section
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const id = (visible[0].target as HTMLElement).dataset.sectionId;
                    if (id) setActiveId(id);
                }
            },
            { root: container, rootMargin: "-10% 0px -55% 0px", threshold: 0 }
        );

        sectionEls.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Memoised ref callback — stable per section id
    const getRefCallback = useCallback(
        (id: string) => (el: HTMLDivElement | null) => {
            if (el) sectionEls.current.set(id, el);
            else sectionEls.current.delete(id);
        },
        []
    );

    // Scroll section into view inside the pane
    const scrollTo = useCallback((id: string) => {
        const el = sectionEls.current.get(id);
        if (el && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: el.offsetTop - 16,
                behavior: "smooth",
            });
        }
        setMobileOpen(false);
    }, []);

    const activeSection = sections.find((s) => s.id === activeId) ?? sections[0];
    const progressPct = ((sections.findIndex((s) => s.id === activeId) + 1) / sections.length) * 100;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');
        *, body { font-family: 'Manrope', sans-serif; }
        :root { color-scheme: dark; }

        /* Scoped scrollbar for the right pane */
        .right-pane::-webkit-scrollbar { width: 4px; }
        .right-pane::-webkit-scrollbar-track { background: transparent; }
        .right-pane::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 6px; }

        /* Sidebar scrollbar */
        .sidebar-nav::-webkit-scrollbar { width: 3px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: #1e2d40; border-radius: 6px; }

        /* Dynamic heading entrance animation */
        @keyframes headingEnter {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Subtle grid bg */
        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

            {/* ── Root: full viewport, no page-level scroll ─────────────────── */}
            <div className="h-screen flex flex-col bg-[#061A2D] grid-bg text-white overflow-hidden">

                {/* Ambient glows */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-600/[0.055] blur-[110px]" />
                    <div className="absolute top-[40%] -right-64 w-[450px] h-[450px] rounded-full bg-cyan-800/[0.07] blur-[130px]" />
                    <div className="absolute bottom-20 left-1/3 w-[320px] h-[320px] rounded-full bg-blue-800/[0.04] blur-[90px]" />
                </div>

              
              

                
                <div className="relative z-10 flex-1 flex overflow-hidden max-w-screen-xl mt-20 mb-20 w-full mx-auto px-5 sm:px-8">

                    {/* ── LEFT SIDEBAR — position:sticky within flex, never scrolls ── */}
                    <aside className="hidden lg:flex flex-col flex-shrink-0 w-64 xl:w-72 py-6 pr-5 mt-20">
                        <div className="flex flex-col h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md overflow-hidden">

                            {/* Sidebar header — the DYNAMIC HEADING lives here */}
                            <div className="flex-shrink-0 px-4 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 mb-2 font-semibold">Current Section</p>
                                <DynamicHeading label={activeSection.label} icon={activeSection.icon} />
                            </div>

                            {/* Nav list */}
                            <nav className="sidebar-nav flex-1 overflow-y-auto py-1.5">
                                {sections.map((s, i) => {
                                    const isActive = activeId === s.id;
                                    return (
                                        <button
                                            key={s.id}
                                            onClick={() => scrollTo(s.id)}
                                            className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-[11.5px] transition-all duration-150 relative group ${
                                                isActive
                                                    ? "text-blue-400 bg-blue-500/[0.09]"
                                                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                                            }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 inset-y-0 w-0.5 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                                            )}
                                            <span className={`flex-shrink-0 ${isActive ? "text-blue-400" : "text-white/20 group-hover:text-white/40"}`}>
                                                {s.icon}
                                            </span>
                                            <span className="flex-1 truncate font-medium leading-tight">{s.label}</span>
                                            <span className={`font-mono text-[9px] ${isActive ? "text-blue-400/60" : "text-white/10"}`}>
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Progress bar */}
                            <div className="flex-shrink-0 px-4 py-3.5 border-t border-white/[0.06]">
                                <div className="flex justify-between mb-1.5 text-[10px]">
                                    <span className="text-white/20 uppercase tracking-wide">Progress</span>
                                    <span className="text-blue-400/60 font-medium">
                                        {sections.findIndex((s) => s.id === activeId) + 1} / {sections.length}
                                    </span>
                                </div>
                                <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ── RIGHT PANE — only this scrolls ────────────────────────── */}
                    <div
                        ref={scrollContainerRef}
                        className="right-pane flex-1 overflow-y-auto py-6 pl-1 lg:pl-5"
                    >
                        {/* Sticky section title bar (inside the scroll pane, sticks to pane top) */}
                        <div className="sticky top-0 z-20 mb-4 -mx-1 lg:-mx-5 px-1 lg:px-5 py-3 bg-[#061A2D]/80 backdrop-blur-md border-b border-white/[0.05]">
                            <div className="flex items-center justify-between gap-3">
                                <DynamicHeading label={activeSection.label} icon={activeSection.icon} />
                                {/* Mobile TOC button */}
                                <button
                                    className="lg:hidden flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white border border-white/10 hover:border-white/20 px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
                                    onClick={() => setMobileOpen(true)}
                                >
                                    <Menu size={12} />
                                    <span>Contents</span>
                                </button>
                                {/* Section counter badge (desktop) */}
                                <span className="hidden lg:flex items-center gap-1.5 text-[11px] text-white/25 flex-shrink-0">
                                    <span className="font-mono">{String(sections.findIndex((s) => s.id === activeId) + 1).padStart(2, "0")}</span>
                                    <span>/</span>
                                    <span className="font-mono">{String(sections.length).padStart(2, "0")}</span>
                                </span>
                            </div>
                        </div>

                        {/* Hero blurb (scrolls away) */}
                        <div className="mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
                            <div className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-500/[0.08] text-blue-300 text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
                                <Scale size={10} />
                                Legal Document — Effective April 2, 2026
                            </div>
                            <p className="text-slate-400 text-[14px] leading-relaxed">
                                Please read these Terms carefully before using <strong className="text-white">MishtiHouses.com</strong> — India's trusted real estate platform for property buyers, sellers, and renters.
                            </p>
                        </div>

                        {/* Section cards */}
                        {sections.map((section) => (
                            <SectionCard
                                key={section.id}
                                section={section}
                                observerRef={getRefCallback(section.id)}
                            />
                        ))}

                        {/* CTA */}
                        
                        {/* Bottom padding */}
                        <div className="h-12" />
                    </div>
                </div>
            </div>
             <div className="mt-4 relative rounded-2xl overflow-hidden border border-blue-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#061A2D] to-[#0D3355]" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
                            <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 mb-3 text-blue-300 text-[10px] uppercase tracking-widest font-semibold">
                                        <Star size={10} />
                                        Start Your Journey
                                    </div>
                                    <h2 className="text-2xl sm:text-[28px] font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        Find Your Dream Property
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                        Explore thousands of verified <em>property listings</em> across India. Buy, sell, or rent with full confidence on MishtiHouses.com.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 flex-shrink-0">
                                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)]">
                                        Browse Listings
                                        <ArrowUpRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => scrollTo("contact")}
                                        className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/25 text-white/60 hover:text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-200"
                                    >
                                        <Mail size={13} />
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>


            {/* ── Mobile TOC Drawer ─────────────────────────────────────────── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#061A2D] border-l border-white/[0.07] flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b mt-10 border-white/[0.06]">
                            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Table of Contents</span>
                            <button onClick={() => setMobileOpen(false)} aria-label="Close">
                                <X size={18} className="text-white/50  hover:text-white" />
                            </button>
                        </div>
                        <nav className="sidebar-nav flex-1 overflow-y-auto py-2">
                            {sections.map((s, i) => {
                                const isActive = activeId === s.id;
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollTo(s.id)}
                                        className={`w-full text-left flex items-center gap-3 px-5 py-3 text-xs transition-all duration-150 relative ${
                                            isActive ? "text-blue-400 bg-blue-500/10" : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        {isActive && <span className="absolute left-0 inset-y-0 w-0.5 bg-blue-500 rounded-r-full" />}
                                        <span className={isActive ? "text-blue-400" : "text-white/25"}>{s.icon}</span>
                                        <span className="flex-1 font-medium">{s.label}</span>
                                        <span className="font-mono text-[10px] text-white/15">{String(i + 1).padStart(2, "0")}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}