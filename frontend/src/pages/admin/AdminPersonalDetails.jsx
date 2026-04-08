import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react"; // ✅ Icon from lucide-react (used in dashboard)

export default function AdminPersonalDetails() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    mailId: "",
    contactNo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing admin details
    fetch("/api/admin/details", {
      headers: { Authorization: `Basic ${localStorage.getItem("auth")}` },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("/api/admin/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("auth")}`,
      },
      body: JSON.stringify(formData),
    }).then(() => alert("Details saved successfully!"));
  };

  const handleUpdate = () => {
    fetch("/api/admin/details", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("auth")}`,
      },
      body: JSON.stringify(formData),
    }).then(() => alert("Details updated successfully!"));
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    // localStorage.removeItem("role");
    alert("Admin logged out successfully!");
    navigate("/");
  };

  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center">
    //   {/* ✅ Top Bar with Logo + Title */}
    //   <div className="w-full bg-blue-600 p-4 flex justify-between items-center text-white">
    //     <h1
    //       className="text-xl font-bold cursor-pointer"
    //       onClick={() => navigate("/admin/dashboard")}
    //     >
    //       DocHub Admin
    //     </h1>
    //     <button
    //       onClick={() => navigate("/admin/personal-details")}
    //       className="hover:opacity-90"
    //       title="Admin Personal Details"
    //     >
    //       <UserCircle size={36} className="text-white" />
    //     </button>
    //   </div>

    //   {/* ✅ Main Form */}
    //   <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-8">
    //     <h2 className="text-2xl font-bold text-center mb-6">
    //       Admin Personal Details
    //     </h2>

    //     <div className="space-y-4">
    //       {["name", "age", "gender", "address", "mailId", "contactNo"].map(
    //         (field) => (
    //           <div key={field}>
    //             <label className="block text-gray-700 capitalize mb-1">
    //               {field}
    //             </label>
    //             <input
    //               type="text"
    //               name={field}
    //               value={formData[field]}
    //               onChange={handleChange}
    //               className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
    //             />
    //           </div>
    //         )
    //       )}
    //     </div>

    //     <div className="flex justify-between mt-6">
    //       <button
    //         onClick={handleSave}
    //         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    //       >
    //         Save
    //       </button>
    //       <button
    //         onClick={handleUpdate}
    //         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
    //       >
    //         Update
    //       </button>
    //     </div>

    //     <div className="flex flex-col items-center gap-3 mt-8">
    //       <button
    //         onClick={() => navigate("/admin/dashboard")}
    //         className="text-blue-600 hover:underline"
    //       >
    //         Back to Dashboard
    //       </button>

    //       {/* ✅ Logout button (only here) */}
    //       <button
    //         onClick={handleLogout}
    //         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <UserCircle size={64} className="text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Admin Personal Details</h2>
        </div>

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
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                />
              </div>
            )
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-6 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
