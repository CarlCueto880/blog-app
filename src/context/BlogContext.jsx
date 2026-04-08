import { createContext, useContext, useState, useEffect, useCallback } from "react";
import INITIAL_POSTS from "../data/posts";
import { calcReadTime } from "../utils/helpers";

// ─── Create context ───────────────────────────────────────────────────────────
const BlogContext = createContext(null);

// ─── Custom hook ─────────────────────────────────────────────────────────────
export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used inside <BlogProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function BlogProvider({ children }) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("blog_posts");
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [search, setSearch]               = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentView, setCurrentView]     = useState("home");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editingPost, setEditingPost]     = useState(null);
  const [toast, setToast]                 = useState(null);

  // ── Persist to localStorage ────────────────────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem("blog_posts", JSON.stringify(posts));
    } catch {}
  }, [posts]);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Derived values ────────────────────────────────────────────────────────
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedPost = posts.find((p) => p.id === selectedPostId) || null;

  // ── CRUD actions ──────────────────────────────────────────────────────────
  const addPost = (data) => {
    const newPost = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      readTime: calcReadTime(data.content),
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast("Post published!");
    setCurrentView("home");
  };

  const updatePost = (id, data) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...data, readTime: calcReadTime(data.content) } : p
      )
    );
    showToast("Post updated!");
    setCurrentView("post");
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast("Post deleted.", "danger");
    setCurrentView("home");
    setSelectedPostId(null);
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigateTo = (view, postId = null) => {
    setCurrentView(view);
    if (postId !== null) setSelectedPostId(postId);
    if (view !== "edit") setEditingPost(null);
    window.scrollTo(0, 0);
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setCurrentView("edit");
  };

  // ── Context value ─────────────────────────────────────────────────────────
  return (
    <BlogContext.Provider
      value={{
        posts,
        filteredPosts,
        search,        setSearch,
        categoryFilter, setCategoryFilter,
        categories,
        currentView,
        navigateTo,
        selectedPost,
        selectedPostId,
        editingPost,
        startEdit,
        addPost,
        updatePost,
        deletePost,
        toast,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
