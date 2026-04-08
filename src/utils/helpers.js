// ─── Button style helper ──────────────────────────────────────────────────────
export function btnStyle(type) {
  const base = {
    border: "none",
    borderRadius: 9,
    padding: "9px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s, background 0.15s",
  };
  if (type === "primary") return { ...base, background: "#818cf8", color: "#fff" };
  if (type === "danger")  return { ...base, background: "#fee2e2", color: "#dc2626", border: "1.5px solid #fca5a5" };
  if (type === "outline") return { ...base, background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb" };
  if (type === "ghost")   return { ...base, background: "none", color: "#6b7280", padding: "6px 4px", fontWeight: 500 };
  return base;
}

// ─── Input style object ───────────────────────────────────────────────────────
export const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1.5px solid #e5e7eb",
  fontSize: 14,
  color: "#0f172a",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border 0.15s",
};

// ─── Category color maps ──────────────────────────────────────────────────────
export const CATEGORY_COLORS = {
  React:      "#e8f4fd",
  CSS:        "#f0fdf4",
  JavaScript: "#fffbeb",
  TypeScript: "#faf5ff",
  General:    "#fff1f2",
};

export const CATEGORY_TEXT = {
  React:      "#0369a1",
  CSS:        "#166534",
  JavaScript: "#92400e",
  TypeScript: "#6b21a8",
  General:    "#9f1239",
};

// ─── Read-time calculator ─────────────────────────────────────────────────────
export function calcReadTime(content) {
  return Math.ceil(content.split(" ").length / 200);
}
