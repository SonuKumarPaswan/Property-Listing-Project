"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";



/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL WRAPPER
───────────────────────────────────────────────────────────────────────────── */
function ScrollReveal({
  children,
  variants = fadeUp,
  custom = 0,
  className = "",
}: {
  children: React.ReactNode;
  variants?: Variants;
  custom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   REUSABLE UI COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

function PillLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-800" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
        {text}
      </span>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`rounded-2xl border p-7 backdrop-blur-md ${
        highlight
          ? "border-blue-500/40 bg-gradient-to-br from-blue-900/30 to-[#041C32]/80"
          : "border-white/10 bg-white/5"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4 py-20">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-700/50" />
      <div className="h-2 w-2 rotate-45 bg-blue-600" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-700/50" />
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <ScrollReveal>
      <GlassCard className="flex flex-col items-center justify-center text-center">
        <span className="bg-gradient-to-r from-blue-300 to-blue-300 bg-clip-text text-5xl font-black text-transparent">
          {value}
        </span>
        <span className="mt-2 text-sm uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </GlassCard>
    </ScrollReveal>
  );
}

function NumberedCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <ScrollReveal>
      <GlassCard className="h-full">
        <div className="mb-5 text-5xl font-black text-blue-700/40">{num}</div>
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
      </GlassCard>
    </ScrollReveal>
  );
}

function PlanCard({
  name,
  highlight = false,
  badge,
  features,
}: {
  name: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
}) {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative h-full rounded-2xl border p-8 backdrop-blur-md ${
          highlight
            ? "border-blue-500/60 bg-gradient-to-b from-blue-900/40 to-[#041C32]/80 shadow-xl shadow-blue-500/10"
            : "border-white/10 bg-white/5"
        }`}
      >
        {badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 px-5 py-1 text-xs font-bold tracking-widest text-white shadow-lg shadow-blue-500/30">
            {badge}
          </div>
        )}
        <h3 className={`mb-6 text-2xl font-black ${highlight ? "text-blue-300" : "text-white"}`}>
          {name}
        </h3>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/15">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-800" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </motion.div>
    </ScrollReveal>
  );
}

function TeamCard({
  initials,
  name,
  role,
  desc,
  highlight = false,
}: {
  initials: string;
  name: string;
  role: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <ScrollReveal>
      <GlassCard highlight={highlight} className="h-full">
        <div
          className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black ${
            highlight
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-blue-900/60 text-blue-800"
          }`}
        >
          {initials}
        </div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className={`mb-3 text-sm font-semibold ${highlight ? "text-blue-800" : "text-blue-500"}`}>
          {role}
        </p>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
      </GlassCard>
    </ScrollReveal>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <ScrollReveal>
      <GlassCard className="h-full">
        <div className="mb-4 h-px w-12 bg-gradient-to-r from-blue-500 to-blue-500" />
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
      </GlassCard>
    </ScrollReveal>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main
      className="min-h-screen overflow-x-hidden text-white antialiased"
      style={{
        background: "linear-gradient(160deg, #020617 0%, #041C32 55%, #0a3040 100%)",
      }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ══════════════════════════════════════════
          1 · HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D6269]/20 blur-[120px]" />
          <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-blue-800/15 blur-[80px]" />
          <div className="absolute right-[8%] bottom-[15%] h-48 w-48 rounded-full bg-blue-900/20 blur-[60px]" />
        </motion.div>

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <PillLabel text="Digital Real Estate Platform · Launching 2026" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.08}
            className="mb-7 text-6xl font-black leading-[1.08] tracking-tight md:text-8xl lg:text-9xl"
          >
            About{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #2043B0 0%, #2043B0 40%, #67e8f9 100%)",
              }}
            >
              Mishti           
            <span className="text-white"> Houses.com</span>
             </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            A new kind of real estate platform — built to connect buyers, sellers,
            owners, and renters across India through transparency, technology, and
            genuine trust. Your dream home is out there. We make finding it effortless.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.24}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-9 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-500/20"
              style={{ background: "linear-gradient(110deg, #2043B0 0%, #2043B0 40%, #67e8f9 100%)" }}
            >
              Explore Properties
            </motion.a>
            <motion.a
              href="#story"
              whileHover={{ scale: 1.06, borderColor: "rgba(94,234,212,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-blue-600/40 bg-blue-900/20 px-9 py-4 text-sm font-bold text-blue-300 backdrop-blur-sm transition-colors"
            >
              Our Story
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-blue-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section className="relative border-y border-white/5 py-16 px-6 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard value="50,000+" label="Properties" />
          <StatCard value="30+" label="Cities" />
          <StatCard value="1.2L+" label="Users" />
          <StatCard value="98%" label="Verified" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2 · PLATFORM OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Platform Overview" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              A Digital Real Estate{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Ecosystem
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">
              Mishti Houses is not a brokerage. It is not an agency. It is a
              technology-first platform that brings the entire property search
              and transaction journey into one clean, transparent digital space.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal variants={slideLeft}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-white">Not a Broker. A Platform.</h3>
                <p className="leading-relaxed text-slate-300">
                  Traditional real estate is broken. It is fragmented, opaque, and
                  driven by middlemen who benefit from information asymmetry. Mishti
                  Houses was built to flip that model entirely. We are a digital
                  infrastructure layer — connecting buyers directly with sellers, and
                  renters directly with owners, without friction or artificial barriers.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Agents and property owners can list on our platform, but the platform
                  itself is neutral, transparent, and always in the user's corner. Every
                  feature we ship, every policy we set, serves one goal: making the right
                  property easier to find, trust, and secure.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variants={slideRight}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-5 text-2xl font-bold text-white">Who the Platform Serves</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { role: "Buyers", desc: "Discover and shortlist verified properties across cities with smart filters and real data." },
                    { role: "Sellers", desc: "Reach thousands of qualified buyers with detailed listings and analytics." },
                    { role: "Owners", desc: "List rental properties directly, manage inquiries, and connect without agents." },
                    { role: "Agents", desc: "Expand reach by listing on India's most transparent property discovery platform." },
                  ].map((item) => (
                    <div key={item.role} className="rounded-xl border border-white/8 bg-white/3 p-4">
                      <p className="mb-1 font-bold text-blue-800">{item.role}</p>
                      <p className="text-xs leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

     
      <section id="story" className="relative px-6 py-28">
        <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Our Story" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              A Vision Built for{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                2025 and Beyond
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                year: "2025",
                title: "The Vision",
                desc: "Mishti Houses began not from a boardroom decision, but from a clear-eyed observation: India's property market was vast, full of potential, and deeply underserved by technology. In 2025, a small team came together with one shared conviction — that finding a home should be as simple and trustworthy as any modern digital experience. The vision was to build a platform that removed layers of complexity, brought transparency to every listing, and put the searcher firmly in control.",
              },
              {
                year: "2025–26",
                title: "The Build",
                desc: "With a team of engineers and product thinkers, the platform was engineered from the ground up — prioritising speed, accuracy, and trust above all else. Every feature was designed with a long-term user experience in mind: how does a first-time buyer feel? What does a seller need to feel confident? What makes a renter trust a listing enough to actually show up? These questions drove every architectural and design decision throughout the development phase.",
              },
              {
                year: "2026",
                title: "The Launch",
                desc: "Mishti Houses is now moving towards its official launch in 2026. The platform has been built to scale — from a handful of cities to a nationwide presence — without compromising on the quality, verification standards, or user experience that defines it. The launch is not just a product release. It is the opening of a new chapter in how India discovers, evaluates, and secures property. The mission is set. The platform is ready. The journey begins.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.year} custom={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.28 }}
                  className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <span className="mb-4 block text-5xl font-black text-blue-700/35">{item.year}</span>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10">
            <div className="rounded-2xl border border-blue-600/25 bg-gradient-to-r from-blue-900/20 via-[#041C32]/60 to-blue-900/20 p-10 text-center backdrop-blur-sm">
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                "We did not build Mishti Houses to be another listing directory. We built it to be
                the platform every Indian turns to when a property decision matters — because for
                most families, it is the most important decision of their lives."
              </p>
              <p className="mt-5 text-sm font-semibold text-blue-800">— Mishti Houses Founding Team</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          4 · WHAT WE OFFER
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="What We Offer" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Everything You Need,{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">
              From initial discovery to final decision — Mishti Houses covers every part
              of the property journey with purpose-built features.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <NumberedCard
              num="01"
              title="Property Search"
              desc="Search across thousands of residential and commercial listings — flats, villas, plots, and offices — with precision filters for location, budget, BHK, amenities, and more. Our search engine is fast, accurate, and built to surface what you actually want."
            />
            <NumberedCard
              num="02"
              title="Dream Home Discovery"
              desc="Our AI-informed recommendation engine learns your preferences over time and proactively surfaces properties that match your lifestyle, budget, and location criteria — reducing the time from search to shortlist dramatically."
            />
            <NumberedCard
              num="03"
              title="Verified Listings"
              desc="Every listing on Mishti Houses passes through a structured verification process before going live. We confirm ownership documents, validate contact details, and perform authenticity checks — so you never waste time on outdated or fraudulent posts."
            />
            <NumberedCard
              num="04"
              title="Buy, Sell and Rent"
              desc="Whether you are purchasing your first home, selling an investment property, or looking for a rental in a new city, Mishti Houses provides a dedicated end-to-end flow for each journey — tailored to what that specific transaction actually requires."
            />
            <NumberedCard
              num="05"
              title="Direct Connections"
              desc="We believe in reducing unnecessary layers. Buyers can connect directly with sellers and owners, ask questions, schedule visits, and negotiate — all from within the platform, with full transparency on both sides."
            />
            <NumberedCard
              num="06"
              title="Transparent Pricing"
              desc="No hidden fees. No surprise brokerage. The price you see is the price of the property. We make the full cost structure visible upfront — because confident property decisions are built on complete information."
            />
          </div>
        </div>
      </section>

      <SectionDivider />


      {/* ══════════════════════════════════════════
          6 · WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <ScrollReveal variants={slideLeft}>
              <div>
                <PillLabel text="Why Choose Us" />
                <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                  The Mishti Houses{" "}
                  <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                    Difference
                  </span>
                </h2>
                <p className="mt-5 leading-relaxed text-slate-400">
                  In a market saturated with platforms that overpromise and underdeliver,
                  Mishti Houses is being built on fundamentally different principles —
                  ones that put the user's interest first, always.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We are not measuring success by the number of listings we accumulate.
                  We measure it by how many people found the right property, made a
                  confident decision, and had an experience worth recommending.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-4">
              {[
                { title: "Verified First, Listed Second", desc: "No property appears on Mishti Houses without passing our verification checks. Authenticity is the price of entry." },
                { title: "No Middlemen Dependency", desc: "Buyers and owners connect directly. The platform enables the relationship — it does not extract rent from it." },
                { title: "Radical Transparency", desc: "Pricing, ownership, availability — all visible, all honest. No fine print, no hidden agendas." },
                { title: "Built for Every City", desc: "Not just metros. Our platform is designed to serve users across Tier-1, Tier-2, and Tier-3 cities with equal depth." },
                { title: "User Experience as Standard", desc: "Every decision is made with the user's experience in mind — from search speed to mobile responsiveness." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} custom={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.22 }}
                    className="flex gap-5 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
                  >
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <div>
                      <h3 className="mb-1 font-bold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          7 · FEATURES
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Platform Features" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Engineered for{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Effortless Discovery
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Smart Search Engine",
                desc: "Natural language and structured filters working together. Search by neighbourhood, builder name, project name, or specific requirement — the engine understands context, not just keywords.",
              },
              {
                title: "Advanced Filter System",
                desc: "Narrow results by budget, BHK, property age, floor preference, facing direction, nearby amenities, RERA registration, and 20+ additional parameters — all in real time.",
              },
              {
                title: "Personalised Dashboard",
                desc: "Save searches, bookmark properties, track price changes, manage inquiries, and review your property history — all in a single, clean dashboard built for both buyers and listers.",
              },
              {
                title: "Real-Time Updates",
                desc: "Property availability changes instantly. Price drops, new listings, and status updates trigger immediate notifications — so you never miss a property that matters.",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <GlassCard className="h-full">
                  <div className="mb-5 h-1 w-full rounded-full bg-gradient-to-r from-blue-900 to-blue-500 opacity-60" />
                  <h3 className="mb-3 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          8 + 9 · MISSION & VISION
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal variants={slideLeft}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-[#041C32]/80 p-10 backdrop-blur-md">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                <PillLabel text="Our Mission" />
                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
                  Make Property Discovery{" "}
                  <span className="bg-gradient-to-r from-blue-800 to-cyan-400 bg-clip-text text-transparent">
                    Honest and Simple
                  </span>
                </h2>
                <p className="mt-5 leading-relaxed text-slate-300">
                  Our mission is to build the most transparent, trustworthy, and accessible
                  property platform in India. We exist to remove the friction, opacity, and
                  anxiety that surrounds property decisions — and replace it with clarity,
                  confidence, and control for every user.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We are building for the first-time buyer in a Tier-2 city who does not
                  know where to start. For the NRI investing from abroad who needs to trust
                  the data. For the young professional renting in a new city who just wants
                  a straightforward experience. Every product decision is made for them.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variants={slideRight}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <PillLabel text="Our Vision" />
                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
                  India's Most Trusted{" "}
                  <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                    Property Platform
                  </span>
                </h2>
                <p className="mt-5 leading-relaxed text-slate-300">
                  We envision a future where every property decision in India — from a studio
                  rental to a commercial investment — begins and ends on Mishti Houses. Not
                  because we forced ourselves into the market, but because we earned the trust
                  of users through consistently superior experience and relentlessly honest
                  practices.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  In our vision, Mishti Houses is not just a website or an app. It is the
                  infrastructure layer of Indian real estate — the platform that defines
                  what transparency, discovery, and trust look like in this industry for
                  the next generation of buyers and investors.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          10 · GOALS & FOCUS
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          {/* GOALS */}
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Goals" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              What We Are{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Working Towards
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">
              Every goal we set is paired with a roadmap and a team committed to seeing
              it through — without cutting corners on quality or trust.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NumberedCard
              num="01"
              title="Multi-City Expansion"
              desc="Mishti Houses will expand across 100+ cities in the near term, with hyperlocal content, regional language support, and on-ground verification teams in every major market — ensuring depth, not just width of coverage."
            />
            <NumberedCard
              num="02"
              title="Superior User Experience"
              desc="Every quarter, our product team ships improvements driven entirely by user research. Faster load times, simpler flows, smarter onboarding — the product is never considered done as long as friction exists anywhere in the journey."
            />
            <NumberedCard
              num="03"
              title="Smart Discovery Tools"
              desc="We are building intelligent tools — AI-assisted matching, neighbourhood scoring, investment potential calculators, and price trend visualisations — that help users make decisions based on real insight, not guesswork."
            />
            <NumberedCard
              num="04"
              title="Faster, Simpler Search"
              desc="Our  team is focused on reducing the time from first search to verified shortlist to under 10 minutes. Property search should feel as fast and intuitive as any great consumer app."
            />
            <NumberedCard
              num="05"
              title="End-to-End Digital Transactions"
              desc="We are building towards a fully digital transaction pipeline — from offer to documentation to registration — that removes the need for physical paperwork entirely for eligible transactions."
            />
            <NumberedCard
              num="06"
              title="Builder Ecosystem"
              desc="Onboarding India's top real estate developers to list new launches and pre-launch opportunities on Mishti Houses, giving registered users early, verified access to premium projects before the wider market."
            />
          </div>

          {/* FOCUS */}
          <ScrollReveal className="mb-10 mt-24 text-center">
            <PillLabel text="Focus" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Where We Put Our{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Energy
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "User Experience Above All Else",
                desc: "Every  sprint and design cycle is evaluated through a single lens: does this improve the user's experience? We relentlessly remove friction from every touchpoint — search, contact, shortlist, transact — because the best platform feels effortless.",
                accent: "from-blue-500 to-blue-700",
              },
              {
                title: "Data Quality and Listing Accuracy",
                desc: "Stale listings are trust killers. Our team runs daily freshness audits, automated availability checks, and user-flagged review workflows to ensure that every listing on Mishti Houses is current, accurate, and trustworthy at all times.",
                accent: "from-blue-500 to-blue-600",
              },
              {
                title: "Education and Buyer Empowerment",
                desc: "We are building India's most comprehensive free resource hub for property buyers — covering home loan guides, RERA explainers, neighbourhood reviews, first-time buyer checklists, and market trend reports. An informed buyer makes better decisions.",
                accent: "from-blue-600 to-blue-600",
              },
              {
                title: "Sustainable, Quality-First Growth",
                desc: "We grow with discipline. Rather than accumulating listings in cities where we cannot deliver quality, we go deep before going wide. Our expansion strategy prioritises verified depth in every market before moving to the next.",
                accent: "from-blue-600 to-blue-500",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28 }}
                  className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                  <h3 className="mb-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="leading-relaxed text-slate-400">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          11 · CORE VALUES
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Core Values" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Principles That{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Define Us
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              title="Trust"
              desc="Trust is not a feature. It is the foundation on which every feature, every policy, and every user interaction at Mishti Houses is built. We earn it by being consistent, honest, and user-first in every decision we make."
            />
            <ValueCard
              title="Transparency"
              desc="Open information creates confident decisions. We believe that every user deserves the complete picture — on pricing, ownership, availability, and platform operations — without having to ask for it."
            />
            <ValueCard
              title="Innovation"
              desc="The real estate industry has been resistant to technology for too long. We challenge the status quo with every product release — using AI, data, and thoughtful design to remove pain points that have existed for decades."
            />
            <ValueCard
              title="Integrity"
              desc="We do the right thing even when it is not the easy thing. We do not accept listings that fail our standards. We do not hide fees. We do not manipulate search results. Integrity is non-negotiable at every level."
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          12 · TEAM
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Our Team" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              The Builders Behind{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Every Feature
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-400">
              Mishti Houses is built by a product-focused team of engineers, platform architects,
              and real estate thinkers — united by a shared obsession with making property discovery
              better. No politics. No fluff. Just great work.
            </p>
          </ScrollReveal>

          {/* Engineering */}
          <ScrollReveal>
            <h3 className="mb-6 flex items-center gap-4 text-base font-bold uppercase tracking-widest text-blue-800">
              <span className="h-px flex-1 bg-blue-800/40" />Engineering<span className="h-px flex-1 bg-blue-800/40" />
            </h3>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TeamCard
              initials="AD"
              name="Akanshu Dutt"
              role=" Full Stack Developer"
              desc="Akanshu leads the entire technical vision and execution at Mishti Houses. He designed the platform architecture, leads the engineering team, and makes the high-stakes technology decisions that define what the product can do. With expertise spanning full-stack engineering, system design, and scalable infrastructure, he ensures the platform performs reliably for every user across every city."
              highlight
            />
            <TeamCard
              initials="SK"
              name="Sonu Kumar Paswan"
              role="Backend Developer"
              desc="Sonu drives the development of the platform's most critical user-facing features, from the search engine to the property listing dashboard. His command of both frontend and backend systems means he can own complete product features end-to-end — and his attention to performance and code quality sets the engineering standard."
            />
            <TeamCard
              initials="FE"
              name="Frontend Engineering"
              role="UI and Experience Engineers"
              desc="A team of frontend engineers who own the visual and interactive layer of Mishti Houses. They translate design into production-grade, responsive, and accessible code using Next.js and Tailwind CSS — ensuring that every user, on any device, gets an experience that feels fast and intentional."
            />
          </div>

          {/* Product & Design */}
          <ScrollReveal>
            <h3 className="mb-6 mt-12 flex items-center gap-4 text-base font-bold uppercase tracking-widest text-blue-800">
              <span className="h-px flex-1 bg-blue-800/40" />Product and Design<span className="h-px flex-1 bg-blue-800/40" />
            </h3>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TeamCard
              initials="PM"
              name="Product Team"
              role="Product Strategy and Management"
              desc="Our product team connects user needs with technical capability. They define the roadmap, prioritise the backlog, run user research, and ensure that every feature shipped moves the needle on trust, usability, and platform quality."
            />
            <TeamCard
              initials="DS"
              name="Design Studio"
              role="UX and Interface Design"
              desc="The design team owns the visual identity and user experience of the platform. From wireframes to final interfaces, they apply rigorous UX principles and continuous usability testing to create a product that is as beautiful as it is functional."
            />
            <TeamCard
              initials="QA"
              name="QA Engineering"
              role="Quality and Testing"
              desc="Our QA engineers run automated and manual test suites across every release cycle. They are the last line of defence before anything reaches a user — ensuring every deployment is stable, reliable, and regression-free."
            />
          </div>

          {/* Operations */}
          <ScrollReveal>
            <h3 className="mb-6 mt-12 flex items-center gap-4 text-base font-bold uppercase tracking-widest text-blue-800">
              <span className="h-px flex-1 bg-blue-800/40" />Operations and Growth<span className="h-px flex-1 bg-blue-800/40" />
            </h3>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TeamCard
              initials="RE"
              name="Property Experts"
              role="Real Estate Advisory"
              desc="Certified real estate professionals who own the verification pipeline, advise users on market conditions, and ensure that all listings comply with RERA regulations and Mishti Houses' own quality standards across every city."
            />
            <TeamCard
              initials="CS"
              name="Customer Success"
              role="Support and Relations"
              desc="A multilingual support team available around the clock for buyers, sellers, and renters. Their goal is not just resolution — it is genuine satisfaction and the confidence that comes from feeling supported through every step."
            />
            <TeamCard
              initials="GR"
              name="Growth and Partnerships"
              role="Marketing and Ecosystem"
              desc="The team building Mishti Houses' presence across every market — through targeted digital campaigns, builder partnerships, and community-led initiatives that grow the platform through genuine value, not paid noise."
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          13 · FUTURE PLANS
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,#0D6269_0%,transparent_70%)] opacity-10" />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 text-center">
            <PillLabel text="Future Plans" />
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              The Mishti Houses of{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                Tomorrow
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">
              We are not building for the next quarter. We are building for the next
              decade — with technology choices and product decisions that compound in value.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal variants={slideLeft}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-blue-800">AI-Based Recommendations</h3>
                <p className="leading-relaxed text-slate-300">
                  Our next-generation recommendation engine will use machine learning to
                  understand each user's implicit preferences — not just what they searched
                  for, but what they paused on, shortlisted, and ultimately chose — to
                  surface properties they would not have found through search alone.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  We are also building natural language search that lets users describe what
                  they want in plain terms — and surfaces results that match the full context
                  of the request, not just individual keywords.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variants={slideRight}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-blue-800">Smart Analytics Platform</h3>
                <p className="leading-relaxed text-slate-300">
                  We are building a free public analytics layer covering price trends, rental
                  yield benchmarks, neighbourhood appreciation rates, and infrastructure
                  development impact on property values across every city we operate in.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Buyers and investors will access market intelligence reports previously
                  available only to institutions — democratising data that has historically
                  given professionals an unfair advantage over individual buyers.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variants={slideLeft}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-blue-800">Platform Expansion</h3>
                <p className="leading-relaxed text-slate-300">
                  Our expansion strategy extends beyond Indian borders — to NRI communities
                  across the world who want to invest in India with the same confidence and
                  simplicity that domestic buyers enjoy, with multi-currency support and
                  virtual tour integrations.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Domestically, we are deepening Tier-2 and Tier-3 coverage with dedicated
                  local teams, regional language interfaces, and market-specific features that
                  make Mishti Houses as powerful in Varanasi as it is in Bengaluru.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variants={slideRight}>
              <GlassCard className="h-full">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-blue-500 to-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-blue-800">End-to-End Transactions</h3>
                <p className="leading-relaxed text-slate-300">
                  The ultimate vision is a completely digital, end-to-end property transaction
                  — from offer to registration — requiring zero physical paperwork for eligible
                  properties. We are working with legal and regulatory bodies to make this
                  a reality within the next few years.
                </p>
                <p className="mt-4 leading-relaxed text-slate-400">
                  This includes integrated home loan applications, digital escrow services,
                  stamp duty management, and blockchain-verified ownership transfer — a complete
                  reimagining of what closing a property deal can feel like in the modern era.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-10">
            <div className="grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/4 p-8 backdrop-blur-sm">
              {[
                { value: "250+", label: "Target Cities by 2028" },
                { value: "5L+", label: "Listings Target" },
                { value: "10M+", label: "Users Served" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-blue-800 md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════
          14 · CTA
      ══════════════════════════════════════════ */}
      <section id="explore" className="relative overflow-hidden px-6 py-40 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#fff_0%,transparent_70%)] opacity-20" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-800/20 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollReveal>
            <PillLabel text="Start Today" />
            <h2 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Your Dream Home{" "}
              <span className="bg-gradient-to-r from-blue-800 via-blue-300 to-blue-300 bg-clip-text text-transparent">
                Is Waiting
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-400">
              Whether you are searching for your first home, listing a property, or
              exploring what the market looks like — Mishti Houses is the platform built
              to make that journey simpler, faster, and more trustworthy than anything
              you have experienced before.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-10 py-4 text-base font-bold text-white shadow-2xl shadow-blue-500/25"
style={{ background: "linear-gradient(110deg, #2043B0 0%, #2043B0 40%, #67e8f9 100%)" }}              >
                Explore Properties
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-blue-600/40 bg-blue-900/20 px-10 py-4 text-base font-bold text-blue-300 backdrop-blur-sm hover:border-blue-500/60 transition-colors"
              >
                Start Your Search
              </motion.a>
            </div>

            <div className="mx-auto mt-14 grid max-w-sm grid-cols-3 gap-6">
              {[
                { v: "< 2 hrs", l: "Response Time" },
                { v: "30+", l: "Cities" },
                { v: "24×7", l: "Support" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-black text-gray-400">{s.v}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{s.l}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}