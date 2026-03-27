import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface PropertyHeadingProps {
  title?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  onEdit?: () => void;
}

// ── Edit Icon (inline SVG) ───────────────────────────────────────────────────
const EditIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ── Building / Property Logo Icon ───────────────────────────────────────────
const PropertyLogo = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-indigo-600"
    aria-hidden="true"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// ── Edit Button ──────────────────────────────────────────────────────────────
const EditButton = ({ onClick }: { onClick?: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium",
        "transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        hovered
          ? "border-indigo-400 bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100"
          : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300",
      ].join(" ")}
    >
      <EditIcon />
      Edit property
    </button>
  );
};

// ── User Avatar ──────────────────────────────────────────────────────────────
const UserAvatar = ({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) => (
  <div className="flex items-center gap-2.5">
    {/* Avatar circle */}
    <div
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
        "bg-gradient-to-br from-indigo-500 to-violet-500",
        "text-white text-xs font-bold tracking-wide",
        "shadow-md shadow-indigo-200",
      ].join(" ")}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>

    {/* Name + Role */}
    <div className="flex flex-col leading-tight">
      <span className="text-[13px] font-semibold text-slate-800 whitespace-nowrap">
        {name}
      </span>
      <span className="text-[11px] text-slate-400 whitespace-nowrap">
        {role}
      </span>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
export default function PropertyHeading({
  title = "Property Details",
  userName = "Imarat User",
  userRole = "Product Owner",
  userInitials = "AK",
  onEdit,
}: PropertyHeadingProps) {
  return (
    <div
      className={[
        "flex items-center justify-between",
        "px-5 py-3.5",
        "bg-white border border-slate-100 rounded-xl",
        "shadow-sm shadow-slate-100",
        "w-full max-w-3xl mx-auto",
        "gap-4",
      ].join(" ")}
    >
      {/* ── Left: Logo + Title + Edit ── */}
      <div className="flex items-center gap-3">
        {/* Logo badge */}
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 shrink-0">
          <PropertyLogo />
        </div>

        {/* Title */}
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight whitespace-nowrap m-0">
          {title}
        </h2>

        {/* Divider */}
        <span className="h-4 w-px bg-slate-200" aria-hidden="true" />

        {/* Edit Button */}
        <EditButton onClick={onEdit} />
      </div>

      {/* ── Right: User Avatar ── */}
      <UserAvatar initials={userInitials} name={userName} role={userRole} />
    </div>
  );
}