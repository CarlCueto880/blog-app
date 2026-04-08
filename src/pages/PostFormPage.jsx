import { useState } from "react";
import { useBlog } from "../context/BlogContext";
import { btnStyle, inputStyle } from "../utils/helpers";

const CATEGORIES = ["React", "JavaScript", "CSS", "TypeScript", "General"];

export default function PostFormPage({ mode }) {
  const { addPost, updatePost, editingPost, navigateTo } = useBlog();
  const isEdit = mode === "edit";

  // ── Form state — pre-fill when editing ────────────────────────────────────
  const [form, setForm] = useState({
    title:    isEdit && editingPost ? editingPost.title              : "",
    category: isEdit && editingPost ? editingPost.category           : "React",
    author:   isEdit && editingPost ? editingPost.author             : "",
    excerpt:  isEdit && editingPost ? editingPost.excerpt            : "",
    content:  isEdit && editingPost ? editingPost.content            : "",
    tags:     isEdit && editingPost ? editingPost.tags.join(", ")    : "",
  });

  const [errors, setErrors] = useState({});

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())   e.title   = "Title is required.";
    if (!form.author.trim())  e.author  = "Author is required.";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required.";
    if (!form.content.trim()) e.content = "Content is required.";
    return e;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const data = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    };

    if (isEdit) {
      updatePost(editingPost.id, data);
      navigateTo("post", editingPost.id);
    } else {
      addPost(data);
    }
  };

  // ── Field renderer ────────────────────────────────────────────────────────
  const field = (key, label, type = "input", placeholder = "") => (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          marginBottom: 6,
        }}
      >
        {label}
      </label>

      {type === "textarea" && (
        <textarea
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          rows={key === "content" ? 12 : 3}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: key === "content" ? 240 : 80,
          }}
        />
      )}

      {type === "select" && (
        <select
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          style={inputStyle}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      )}

      {type === "input" && (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}

      {errors[key] && (
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#dc2626" }}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  const backView  = isEdit ? "post" : "home";
  const backPostId = isEdit ? editingPost?.id : null;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Back link */}
      <button
        onClick={() => navigateTo(backView, backPostId)}
        style={{ ...btnStyle("ghost"), marginBottom: 24, padding: "6px 0" }}
      >
        ← {isEdit ? "Back to Post" : "Back to Home"}
      </button>

      <h1
        style={{
          margin: "0 0 32px",
          fontSize: 28,
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "Georgia, serif",
        }}
      >
        {isEdit ? "Edit Post" : "Write a New Post"}
      </h1>

      <div
        style={{
          background: "#fff",
          border: "1.5px solid #f1f5f9",
          borderRadius: 14,
          padding: "32px",
        }}
      >
        {field("title", "Post Title", "input", "e.g. Understanding React Hooks")}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>{field("category", "Category", "select")}</div>
          <div>{field("author",   "Author Name", "input", "Your name")}</div>
        </div>

        {field("excerpt", "Excerpt",  "textarea", "A short summary shown on the post card...")}
        {field("content", "Content",  "textarea", "Write your full post here. Wrap headings in **like this**...")}
        {field("tags",    "Tags",     "input",    "react, hooks, javascript (comma-separated)")}

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={handleSubmit} style={btnStyle("primary")}>
            {isEdit ? "Update Post" : "Publish Post"}
          </button>
          <button onClick={() => navigateTo(backView, backPostId)} style={btnStyle("outline")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
