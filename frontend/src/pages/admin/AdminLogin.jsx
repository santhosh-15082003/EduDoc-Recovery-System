import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = btoa(`${email}:${password}`);

    localStorage.setItem("auth", token);

    const res = await fetch("/api/requests", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("auth");
      toast.error("Invalid admin credentials ❌");
      return;
    }

    toast.success("Admin login successful ✅");

    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1500);
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
