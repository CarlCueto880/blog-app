import { CATEGORY_COLORS, CATEGORY_TEXT } from "../utils/helpers";

export default function Badge({ label }) {
  const bg    = CATEGORY_COLORS[label] || "#f3f4f6";
  const color = CATEGORY_TEXT[label]   || "#374151";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 500,
        background: bg,
        color,
        border: `1px solid ${color}22`,
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </span>
  );
}
