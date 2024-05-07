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
import LiveCollabHome from "./components/Pages/LiveCollabHome";
import LiveCollabEditorPage from "./components/Pages/LiveCollabEditorPage";
import TagsAdmin from "./components/Admin/Tags";
import Resource from "./components/Admin/Resource";
import Tutorial from "./components/Admin/Tutorial";
import EditTags from "./components/Admin/EditTags";
import AddTags from "./components/Admin/AddTags";
import { Toaster } from "react-hot-toast";
import Tutorials from "./components/Pages/Tutorials";
import ViewTutorial from "./components/Pages/ViewTutorial";
import LiveChat from "./components/Pages/LiveChat";
import Tags from "./components/Pages/Tags";
import ViewTag from "./components/Pages/ViewTag";
import CommunityForum from "./components/Pages/CommunityForum";
import CodeEditor from "./components/Pages/CodeEditor";

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

      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpwd" element={<ForgotPassword />} />
        <Route path="/admin/tags/edit/:id" element={<EditTags />} />
        <Route path="/admin/tags/add" element={<AddTags />} />
        <Route path="/LiveHome" element={<LiveCollabHome />} />
        <Route path="/LiveEditor/:roomId" element={<LiveCollabEditorPage />} />
        <Route path="/LiveChat" element={<LiveChat />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/viewTutorial" element={<ViewTutorial />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/viewTag/:id" element={<ViewTag />} />
        <Route path="/community" element={<CommunityForum />} />
        <Route path="/codeEditor" element={<CodeEditor />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="members" element={<Members />} />
          <Route path="tags/*" element={<TagsAdmin />}>
            <Route path="edit/:id" element={<EditTags />} />
            <Route path="add" element={<AddTags />} />
          </Route>
          <Route path="resource" element={<Resource />} />
          <Route path="tutorial" element={<Tutorial />} />

          {/* Other nested routes */}
        </Route>
        {/* Admin Panel */}
      </Routes>

      {/* Footer */}
      {["/login", "/register", "/forgotpwd"].includes(location.pathname) ||
      isUnderAdminPath("/") ? null : (
        <Footer />
      )}
    </div>
  );
}
