"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: "Properties",
    href: "/properties",
    icon: (
      <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    dropdown: [
      { label: "Buy", href: "/properties/buy", desc: "Ready-to-move homes" },
      { label: "Rent", href: "/properties/rent", desc: "Verified rental listings" },
      { label: "New Projects", href: "/properties/new", desc: "Under-construction deals" },
      { label: "Commercial", href: "/properties/commercial", desc: "Offices & shops" },
    ],
  },
  {
    label: "Explore",
    href: "/explore",
    icon: (
      <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    dropdown: [
      { label: "City Guide", href: "/explore/cities", desc: "Top cities to invest" },
      { label: "Locality Insights", href: "/explore/locality", desc: "Neighbourhood data" },
      { label: "Price Trends", href: "/explore/trends", desc: "Market analytics" },
    ],
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: (
      <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: "Agents",
    href: "/agents",
    icon: (
      <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .mh-nav {
          font-family: 'Outfit', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .mh-nav.scrolled {
          background: rgba(10, 22, 40, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4), 0 1px 0 rgba(37,99,235,0.3);
        }
        .mh-nav.top {
          background: linear-gradient(180deg, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0) 100%);
        }

        /* Animated bottom border */
        .mh-nav::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #2563eb, #3b82f6, #2563eb, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .mh-nav.scrolled::after { opacity: 1; }

        /* Logo animation */
        .mh-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          transition: transform 0.3s;
        }
        .mh-logo:hover { transform: scale(1.03); }
        .mh-logo-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(59,130,246,0.35);
          transition: box-shadow 0.3s, transform 0.3s;
          flex-shrink: 0;
          background: rgba(255,255,255,0.05);
        }
        .mh-logo:hover .mh-logo-icon {
          box-shadow: 0 0 30px rgba(59,130,246,0.65);
          transform: scale(1.08) rotate(-3deg);
        }
        .mh-logo-text { font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.3px; }
        .mh-logo-text span { color: #60a5fa; }
        .mh-logo-full {
          display: flex; align-items: center;
          filter: drop-shadow(0 0 10px rgba(59,130,246,0.3));
          transition: filter 0.3s, transform 0.3s;
        }
        .mh-logo:hover .mh-logo-full {
          filter: drop-shadow(0 0 18px rgba(59,130,246,0.6));
          transform: scale(1.04);
        }

        /* Nav link */
        .mh-link {
          position: relative;
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.875rem; font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: all 0.25s;
          cursor: pointer;
          white-space: nowrap;
          border: none; background: none;
        }
        .mh-link:hover, .mh-link.active {
          color: #fff;
          background: rgba(37,99,235,0.15);
        }
        .mh-link .mh-link-arrow {
          transition: transform 0.25s;
          opacity: 0.5;
        }
        .mh-link.dropdown-open .mh-link-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }
        /* Animated underline */
        .mh-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; right: 50%;
          height: 2px;
          border-radius: 2px;
          background: #3b82f6;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .mh-link:hover::after, .mh-link.active::after {
          left: 14px; right: 14px;
        }

        /* Dropdown */
        .mh-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          min-width: 240px;
          background: rgba(10,22,40,0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(37,99,235,0.25);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
          opacity: 0; pointer-events: none;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .mh-dropdown.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .mh-dropdown-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mh-dropdown-item:hover { background: rgba(37,99,235,0.2); }
        .mh-dropdown-item-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3b82f6;
          margin-top: 6px; flex-shrink: 0;
        }
        .mh-dropdown-item-label {
          font-size: 0.875rem; font-weight: 600; color: #fff;
        }
        .mh-dropdown-item-desc {
          font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 1px;
        }

        /* Buttons */
        .mh-btn-login {
          padding: 8px 18px;
          border-radius: 9px;
          font-size: 0.875rem; font-weight: 600;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          text-decoration: none;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .mh-btn-login:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
          transform: translateY(-1px);
        }
        .mh-btn-add {
          position: relative; overflow: hidden;
          padding: 8px 18px;
          border-radius: 9px;
          font-size: 0.875rem; font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          border: none; text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 4px 15px rgba(37,99,235,0.4);
          white-space: nowrap;
          display: flex; align-items: center; gap: 6px;
        }
        .mh-btn-add::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 100%; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: all 0.5s;
        }
        .mh-btn-add:hover::before { left: 100%; right: -100%; }
        .mh-btn-add:hover {
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          box-shadow: 0 6px 20px rgba(37,99,235,0.6);
          transform: translateY(-2px);
        }

        /* Notification dot */
        .mh-notif-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ef4444;
          position: absolute; top: 6px; right: 8px;
          box-shadow: 0 0 6px #ef4444;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        /* Hamburger */
        .mh-hamburger {
          display: flex; flex-direction: column; justify-content: center;
          gap: 5px; width: 36px; height: 36px; padding: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .mh-hamburger:hover { background: rgba(255,255,255,0.12); }
        .mh-hamburger span {
          display: block; height: 2px; border-radius: 2px;
          background: rgba(255,255,255,0.8);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .mh-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .mh-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .mh-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .mh-mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(7, 15, 30, 0.98);
          backdrop-filter: blur(20px);
          z-index: 999;
          display: flex; flex-direction: column;
          padding: 90px 24px 40px;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          transform: translateX(100%);
          overflow-y: auto;
        }
        .mh-mobile-menu.open { transform: translateX(0); }

        .mh-mobile-link {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 1rem; font-weight: 600;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .mh-mobile-link:hover {
          color: #fff;
          background: rgba(37,99,235,0.15);
          border-color: rgba(37,99,235,0.3);
        }
        .mh-mobile-link-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: rgba(37,99,235,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #60a5fa;
          flex-shrink: 0;
        }

        /* Animate nav items on load */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mh-nav-item {
          animation: slideDown 0.4s ease both;
        }
        .mh-nav-item:nth-child(1) { animation-delay: 0.05s; }
        .mh-nav-item:nth-child(2) { animation-delay: 0.1s; }
        .mh-nav-item:nth-child(3) { animation-delay: 0.15s; }
        .mh-nav-item:nth-child(4) { animation-delay: 0.2s; }
        .mh-nav-item:nth-child(5) { animation-delay: 0.25s; }

        /* Search pill */
        .mh-search {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 6px 14px;
          cursor: pointer;
          transition: all 0.25s;
          font-size: 0.8rem; color: rgba(255,255,255,0.5);
          font-family: 'Outfit', sans-serif;
        }
        .mh-search:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(37,99,235,0.4);
          color: rgba(255,255,255,0.7);
        }
      `}</style>

      <nav className={`mh-nav ${scrolled ? "scrolled" : "top"}`}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Logo */}
          <Link href="/" className="mh-logo mh-nav-item" style={{ animationDelay: "0s" }}>
            <div className="mh-logo-full">
              <Image src="/logo.png" alt="Mishti Houses Logo" width={160} height={148} style={{ objectFit: "contain", width: "auto", height: "178px" }} priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1" style={{ flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="mh-nav-item"
                style={{ position: "relative" }}
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`mh-link ${activeDropdown === link.label ? "dropdown-open active" : ""}`}
                >
                  {link.icon}
                  {link.label}
                  {link.label === "Wishlist" && (
                    <span className="mh-notif-dot" />
                  )}
                  {link.dropdown && (
                    <svg className="mh-link-arrow" style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {link.dropdown && (
                  <div className={`mh-dropdown ${activeDropdown === link.label ? "open" : ""}`}>
                    {link.dropdown.map((item) => (
                      <Link key={item.label} href={item.href} className="mh-dropdown-item">
                        <div className="mh-dropdown-item-dot" />
                        <div>
                          <div className="mh-dropdown-item-label">{item.label}</div>
                          <div className="mh-dropdown-item-desc">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 mh-nav-item">
            {/* Search pill */}
            <button className="mh-search">
              <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search city or area…
            </button>

            <Link href="/Sign-In" className="mh-btn-login">Login</Link>

            <Link href="/owner/add-property" className="mh-btn-add">
              <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Property
            </Link>
          </div>

          
          <button
            className={`mh-hamburger md:hidden ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      
      <div className={`mh-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {/* Mobile logo */}
        {/* <div style={{ marginBottom: 32 }}>
          <div className="mh-logo-full">
            <Image src="/logo.png" alt="Mishti Houses Logo" width={60} height={48} style={{ objectFit: "contain", width: "auto", height: "144px" }} priority />
          </div>
        </div> */}

        {/* Mobile search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12, padding: "12px 16px",
          marginBottom: 24,
        }}>
          <svg style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit',sans-serif" }}>Search city or area…</span>
        </div>

        
        <div style={{ flex: 1 }}>
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link href={link.href} className="mh-mobile-link" onClick={() => setMobileOpen(false)}>
                <div className="mh-mobile-link-icon">{link.icon}</div>
                <span>{link.label}</span>
                {link.label === "Wishlist" && (
                  <span style={{
                    marginLeft: "auto", fontSize: "0.7rem", fontWeight: 700,
                    background: "#ef4444", color: "#fff",
                    padding: "2px 7px", borderRadius: 20,
                  }}>New</span>
                )}
              </Link>
              {link.dropdown && (
                <div style={{ paddingLeft: 52, marginBottom: 8 }}>
                  {link.dropdown.map((sub) => (
                    <Link key={sub.label} href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block", padding: "7px 12px", borderRadius: 8,
                        fontSize: "0.82rem", color: "rgba(255,255,255,0.45)",
                        textDecoration: "none", transition: "color 0.2s",
                        fontFamily: "'Outfit',sans-serif",
                      }}
                    >
                      · {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/Sign-In" className="mh-btn-login" style={{ textAlign: "center" }} onClick={() => setMobileOpen(false)}>
            Login
          </Link>
          <Link href="/owner/add-property" className="mh-btn-add" style={{ justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
            <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Property
          </Link>
        </div>
      </div>
    </>
  );
}