import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Dashboard from "./components/Admin/Dashboard";
import Members from "./components/Admin/Members";
import Fees from "./components/Admin/Fees";
import Attendance from "./components/Admin/Attendance";
import AdminHome from "./components/Admin/Home";
import LiveCollabHome from "./components/Pages/LiveCollabHome";
import LiveCollabEditorPage from "./components/Pages/LiveCollabEditorPage";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Function to check if the current path is under admin
  const isUnderAdminPath = (path) =>
    location.pathname.startsWith(`/admin${path}`);

  return (
    <div className="App">
      {/* Header */}
      {["/login", "/register", "/forgotpwd"].includes(location.pathname) ||
      isUnderAdminPath("/") ? null : (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpwd" element={<ForgotPassword />} />
        <Route path="/admin/*" element={<Dashboard />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="members" element={<Members />} />
          <Route path="fees" element={<Fees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="/LiveHome" element={<LiveCollabHome/>} />
          <Route path="/LiveEditor/:roomId" element={<LiveCollabEditorPage/>} />
          {/* Other nested routes */}
        </Route>
      </Routes>

      {/* Footer */}
      {["/login", "/register", "/forgotpwd"].includes(location.pathname) ||
      isUnderAdminPath("/") ? null : (
        <Footer />
      )}
    </div>
  );
}
