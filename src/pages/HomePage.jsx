import { useBlog } from "../context/BlogContext";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const { filteredPosts, posts } = useBlog();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1
          style={{
            margin: "0 0 6px",
            fontSize: 32,
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
          }}
        >
          The Blog
        </h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 15 }}>
          {posts.length} {posts.length === 1 ? "article" : "articles"} on React, CSS, JavaScript and more.
        </p>
      </div>

      {/* Search + Filter */}
      <SearchBar />

      {/* Post grid or empty state */}
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p style={{ margin: 0, fontSize: 16 }}>No posts match your search.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
