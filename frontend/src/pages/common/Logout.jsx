// src/pages/common/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth"); // Clear stored credentials
    toast.success("Logged out successfully 👋", { autoClose: 2000 });
    navigate("/"); // Redirect to Home
  }, [navigate]);

  return null; // No visual UI
}
