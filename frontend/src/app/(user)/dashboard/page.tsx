"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const mockListings = [
  {
    id: 1,
    title: "Luxury Villa, Noida Sector 50",
    type: "Villa",
    price: "₹2.4 Cr",
    status: "Active",
    views: 312,
    inquiries: 18,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80",
    beds: 4, baths: 3, area: "3200 sqft",
  },
  {
    id: 2,
    title: "Modern Apartment, Gurgaon",
    type: "Apartment",
    price: "₹85 L",
    status: "Active",
    views: 198,
    inquiries: 9,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
    beds: 3, baths: 2, area: "1450 sqft",
  },
  {
    id: 3,
    title: "Studio Flat, Connaught Place",
    type: "Studio",
    price: "₹45 L",
    status: "Sold",
    views: 540,
    inquiries: 34,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
    beds: 1, baths: 1, area: "620 sqft",
  },
];

const stats = [
  { label: "Active Listings", value: "2",       icon: "🏠", delta: "+1 this month" },
  { label: "Total Views",     value: "1,050",   icon: "👁️", delta: "+12% this week" },
  { label: "Inquiries",       value: "61",      icon: "💬", delta: "+5 new today" },
  { label: "Revenue",         value: "₹3.25 Cr",icon: "💰", delta: "Lifetime" },
];

const navItems = [
  { id: "listings",   icon: "🏠", label: "My Listings" },
  { id: "analytics",  icon: "📊", label: "Analytics" },
  { id: "messages",   icon: "💬", label: "Messages", badge: 3 },
  { id: "favorites",  icon: "♥",  label: "Saved" },
  { id: "settings",   icon: "⚙",  label: "Settings" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/sign-in"); return; }
    (async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0d12] gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-800 border-t-amber-500 animate-spin" />
        <p className="text-sm text-zinc-500 tracking-wide">Loading your dashboard…</p>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="flex min-h-screen  text-zinc-200 font-sans">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-30 h-screen w-60
        flex flex-col bg-[#0f1117] border-r border-white/[0.06]
        px-3 py-7 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
       
        <div className="flex items-center gap-2 px-3 mb-9">
          <span className="text-amber-500 text-xl">⬡</span>
          <span className="text-lg font-semibold tracking-wide text-zinc-100 font-serif">NestIQ</span>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                w-full text-left transition-all duration-150
                ${activeTab === item.id
                  ? "bg-white/[0.07] text-amber-400"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                }
              `}
            >
              {activeTab === item.id && (
                <span className="absolute left-0 top-[25%] bottom-[25%] w-[3px] bg-amber-500 rounded-r-full" />
              )}
              <span className="w-5 text-center text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-amber-500 text-[#0b0d12] text-[10px] font-bold rounded-full px-1.5 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl px-3 py-3 mt-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-[#0b0d12] font-bold text-sm flex-shrink-0">
            {user?.username?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-100 truncate">{user?.username}</p>
            <p className="text-[11px] text-zinc-500 capitalize">{user?.role ?? "Member"}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-zinc-500 hover:text-red-400 text-lg px-1 transition-colors"
          >
            ⇥
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-5 py-7 lg:px-10 overflow-y-auto">

        <header className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <button
              className="lg:hidden mt-1 text-zinc-400 hover:text-amber-400 text-xl transition-colors"
              onClick={() => setSidebarOpen(true)}
            >☰</button>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100 mb-1 font-serif">
                Good morning, {user?.username} 👋
              </h1>
              <p className="text-xs text-zinc-500">{user?.email} · {today}</p>
            </div>
          </div>
          <button className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 hover:-translate-y-0.5 text-[#0b0d12] text-sm font-bold rounded-xl transition-all duration-150 shadow-lg shadow-amber-900/20">
            + Add Listing
          </button>
        </header>

       
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0f1117] border border-white/[0.06] rounded-2xl p-5 flex items-start gap-3 hover:border-amber-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <span className="text-2xl mt-0.5">{s.icon}</span>
              <div>
                <p className="text-xl font-semibold text-zinc-100 leading-none mb-1 font-serif">{s.value}</p>
                <p className="text-[11px] text-zinc-500 mb-1">{s.label}</p>
                <p className="text-[10px] text-emerald-400 font-medium">{s.delta}</p>
              </div>
            </div>
          ))}
        </section>

      
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-zinc-100 font-serif">Your Properties</h2>
          <div className="flex gap-2 flex-wrap">
            {["All", "Active", "Sold", "Rented"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
                  ${activeFilter === f
                    ? "bg-amber-500 border-amber-500 text-[#0b0d12] font-bold"
                    : "border-white/10 text-zinc-500 hover:border-amber-500/50 hover:text-amber-400"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

    
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {mockListings.map((l) => (
            <div
              key={l.id}
              className="bg-[#0f1117] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-amber-500/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-200"
            >
             
              <div className="relative h-44 overflow-hidden">
                <img
                  src={l.img}
                  alt={l.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                  ${l.status === "Sold"
                    ? "bg-red-950/80 text-red-400 border-red-800/50"
                    : "bg-emerald-950/80 text-emerald-400 border-emerald-800/50"
                  }`}
                >
                  {l.status}
                </span>

                <button className="absolute top-2.5 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-zinc-400 hover:text-red-400 flex items-center justify-center text-sm transition-all duration-150">
                  ♥
                </button>
              </div>

            
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1">{l.type}</p>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1 leading-snug">{l.title}</h3>
                <p className="text-lg font-semibold text-amber-400 mb-3 font-serif">{l.price}</p>

                <div className="flex gap-3 text-[11px] text-zinc-500 mb-3 pb-3 border-b border-white/[0.05]">
                  <span>🛏 {l.beds} Beds</span>
                  <span>🚿 {l.baths} Bath</span>
                  <span>📐 {l.area}</span>
                </div>

                <div className="flex gap-4 text-[11px] text-zinc-500 mb-4">
                  <span>👁 {l.views} views</span>
                  <span>💬 {l.inquiries} inquiries</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-white/10 text-xs font-medium text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-150">
                    Edit
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 text-[#0b0d12] text-xs font-bold transition-all duration-150">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-[#0f1117] border border-dashed border-white/10 rounded-2xl min-h-72 flex items-center justify-center cursor-pointer group hover:border-amber-500/40 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-200">
            <div className="flex flex-col items-center gap-2 text-zinc-600 group-hover:text-amber-500 transition-colors duration-150">
              <span className="text-4xl leading-none">+</span>
              <p className="text-sm font-medium">Add New Listing</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}