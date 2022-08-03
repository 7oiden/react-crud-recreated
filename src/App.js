import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import HomePage from "./components/home/HomePage";
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PostPage from "./components/dashboard/posts/PostPage";
import AddPost from "./components/dashboard/posts/AddPost";
import EditPost from "./components/dashboard/posts/EditPost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/dashboard/posts" element={<PostPage />}></Route>
            <Route path="/dashboard/posts/add" element={<AddPost />}></Route>
            <Route
              path="/dashboard/posts/edit/:id"
              element={<EditPost />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
