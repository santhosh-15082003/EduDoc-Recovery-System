import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../utils/axios"; // ✅ ADDED

export default function PersonalDetails() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    mailId: "",
    contactNo: "",
  });

  // ✅ FIXED: Use axios instead of fetch
  useEffect(() => {
    api
      .get("/api/user/details")
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ FIXED
  const handleSave = () => {
    api
      .post("/api/user/details", formData)
      .then(() => alert("Details saved successfully!"))
      .catch((err) => console.error(err));
  };

  // ✅ FIXED
  const handleUpdate = () => {
    api
      .put("/api/user/details", formData)
      .then(() => alert("Details updated successfully!"))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.clear(); // 🔥 correct
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Personal Details
        </h2>

        <div className="space-y-4">
          {["name", "age", "gender", "address", "mailId", "contactNo"].map(
            (field) => (
              <div key={field}>
                <label className="block text-gray-700 capitalize mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ),
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={() => navigate("/user/dashboard")}
            className="text-blue-600 hover:underline"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
