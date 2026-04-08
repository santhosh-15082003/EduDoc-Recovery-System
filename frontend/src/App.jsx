// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import PersonalDetails from "./pages/user/PersonalDetails";
import DocumentApply from "./pages/user/DocumentApply";
import CreateRequest from "./pages/user/CreateRequest";
import UserRequests from "./pages/user/UserRequests";
import MissingReport from "./pages/user/MissingReport";

import AdminPersonalDetails from "./pages/admin/AdminPersonalDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import UpdateStatus from "./pages/admin/UpdateStatus";
import ViewRequest from "./pages/admin/ViewRequest";
import AdminHome from "./pages/admin/AdminHome";
import AdminIssuerReports from "./pages/admin/AdminIssuerReports";
import MissingReports from "./pages/admin/MissingReports";

import TrackStatus from "./pages/TrackStatus";

import Logout from "./pages/common/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/create-request" element={<CreateRequest />} />
        <Route path="/user/document-apply" element={<DocumentApply />} />
        <Route path="/user/personal-details" element={<PersonalDetails />} />
        <Route path="/user/requests" element={<UserRequests />} />
        <Route path="/user/missing-report" element={<MissingReport />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/personal-details"
          element={<AdminPersonalDetails />}
        />
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/admin/issuer-reports" element={<AdminIssuerReports />} />
        <Route path="/admin/missing-reports" element={<MissingReports />} />
        <Route path="/admin/update-status" element={<UpdateStatus />} />
        <Route path="/admin/request/:id" element={<ViewRequest />} />

        <Route path="/track" element={<TrackStatus />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
