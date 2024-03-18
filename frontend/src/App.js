import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <div className="App">
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/forgotpwd" &&
        window.location.pathname !== "/admin" && <Header />}

      <Router>
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
            {/* Other nested routes */}
          </Route>
        </Routes>
      </Router>

      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/forgotpwd" &&
        window.location.pathname !== "/admin" && <Footer />}
    </div>
  );
}
