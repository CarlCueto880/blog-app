import { useBlog } from "../context/BlogContext";
import HomePage     from "../pages/HomePage";
import PostPage     from "../pages/PostPage";
import PostFormPage from "../pages/PostFormPage";

export default function Router() {
  const { currentView } = useBlog();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        background: "#f8fafc",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {currentView === "home" && <HomePage />}
        {currentView === "post" && <PostPage />}
        {currentView === "new"  && <PostFormPage mode="new" />}
        {currentView === "edit" && <PostFormPage mode="edit" />}
      </div>
    </div>
  );
}
