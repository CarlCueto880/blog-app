import { useBlog } from "../context/BlogContext";

export default function SearchBar() {
  const { search, setSearch, categories, categoryFilter, setCategoryFilter } = useBlog();

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
      {/* Text search */}
      <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9ca3af",
            fontSize: 16,
          }}
        >
          ⌕
        </span>
        <input
          type="text"
          placeholder="Search posts, tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px 10px 38px",
            borderRadius: 10,
            border: "1.5px solid #e5e7eb",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            background: "#fff",
            transition: "border 0.15s",
          }}
        />
      </div>

      {/* Category filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1.5px solid #e5e7eb",
          fontSize: 14,
          background: "#fff",
          color: "#374151",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
