import { useBlog } from "../context/BlogContext";

export default function Navbar() {
  const { navigateTo, currentView } = useBlog();

  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigateTo("home")}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#f8fafc",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
          }}
        >
          ink<span style={{ color: "#818cf8" }}>.</span>
        </span>
        <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>blog</span>
      </button>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <NavLink label="Home" view="home" current={currentView} navigate={navigateTo} />
        <button
          onClick={() => navigateTo("new")}
          style={{
            background: "#818cf8",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            padding: "7px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          + New Post
        </button>
      </div>
    </nav>
  );
}

function NavLink({ label, view, current, navigate }) {
  const active = current === view;
  return (
    <button
      onClick={() => navigate(view)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: active ? "#f8fafc" : "#94a3b8",
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        padding: "6px 12px",
        borderRadius: 6,
        transition: "color 0.15s",
      }}
    >
      {label}
    </button>
  );
}
