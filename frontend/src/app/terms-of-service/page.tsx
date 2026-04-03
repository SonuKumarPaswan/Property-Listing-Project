"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Home,
    CheckCircle2,
    UserCheck,
    ShieldCheck,
    Building2,
    ClipboardList,
    Ban,
    CreditCard,
    Copyright,
    ExternalLink,
    Scale,
    Eye,
    PowerOff,
    RefreshCcw,
    Gavel,
    Mail,
    ChevronRight,
    ArrowUpRight,
    Sparkles,
    AlertTriangle,
    Star,
    Menu,
    X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionDef {
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

// ─── Scroll-spy hook ─────────────────────────────────────────────────────────

function useScrollSpy(ids: string[], offset = 140): string {
    const [active, setActive] = useState(ids[0] ?? "");
    useEffect(() => {
        const handle = () => {
            const y = window.scrollY;
            let cur = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.offsetTop - offset <= y) cur = id;
            }
            setActive(cur);
        };
        window.addEventListener("scroll", handle, { passive: true });
        handle();
        return () => window.removeEventListener("scroll", handle);
    }, [ids, offset]);
    return active;
}

function smoothScroll(id: string) {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
}

// ─── Primitives ───────────────────────────────────────────────────────────────

const Note: React.FC<{ children: React.ReactNode; warn?: boolean }> = ({ children, warn }) => (
    <div
        className={`relative my-5 rounded-xl border px-5 py-4 text-sm leading-relaxed ${warn
            ? "border-amber-500/25 bg-amber-500/[0.08] text-amber-200/80"
            : "border-[#3B82F6]/20 bg-[#3B82F6]/[0.07] text-[#93C5FD]"
            }`}
    >
        <AlertTriangle
            size={13}
            className={`absolute right-4 top-4 ${warn ? "text-amber-400/50" : "text-[#3B82F6]/50"}`}
        />
        {children}
    </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[#94A3B8] text-[14px] leading-relaxed">
                <ChevronRight size={13} className="mt-0.5 flex-shrink-0 text-[#3B82F6]" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-[#94A3B8] text-[14.5px] leading-[1.85] mb-4 last:mb-0">{children}</p>
);

// ─── Animated section ─────────────────────────────────────────────────────────

const AnimSection: React.FC<{ section: SectionDef; index: number }> = ({ section, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.06 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            id={section.id}
            className="scroll-mt-28 mb-5"
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${index * 35}ms,
                     transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 35}ms`,
            }}
        >
            <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden hover:border-[#3B82F6]/25 hover:bg-white/[0.04] transition-all duration-300">
                {/* top glow line */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                

                {/* Body */}
                <div className="px-6 py-5">{section.content}</div>
            </div>
        </div>
    );
};

// ─── Section content factory ──────────────────────────────────────────────────

function buildSections(): SectionDef[] {
    return [
        {
            id: "introduction",
            label: "Introduction",
            icon: <Home size={15} />,
            content: (
                <>
                    <P>
                        Welcome to <strong className="text-white font-semibold">MishtiHouses.com</strong> — a
                        premium <em>real estate platform</em> built to transform the way people discover,
                        evaluate, and transact in property across India. Whether you intend to{" "}
                        <em>buy, sell, or rent property</em>, MishtiHouses.com provides a secure, transparent,
                        and technology-first environment designed for modern property seekers and owners alike.
                    </P>
                    <P>
                        These Terms of Service ("Terms") constitute a legally binding agreement between you
                        ("User") and MishtiHouses Technologies Pvt. Ltd. ("Company", "we", "us", or "our"),
                        governing your access to and use of the MishtiHouses.com website, mobile applications,
                        APIs, and all associated digital services (collectively, the "Platform").
                    </P>
                    <Note>
                        By accessing any part of this Platform — even without creating an account — you confirm
                        that you have read, understood, and agreed to these Terms in their entirety. If you
                        disagree with any provision, please discontinue use immediately.
                    </Note>
                    <P>
                        MishtiHouses.com serves as a neutral digital marketplace connecting buyers, sellers,
                        landlords, tenants, and registered agents. We do not directly own, manage, or sell any
                        property featured herein. All <em>property listings</em> are published by registered
                        users who bear sole responsibility for their accuracy and legal compliance.
                    </P>
                </>
            ),
        },
        {
            id: "acceptance",
            label: "Acceptance of Terms",
            icon: <CheckCircle2 size={15} />,
            content: (
                <>
                    <P>
                        Your continued use of MishtiHouses.com — regardless of whether you have created an
                        account — constitutes your unconditional acceptance of these Terms, our Privacy Policy,
                        and any supplementary guidelines published on the Platform from time to time.
                    </P>
                    <P>
                        Acceptance is automatic and binding upon your first interaction with the Platform. This
                        includes browsing property listings, saving a search, submitting an enquiry, or
                        completing the registration process.
                    </P>
                    <Note warn>
                        <strong>Important:</strong> If you are using this Platform on behalf of a business
                        entity, you represent that you are duly authorised to bind that entity to these Terms,
                        and your acceptance constitutes the entity's legal acceptance.
                    </Note>
                </>
            ),
        },
        {
            id: "eligibility",
            label: "User Eligibility",
            icon: <UserCheck size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com is available to individuals who meet all of the following criteria. By
                        using the Platform, you represent and warrant that:
                    </P>
                    <Bullets
                        items={[
                            "You are at least 18 years of age, or the legal age of majority in your jurisdiction, whichever is higher.",
                            "You possess full legal capacity to enter into a binding contract under Indian law.",
                            "You are not subject to any legal prohibition that prevents you from using this Platform.",
                            "You will use the Platform exclusively for lawful purposes related to real estate transactions.",
                            "You have not been previously banned or suspended from MishtiHouses.com.",
                        ]}
                    />
                    <P>
                        Corporate entities — including private limited companies, LLPs, trusts, and
                        partnerships — may register for legitimate commercial real estate activity, provided a
                        duly authorised representative accepts these Terms on the entity's behalf.
                    </P>
                </>
            ),
        },
        {
            id: "account",
            label: "Account Registration & Security",
            icon: <ShieldCheck size={15} />,
            content: (
                <>
                    <P>
                        Certain features of our real estate platform — including posting property listings,
                        managing leads, and scheduling viewings — require a registered account. When creating
                        your account, you agree to provide truthful, current, and complete information.
                    </P>
                    <Note>
                        We may require additional identity or document verification (e.g., Aadhaar, PAN, RERA
                        registration number) before activating premium listing privileges on your account.
                    </Note>
                    <P>You are solely responsible for safeguarding your credentials. You agree to:</P>
                    <Bullets
                        items={[
                            "Use a strong, unique password and enable two-factor authentication where available.",
                            "Never share your login credentials with any third party.",
                            "Immediately notify us at security@mishthouses.com upon detecting unauthorised access.",
                            "Log out from shared or public devices after every session.",
                        ]}
                    />
                    <P>
                        MishtiHouses.com will never request your password via email, SMS, or phone call.
                        Accounts found to have been created using fraudulent information will be permanently
                        suspended without prior notice.
                    </P>
                </>
            ),
        },
        {
            id: "listings",
            label: "Property Listings & Accuracy",
            icon: <Building2 size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com functions as a <em>property listings</em> marketplace. All listings
                        are published by Listers — individual owners, registered agents, or developers — who
                        are entirely responsible for the content they submit.
                    </P>
                    <P>By submitting a property listing, you warrant that:</P>
                    <Bullets
                        items={[
                            "You are the legal owner of the property or hold a valid authorisation to list it.",
                            "All stated details — price, area, amenities, ownership status, location — are accurate and current.",
                            "Photographs and media genuinely represent the actual property being listed.",
                            "The property complies with RERA and all applicable local authority regulations.",
                            "The listing will be promptly removed or updated once the property is no longer available.",
                        ]}
                    />
                    <Note warn>
                        MishtiHouses.com does not independently verify the accuracy of every listing. Users are
                        strongly advised to conduct independent due diligence before initiating any property
                        transaction.
                    </Note>
                </>
            ),
        },
        {
            id: "responsibilities",
            label: "User Responsibilities",
            icon: <ClipboardList size={15} />,
            content: (
                <>
                    <P>
                        All users of MishtiHouses.com are expected to engage lawfully and professionally. You
                        agree to:
                    </P>
                    <Bullets
                        items={[
                            "Use the Platform only for genuine property-related purposes — searching, listing, or transacting.",
                            "Communicate honestly and professionally with other users, agents, and property owners.",
                            "Comply with all applicable Indian laws, including RERA, FEMA, Income Tax Act, and GST provisions.",
                            "Ensure that all submitted content — text, images, and documents — is accurate and does not infringe third-party rights.",
                            "Promptly report any suspicious listings or policy violations to our support team.",
                        ]}
                    />
                    <P>
                        You further agree not to use any automated tools, bots, web scrapers, or crawlers to
                        access or aggregate Platform data without prior written consent from MishtiHouses
                        Technologies Pvt. Ltd.
                    </P>
                </>
            ),
        },
        {
            id: "prohibited",
            label: "Prohibited Activities",
            icon: <Ban size={15} />,
            content: (
                <>
                    <P>
                        The following activities are strictly prohibited and may result in immediate account
                        termination, civil action, or referral to law enforcement:
                    </P>
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
                            <div
                                key={i}
                                className="flex items-start gap-2 bg-red-500/[0.06] border border-red-500/10 rounded-lg px-3 py-2.5"
                            >
                                <Ban size={11} className="mt-0.5 flex-shrink-0 text-red-400/70" />
                                <span className="text-red-300/70 text-xs leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: "payments",
            label: "Payments & Transactions",
            icon: <CreditCard size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com offers tiered subscription plans for individuals, real estate
                        professionals, and developers. Premium features — such as promoted listings, verified
                        seller badges, lead management tools, and advanced analytics — are exclusive to paid
                        plans.
                    </P>
                    <P>
                        All fees are denominated in Indian Rupees (INR) and include applicable GST unless
                        expressly stated otherwise. Payments are processed via PCI-DSS-compliant third-party
                        gateways. We do not store card or banking details on our servers.
                    </P>
                    <Note>
                        <strong>Refund Policy:</strong> Subscription fees are non-refundable once a billing
                        cycle has commenced. Promotional credits are non-transferable and carry a defined expiry
                        date communicated at the time of issuance.
                    </Note>
                    <P>
                        MishtiHouses.com is not a party to property purchase, sale, or lease transactions
                        between users. We strongly recommend consulting a qualified legal or financial advisor
                        before committing to any real estate transaction.
                    </P>
                </>
            ),
        },
        {
            id: "ip",
            label: "Intellectual Property",
            icon: <Copyright size={15} />,
            content: (
                <>
                    <P>
                        All content, features, and functionality on MishtiHouses.com — including text,
                        graphics, logos, UI design, source code, and data compilations — are the exclusive
                        intellectual property of MishtiHouses Technologies Pvt. Ltd. or its licensors,
                        protected under Indian and international copyright and trademark laws.
                    </P>
                    <P>
                        By submitting content to the Platform (including property photos, descriptions, and
                        floor plans), you grant MishtiHouses.com a non-exclusive, royalty-free, worldwide,
                        sublicensable licence to use, display, and distribute such content solely for operating
                        and promoting the Platform.
                    </P>
                    <Note warn>
                        Unauthorised reproduction, redistribution, or commercial exploitation of any content
                        from this Platform is strictly prohibited and may result in civil and criminal liability
                        under the Copyright Act, 1957.
                    </Note>
                </>
            ),
        },
        {
            id: "third-party",
            label: "Third-Party Services",
            icon: <ExternalLink size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com may integrate or link to third-party services — including mapping
                        tools, mortgage calculators, legal advisory portals, and payment gateways — to enhance
                        your experience on our real estate platform. These are provided for convenience only.
                    </P>
                    <P>
                        We do not control, endorse, or assume responsibility for the content, privacy practices,
                        or security of any third-party service. Your use of any linked external platform is
                        entirely at your own risk and is governed by that platform's own terms and policies.
                    </P>
                    <P>
                        MishtiHouses.com shall not be liable for any loss, damage, or inconvenience arising
                        from your reliance on or interaction with third-party tools or services accessed through
                        the Platform.
                    </P>
                </>
            ),
        },
        {
            id: "liability",
            label: "Limitation of Liability",
            icon: <Scale size={15} />,
            content: (
                <>
                    <P>
                        To the fullest extent permitted under applicable law, MishtiHouses Technologies Pvt.
                        Ltd. — including its directors, officers, employees, agents, and licensors — shall not
                        be liable for any indirect, incidental, special, consequential, or punitive damages
                        arising from:
                    </P>
                    <Bullets
                        items={[
                            "Your use of, or inability to use, any part of the Platform.",
                            "Inaccuracies, omissions, or errors in any property listing.",
                            "Transactions, agreements, or disputes between Platform users.",
                            "Unauthorised access to your account or personal data.",
                            "Interruptions, downtime, or technical failures on the Platform.",
                        ]}
                    />
                    <Note>
                        In no event shall MishtiHouses.com's total aggregate liability to you exceed the
                        amount paid by you to the Company in the twelve (12) months preceding the event giving
                        rise to the claim.
                    </Note>
                </>
            ),
        },
        {
            id: "privacy",
            label: "Privacy Policy",
            icon: <Eye size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com is committed to protecting the privacy and security of your personal
                        information. Our Privacy Policy explains in detail how we collect, use, store, share,
                        and safeguard your data when you interact with the Platform.
                    </P>
                    <P>
                        By accepting these Terms, you simultaneously acknowledge and agree to our Privacy
                        Policy, which is incorporated herein by reference and forms an inseparable part of this
                        agreement.
                    </P>
                    <Note>
                        MishtiHouses.com complies with the Information Technology Act, 2000, the IT
                        (Reasonable Security Practices) Rules, 2011, and applicable Indian data protection
                        frameworks. Material updates to our Privacy Policy will be communicated to registered
                        users via email.
                    </Note>
                </>
            ),
        },
        {
            id: "termination",
            label: "Termination",
            icon: <PowerOff size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com reserves the right to suspend, restrict, or permanently terminate your
                        access to the Platform at any time, with or without prior notice, for reasons including
                        breach of these Terms, fraudulent activity, or conduct deemed harmful to other users or
                        the Platform's integrity.
                    </P>
                    <P>
                        You may terminate your account at any time by using the account deletion option in your
                        profile settings or by writing to support@mishthouses.com. Upon termination, your right
                        to access the Platform ceases immediately.
                    </P>
                    <P>
                        Provisions that by their nature survive termination — including intellectual property
                        rights, limitation of liability, dispute resolution, and governing law — shall remain
                        in full force after your account is closed.
                    </P>
                </>
            ),
        },
        {
            id: "changes",
            label: "Changes to Terms",
            icon: <RefreshCcw size={15} />,
            content: (
                <>
                    <P>
                        MishtiHouses.com may revise these Terms from time to time to reflect changes in our
                        services, applicable laws, or operational requirements. We will notify registered users
                        of material changes via email and through a prominent in-Platform notice.
                    </P>
                    <P>
                        The "Last Updated" date at the top of this page reflects the most recent revision.
                        Minor clarifications may be made without separate notification.
                    </P>
                    <Note>
                        Your continued use of MishtiHouses.com after any revised Terms take effect constitutes
                        your binding acceptance of the updated agreement. If you do not agree with a revision,
                        you must discontinue use immediately.
                    </Note>
                </>
            ),
        },
        {
            id: "governing",
            label: "Governing Law",
            icon: <Gavel size={15} />,
            content: (
                <>
                    <P>
                        These Terms shall be governed by, and construed in accordance with, the laws of the
                        Republic of India. Any dispute arising out of or in connection with these Terms or your
                        use of MishtiHouses.com shall be subject to the exclusive jurisdiction of the courts of{" "}
                        <strong className="text-white">New Delhi, India</strong>.
                    </P>
                    <P>
                        In the event of a dispute, both parties agree to first attempt resolution through
                        good-faith negotiation within thirty (30) calendar days. If unsuccessful, disputes shall
                        be resolved through binding arbitration under the Arbitration and Conciliation Act,
                        1996, conducted in English in New Delhi.
                    </P>
                    <P>
                        Nothing herein prevents MishtiHouses.com from seeking injunctive or equitable relief
                        from a court of competent jurisdiction to protect intellectual property rights or
                        prevent imminent irreparable harm.
                    </P>
                </>
            ),
        },
        {
            id: "contact",
            label: "Contact Information",
            icon: <Mail size={15} />,
            content: (
                <>
                    <P>
                        For any questions, legal notices, or complaints regarding these Terms of Service,
                        please reach out to our dedicated support team through the appropriate channel below:
                    </P>
                    <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                        {[
                            { role: "General Enquiries", email: "enquirie@mishthouses.com" },
                            { role: "Legal & Compliance", email: "legal@mishthouses.com" },
                            { role: "Account Support", email: "support@mishthouses.com" },
                            { role: "Security Reports", email: "support@mishthouses.com" },
                        ].map((c) => (
                            <div
                                key={c.role}
                                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 hover:border-[#3B82F6]/25 transition-colors"
                            >
                                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">{c.role}</p>
                                <p className="text-sm text-[#60A5FA] font-medium">{c.email}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Registered Office</p>
                        <p className="text-sm text-[#94A3B8]">
                            MishtiHouses.com , basement B-07, AGS building,C-27 Sector-63, Noida,
                            201301, India.
                        </p>
                    </div>
                </>
            ),
        },
    ];
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function TermsOfServicePage() {
    const sections = buildSections();
    const ids = sections.map((s) => s.id);
    const activeId = useScrollSpy(ids);
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fn = () => setNavScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const progressPct = ((ids.indexOf(activeId) + 1) / sections.length) * 100;

    return (
        <>
            {/* ── Google Fonts ─────────────────────────────────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600&display=swap');
        *, body { font-family: 'Manrope', sans-serif; }
        :root { color-scheme: dark; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #040d18; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 6px; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

            <div className="min-h-screen bg-[#061A2D] grid-bg text-white overflow-x-hidden">

                {/* ── Ambient glows ─────────────────────────────────────────────── */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                    <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/[0.055] blur-[110px]" />
                    <div className="absolute top-[40%] -right-64 w-[450px] h-[450px] rounded-full bg-[#0D6269]/[0.07] blur-[130px]" />
                    <div className="absolute bottom-20 left-1/3 w-[320px] h-[320px] rounded-full bg-[#1d4ed8]/[0.04] blur-[90px]" />
                </div>

                {/* ── Navbar ────────────────────────────────────────────────────── */}
                

                {/* ── Mobile TOC Drawer ─────────────────────────────────────────── */}
                {mobileOpen && (
                    <div className="fixed inset-0 z-[60] lg:hidden">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#061A2D] border-l border-white/[0.07] flex flex-col">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                                <span
                                    className="text-sm font-bold text-white"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    Table of Contents
                                </span>
                                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                                    <X size={18} className="text-white/50 hover:text-white" />
                                </button>
                            </div>
                            <nav className="flex-1 overflow-y-auto py-2">
                                {sections.map((s, i) => {
                                    const isActive = activeId === s.id;
                                    return (
                                        <button
                                            key={s.id}
                                            onClick={() => { smoothScroll(s.id); setMobileOpen(false); }}
                                            className={`w-full text-left flex items-center gap-3 px-5 py-3 text-xs transition-all duration-150 relative ${isActive
                                                ? "text-[#3B82F6] bg-[#3B82F6]/10"
                                                : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 inset-y-0 w-0.5 bg-[#3B82F6] rounded-r-full" />
                                            )}
                                            <span className={isActive ? "text-[#3B82F6]" : "text-white/25"}>{s.icon}</span>
                                            <span className="flex-1 font-medium">{s.label}</span>
                                            <span className="font-mono text-[10px] text-white/15">{String(i + 1).padStart(2, "0")}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                )}

                {/* ── Hero ──────────────────────────────────────────────────────── */}
                <section className="relative z-10 pt-[88px] pb-12 px-5 sm:px-8 max-w-screen-xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 border border-[#3B82F6]/25 bg-[#3B82F6]/[0.08] text-[#93C5FD] text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-6">
                        <Scale size={11} />
                        Legal Document — Effective April 2, 2026
                    </div>

                    <h1
                        className="text-[38px] sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight mb-4 max-w-2xl"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Terms of{" "}
                        <span className="bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] bg-clip-text text-transparent">
                            Service
                        </span>
                    </h1>

                    <p className="text-[#94A3B8] text-base max-w-lg leading-relaxed mb-8">
                        Please read these Terms carefully before using MishtiHouses.com — India's trusted{" "}
                        <em>real estate platform</em> for property buyers, sellers, and renters.
                    </p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { k: "Updated", v: "April 2, 2026" },
                            { k: "Jurisdiction", v: "India (Delhi)" },
                            { k: "Sections", v: `${sections.length} Topics` },
                            { k: "Language", v: "English" },
                        ].map((m) => (
                            <div
                                key={m.k}
                                className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-1.5 text-[12px]"
                            >
                                <span className="text-white/30">{m.k}:</span>
                                <span className="text-white/80 font-medium">{m.v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </section>

                
                <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 pb-28 flex gap-7  xl:gap-10 items-start">


                     <aside className=" sticky top-0 self-start  lg:flex flex-col col-span-3 ">
                        <div className="">

                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md overflow-hidden">

                                
                                <div className="px-4 py-3.5 border-b border-white/[0.06]">
                                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 font-semibold mb-0.5">
                                        Navigate
                                    </p>
                                    <p className="text-sm font-bold text-white font-['Syne']">
                                        Table of Contents
                                    </p>
                                </div>

                               
                                <nav className="py-1.5 max-h-[65vh] overflow-y-auto">
                                    {sections.map((s, i) => {
                                        const isActive = activeId === s.id;

                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => smoothScroll(s.id)}
                                                className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-[11.5px] transition-all duration-150 relative group ${isActive
                                                        ? "text-[#3B82F6] bg-[#3B82F6]/[0.09]"
                                                        : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <span className="absolute left-0 inset-y-0 w-0.5 bg-[#3B82F6] rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                                                )}

                                                <span
                                                    className={`flex-shrink-0 ${isActive
                                                            ? "text-[#3B82F6]"
                                                            : "text-white/20 group-hover:text-white/40"
                                                        }`}
                                                >
                                                    {s.icon}
                                                </span>

                                                <span className="flex-1 truncate font-medium leading-tight">
                                                    {s.label}
                                                </span>

                                                <span
                                                    className={`font-mono text-[9px] ${isActive ? "text-[#3B82F6]/60" : "text-white/10"
                                                        }`}
                                                >
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </nav>

                               
                                <div className="px-4 py-3.5 border-t border-white/[0.06]">
                                    <div className="flex justify-between mb-1.5 text-[10px]">
                                        <span className="text-white/20 uppercase tracking-wide">Progress</span>
                                        <span className="text-[#3B82F6]/60 font-medium">
                                            {ids.indexOf(activeId) + 1} / {sections.length}
                                        </span>
                                    </div>

                                    <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#22d3ee] transition-all duration-300"
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </aside> 


                    <main className="col-span-12 lg:col-span-9">
                        {sections.map((section, i) => (
                            <AnimSection key={section.id} section={section} index={i} />
                        ))}

                        {/* ── CTA ──────────────────────────────────────────────────── */}
                        <div className="mt-4 relative rounded-2xl overflow-hidden border border-[#3B82F6]/20">
                            {/* bg layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#061A2D] to-[#0D3355]" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
                            <div className="absolute inset-0 grid-bg opacity-60" />

                            <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-2 mb-3 text-[#93C5FD] text-[10px] uppercase tracking-widest font-semibold">
                                        <Star size={10} />
                                        Start Your Journey
                                    </div>
                                    <h2
                                        className="text-2xl sm:text-[28px] font-bold text-white mb-2 leading-tight"
                                        style={{ fontFamily: "'Syne', sans-serif" }}
                                    >
                                        Find Your Dream Property
                                    </h2>
                                    <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
                                        Explore thousands of verified <em>property listings</em> across India. Buy, sell,
                                        or rent with full confidence on MishtiHouses.com.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 flex-shrink-0">
                                    <button className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)]">
                                        Browse Listings
                                        <ArrowUpRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => smoothScroll("contact")}
                                        className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/25 text-white/60 hover:text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-200"
                                    >
                                        <Mail size={13} />
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>


            </div>
        </>
    );
}