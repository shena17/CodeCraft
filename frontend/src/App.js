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
import Profile from "./components/Pages/Profile";
import UpdateAccount from "./components/Pages/UpdateAccount";
import ChangePassword from "./components/Pages/ChangePassword";
import Note from "./components/Pages/Note";
import MyList from "./components/Pages/MyList";
import Dashboard from "./components/Admin/Dashboard";
import Members from "./components/Admin/Members";
import LiveCollabHome from "./components/Pages/LiveCollabHome";
import LiveCollabEditorPage from "./components/Pages/LiveCollabEditorPage";
import EditTags from "./components/Admin/EditTags";
import AddTags from "./components/Admin/AddTags";
import { Toaster } from "react-hot-toast";
import Tutorials from "./components/Pages/Tutorials";
import ViewTutorial from "./components/Pages/ViewTutorial";
import LiveChat from "./components/Pages/LiveChat";
import Tags from "./components/Pages/Tags";
import ViewTag from "./components/Pages/ViewTag";
import CodeEditor from "./components/Pages/CodeEditor";
import AboutUs from "./components/Pages/AboutUs";
import UserDashboard from "./components/Pages/UserDashboard";
import Forums from "./components/Admin/Forums";
import AddForum from "./components/Admin/AddForum";
import EditForums from "./components/Admin/EditForums";
import AddResource from "./components/Admin/AddResource";
import EditResources from "./components/Admin/EditResources";
import AddTutorial from "./components/Admin/AddTutorial";
import EditTutorials from "./components/Admin/EditTutorials";
import Resource from "./components/Admin/Resource";
import Tutorial from "./components/Admin/Tutorial";
import Tag from "./components/Admin/Tag";
import Progress from "./components/Pages/Progress";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/note" element={<Note />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/updateAccount" element={<UpdateAccount />} />
        <Route path="/admin/tags/edit/:id" element={<EditTags />} />
        <Route path="/admin/tags/add" element={<AddTags />} />
        <Route path="/LiveHome" element={<LiveCollabHome />} />
        <Route path="/LiveEditor/:roomId" element={<LiveCollabEditorPage />} />
        <Route path="/LiveChat" element={<LiveChat />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/viewTutorial/:id" element={<ViewTutorial />} />
        <Route path="/userTags" element={<Tags />} />
        <Route path="/viewTag/:id" element={<ViewTag />} />
        <Route path="/codeEditor" element={<CodeEditor />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin/forums/add" element={<AddForum />} />
        <Route path="/admin/forums/edit/:id" element={<EditForums />} />
        <Route path="/admin/resources/add" element={<AddResource />} />
        <Route path="/admin/resources/edit/:id" element={<EditResources />} />
        <Route path="/admin/tutorials/add" element={<AddTutorial />} />
        <Route path="/admin/tutorials/edit/:id" element={<EditTutorials />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="forums" element={<Forums />} />
          <Route path="tags" element={<Tags />} />
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
