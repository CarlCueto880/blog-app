import { useState } from "react";
import { useBlog } from "../context/BlogContext";
import Badge from "../components/Badge";
import { btnStyle } from "../utils/helpers";

export default function PostPage() {
  const { selectedPost, navigateTo, deletePost, startEdit } = useBlog();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!selectedPost) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <p style={{ color: "#9ca3af" }}>Post not found.</p>
        <button onClick={() => navigateTo("home")} style={btnStyle("outline")}>
          ← Back to Home
        </button>
      </div>
    );
  }

  // ── Render markdown-like content ───────────────────────────────────────────
  const paragraphs = selectedPost.content.split("\n\n");

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Back link */}
      <button
        onClick={() => navigateTo("home")}
        style={{ ...btnStyle("ghost"), marginBottom: 24, padding: "6px 0" }}
      >
        ← All Posts
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Badge label={selectedPost.category} />
        <h1
          style={{
            margin: "16px 0 12px",
            fontSize: 36,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.2,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
          }}
        >
          {selectedPost.title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9ca3af", fontSize: 13 }}>
          <span style={{ fontWeight: 600, color: "#6b7280" }}>{selectedPost.author}</span>
          <span>·</span>
          <span>{selectedPost.date}</span>
          <span>·</span>
          <span>{selectedPost.readTime} min read</span>
        </div>
      </div>

      {/* Excerpt pull-quote */}
      <p
        style={{
          fontSize: 18,
          color: "#4b5563",
          lineHeight: 1.7,
          margin: "0 0 28px",
          fontStyle: "italic",
          borderLeft: "3px solid #818cf8",
          paddingLeft: 18,
        }}
      >
        {selectedPost.excerpt}
      </p>

      <hr style={{ border: "none", borderTop: "1.5px solid #f1f5f9", margin: "0 0 28px" }} />

      {/* Body — parse **bold** headings */}
      <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
        {paragraphs.map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return (
              <h3
                key={i}
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "24px 0 8px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {para.slice(2, -2)}
              </h3>
            );
          }

          const parts = para.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32 }}>
        {selectedPost.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              color: "#818cf8",
              background: "#eef2ff",
              padding: "4px 12px",
              borderRadius: 99,
              border: "1px solid #c7d2fe",
            }}
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 36,
          paddingTop: 24,
          borderTop: "1.5px solid #f1f5f9",
        }}
      >
        <button onClick={() => startEdit(selectedPost)} style={btnStyle("primary")}>
          ✎ Edit Post
        </button>

        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} style={btnStyle("danger")}>
            🗑 Delete
          </button>
        ) : (
          <>
            <button onClick={() => deletePost(selectedPost.id)} style={btnStyle("danger")}>
              Confirm Delete
            </button>
            <button onClick={() => setConfirmDelete(false)} style={btnStyle("outline")}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
