import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 text-white">
      <div className="w-full px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          DocHub
        </h1>

        {/* CENTER TITLE */}
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>

        {/* PROFILE */}
        <button
          onClick={() => navigate("/admin/personal-details")}
          className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
        >
          <FiUser />
        </button>
      </div>
    </nav>
  );
}
