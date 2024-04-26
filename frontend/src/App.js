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
import LiveCollabHome from "./components/Pages/LiveCollabHome";
import LiveCollabEditorPage from "./components/Pages/LiveCollabEditorPage";
import Tags from "./components/Admin/Tags";
import Resource from "./components/Admin/Resource";
import Tutorial from "./components/Admin/Tutorial";
import EditTags from "./components/Admin/EditTags";
import AddTags from "./components/Admin/AddTags";
import Forums from "./components/Admin/Forums";
import AddForum from "./components/Admin/AddForum";
import EditForums from "./components/Admin/EditForums";
import AddResource from "./components/Admin/AddResource";
import EditResources from "./components/Admin/EditResources";
import AddTutorial from "./components/Admin/AddTutorial";
import EditTutorials from "./components/Admin/EditTutorials";

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
        <Route path="/LiveHome" element={<LiveCollabHome/>} />
        <Route path="/LiveEditor/:roomId" element={<LiveCollabEditorPage/>} />
        <Route path="/admin/tags/edit/:id" element={<EditTags/>}/>
        <Route path="/admin/tags/add" element={<AddTags/>}/>
        <Route path="/admin/forums/add" element={<AddForum/>}/>
        <Route path="/admin/forums/edit/:id" element={<EditForums/>}/>
        <Route path="/admin/resources/add" element={<AddResource/>}/>
        <Route path="/admin/resources/edit/:id" element={<EditResources/>}/>
        <Route path="/admin/tutorials/add" element={<AddTutorial/>}/>
        <Route path="/admin/tutorials/edit/:id" element={<EditTutorials/>}/>








        {/* Admin Panel */}
        <Route path="/admin/*" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="forums" element={<Forums />} />
          <Route path="tags" element={<Tags />}/>
          <Route path="resources" element={<Resource />} />
          <Route path="tutorials" element={<Tutorial />} />


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
