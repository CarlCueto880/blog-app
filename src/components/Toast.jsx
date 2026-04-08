import { useBlog } from "../context/BlogContext";

const STYLES = {
  success: { bg: "#f0fdf4", border: "#86efac", color: "#166534" },
  danger:  { bg: "#fff1f2", border: "#fca5a5", color: "#9f1239" },
};

export default function Toast() {
  const { toast } = useBlog();
  if (!toast) return null;

  const c = STYLES[toast.type] || STYLES.success;
  const icon = toast.type === "success" ? "✓" : "✕";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        padding: "12px 20px",
        borderRadius: 10,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        fontSize: 14,
        fontWeight: 500,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        zIndex: 9999,
        animation: "slideUp 0.2s ease",
      }}
    >
      {icon} {toast.msg}
    </div>
  );
}
