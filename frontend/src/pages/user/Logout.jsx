// src/pages/user/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth");
    toast.info("Logged out successfully 🚪", { autoClose: 2000 });
    navigate("/user/login");
  }, []);

  return null;
}
