"use client";

import React, { useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  MapPin, Phone, Mail, Clock, Send, AlertCircle,
  Loader2, Building2, ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface FormData { name: string; email: string; phone: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; phone?: string; subject?: string; message?: string; }

// ── Constants ──────────────────────────────────────────────────────────────

const INIT: FormData = { name: "", email: "", phone: "", subject: "", message: "" };

const SUBJECTS = ["Property Inquiry", "Schedule a Viewing", "Investment Consultation", "Property Valuation", "General Question", "Other"];

const CONTACTS = [
  { icon: MapPin, label: "Head Office",    primary: "C-127 Block-C Sector-63",  secondary: "Noida, Uttar Pardesh 201301", href: "https://maps.google.com" },
  { icon: Phone,  label: "Phone",          primary: "+91 98765 43210",          secondary: "Mon–Sat, 9 AM – 7 PM",       href: "tel:+919876543210" },
  { icon: Mail,   label: "Email",          primary: "contact@misthihouses.com",   secondary: "We reply within 24 hours",   href: "mailto:connect@estateprime.in" },
  { icon: Clock,  label: "Working Hours",  primary: "Monday – Saturday",        secondary: "9:00 AM – 7:00 PM IST",      href: null },
];

// ── Validation ─────────────────────────────────────────────────────────────

function validate(d: FormData): FormErrors {
  const e: FormErrors = {};
  if (!d.name.trim() || d.name.trim().length < 2) e.name = "Full name is required (min 2 chars).";
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email address.";
  if (!d.phone.trim() || !/^\+?[\d\s\-()\\.]{7,15}$/.test(d.phone)) e.phone = "Enter a valid phone number.";
  if (!d.subject.trim()) e.subject = "Please select a subject.";
  if (!d.message.trim() || d.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
  return e;
}

// ── Animation variants (typed to avoid TS2322) ─────────────────────────────

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const fadeUp: Variants   = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const fromLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } } };
const fromRight: Variants= { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } } };

// ── Shared field classes ───────────────────────────────────────────────────

const fieldCls = (err?: string) =>
  ["w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-slate-800",
   "placeholder:text-slate-400 outline-none transition-all duration-200",
   "focus:bg-white focus:ring-2 focus:ring-[#0d3469]/20 focus:border-[#0d3469]",
   err ? "border-red-400 ring-2 ring-red-100 bg-red-50/30" : "border-slate-200 hover:border-slate-300",
  ].join(" ");

// ── FieldError helper ──────────────────────────────────────────────────────

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1"><AlertCircle size={12} />{msg}</p> : null;

// ── Label helper ───────────────────────────────────────────────────────────

const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => (
  <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-600 tracking-wide">
    {text} <span className="text-[#0d3469]">*</span>
  </label>
);

// ── SweetAlert2 toast helper ───────────────────────────────────────────────

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (t) => {
    t.addEventListener("mouseenter", Swal.stopTimer);
    t.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// ── Main Page ──────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
      if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await axios.post("/api/contact", form);
      setForm(INIT);
      setErrors({});
      Toast.fire({ icon: "success", title: "Message sent successfully!", text: "Our team will get back to you within 24 hours." });
    } catch (err) {
      const msg = (err as AxiosError<{ message?: string }>).response?.data?.message ?? "Something went wrong. Please try again.";
      Toast.fire({ icon: "error", title: "Submission failed", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f4f6fb]">

      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#0d3469]/12 to-transparent blur-3xl" />
        <div className="absolute -top-16 right-0 w-[380px] h-[380px] rounded-full bg-gradient-to-bl from-[#1a5aba]/8 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[460px] h-[320px] rounded-full bg-gradient-to-tr from-[#0d3469]/6 to-transparent blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#0d3469" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-2xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#0d3469]/8 border border-[#0d3469]/15 text-[#0d3469] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Building2 size={13} /> EstatePrime Realty
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-[#0d3469] leading-tight tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Whether you&apos;re looking to buy, sell, or invest — our expert team is ready to guide you every step of the way.
          </motion.p>
        </motion.div>
      </section>

      
      <section className="relative px-4 pb-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 items-start">

          {/* LEFT: Info panel */}
          <motion.aside initial="hidden" animate="visible" variants={fromLeft} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d3469] via-[#0f3f7a] to-[#1a5aba] p-8 text-white shadow-2xl shadow-[#0d3469]/30">
              <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
              <div aria-hidden className="absolute bottom-0 -left-8 w-32 h-32 rounded-full bg-white/5" />

              <h2 className="text-xl font-bold mb-1 relative z-10" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Contact Information</h2>
              <p className="text-blue-200 text-sm mb-8 relative z-10">Reach us through any of these channels.</p>

              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4 relative z-10">
                {CONTACTS.map(({ icon: Icon, label, primary, secondary, href }) => {
                  const inner = (
                    <>
                      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 group-hover:bg-white/25 transition-colors"><Icon size={18} /></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-white truncate">{primary}</p>
                        <p className="text-xs text-blue-200 mt-0.5">{secondary}</p>
                      </div>
                      {href && <ChevronRight size={16} className="shrink-0 mt-1 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </>
                  );
                  return (
                    <motion.div key={label} variants={fadeUp}>
                      {href
                        ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/15 transition-all duration-300">{inner}</a>
                        : <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/8 border border-white/10">{inner}</div>
                      }
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/15 text-center">
                <p className="text-xs text-blue-200">Trusted by <span className="font-bold text-white">4,200+</span> homeowners &amp; investors across India</p>
              </div>
            </div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-48">
              <iframe title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.122874949836!2d72.86527327454906!3d19.05913415269566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a0a7c1e9%3A0x4da23e3da3d36e30!2sBandra%20Kurla%20Complex%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1710000000000"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
          </motion.aside>

          {/* RIGHT: Form */}
          <motion.div initial="hidden" animate="visible" variants={fromRight} className="lg:col-span-3">
            <div className="rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/80 p-8 sm:p-10 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-[#0d3469] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Send Us a Message</h2>
              <p className="text-sm text-slate-500 mb-8">Fill in the form below and we&apos;ll get back to you promptly.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" text="Full Name" />
                    <input id="name" name="name" placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleChange} autoComplete="off" className={fieldCls(errors.name)} />
                    <FieldError msg={errors.name} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" text="Email Address" />
                    <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="off" className={fieldCls(errors.email)} />
                    <FieldError msg={errors.email} />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone" text="Phone Number" />
                    <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} autoComplete="off" className={fieldCls(errors.phone)} />
                    <FieldError msg={errors.phone} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="subject" text="Subject" />
                    <select id="subject" name="subject" value={form.subject} onChange={handleChange}
                      className={[fieldCls(errors.subject), "cursor-pointer appearance-none", form.subject === "" ? "text-slate-400" : "text-slate-800"].join(" ")}>
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <FieldError msg={errors.subject} />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" text="Your Message" />
                  <textarea id="message" name="message" rows={5} placeholder="Tell us about the property you're looking for, your budget, preferred location…"
                    value={form.message} onChange={handleChange}
                    className={[fieldCls(errors.message), "resize-none"].join(" ")} />
                  <div className="flex justify-between items-center">
                    <FieldError msg={errors.message} />
                    <span className="ml-auto text-xs text-slate-400">{form.message.length} / 500</span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button type="submit" disabled={loading}
                  whileHover={!loading ? { scale: 1.015, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={["relative w-full flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white tracking-wide transition-all duration-300 overflow-hidden",
                    loading ? "bg-[#0d3469]/60 cursor-not-allowed" : "bg-gradient-to-r from-[#0d3469] to-[#1a5aba] hover:shadow-xl hover:shadow-[#0d3469]/30 cursor-pointer",
                  ].join(" ")}>
                  {!loading && <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />}
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <><Send size={17} /> Send Message</>}
                </motion.button>

                <p className="text-center text-xs text-slate-400">
                  By submitting, you agree to our <a href="/privacy" className="text-[#0d3469] hover:underline font-medium">Privacy Policy</a>. We never share your data.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}