import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "USER" }), // Send role as USER
    });

    if (res.ok) {
      toast.success("Registered successfully ✅", { autoClose: 2000 });
      setTimeout(() => navigate("/user/login"), 1500);
    } else {
      toast.error("Registration failed ❌", { autoClose: 2000 });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
