import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/apiConfig";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Optional: if you're using global context
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = btoa(`${email}:${password}`);

  //   // Just store token first
  //   localStorage.setItem("auth", token);

  //   // Test authentication with a simple protected endpoint
  //   const res = await fetch("/api/requests", {
  //     headers: {
  //       Authorization: `Basic ${token}`,
  //     },
  //   });

  //   if (res.status === 401) {
  //     localStorage.removeItem("auth");
  //     toast.error("Invalid credentials ❌");
  //     return;
  //   }

  //   login("USER");
  //   toast.success("Login successful! 🎉");

  //   setTimeout(() => {
  //     navigate("/user/dashboard");
  //   }, 1500);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = btoa(`${email}:${password}`);

    localStorage.setItem("auth", token);

    try {
      const res = await fetch(`${API_BASE_URL}/api/requests`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("auth");
        toast.error("Invalid credentials ❌");
        return;
      }

      login("USER");
      toast.success("Login successful! 🎉");

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1500);
    } catch (err) {
      toast.error("Server error ❌");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">User Login</h2>
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
