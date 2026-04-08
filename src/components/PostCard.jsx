import { useBlog } from "../context/BlogContext";
import Badge from "./Badge";

export default function PostCard({ post }) {
  const { navigateTo } = useBlog();

  return (
    <div
      onClick={() => navigateTo("post", post.id)}
      style={{
        background: "#fff",
        border: "1.5px solid #f1f5f9",
        borderRadius: 14,
        padding: "24px 28px",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.07)";
        e.currentTarget.style.borderColor = "#e0e7ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#f1f5f9";
      }}
    >
      {/* Top row: badge + read time */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Badge label={post.category} />
        <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.readTime} min read</span>
      </div>

      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.35,
          fontFamily: "Georgia, serif",
        }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
        {post.excerpt}
      </p>

      {/* Bottom row: tags + author/date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {post.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                color: "#94a3b8",
                background: "#f8fafc",
                padding: "2px 8px",
                borderRadius: 99,
                border: "1px solid #e5e7eb",
              }}
            >
              #{t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          {post.author} · {post.date}
        </div>
      </div>
    </div>
  );
}
