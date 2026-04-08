import { BlogProvider } from "./context/BlogContext";
import Navbar  from "./components/Navbar";
import Router  from "./components/Router";
import Toast   from "./components/Toast";
import "./styles/global.css";

export default function App() {
  return (
    <BlogProvider>
      <Navbar />
      <Router />
      <Toast />
    </BlogProvider>
  );
}
