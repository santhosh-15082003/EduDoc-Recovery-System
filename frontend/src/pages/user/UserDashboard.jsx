// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiPlus, FiUser } from "react-icons/fi";

// export default function UserDashboard() {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("/api/requests", {
//       headers: { Authorization: `Basic ${localStorage.getItem("auth")}` },
//     })
//       .then((res) => res.json())
//       .then(setRequests);
//   }, []);

//   // const handleLogout = () => {
//   //   localStorage.clear();
//   //   navigate("/login");
//   // };

//   return (
//     <div className="pt-24 px-6 min-h-screen bg-gray-50 relative">
//       {/* WELCOME SECTION */}
//       <section className="bg-slate-400  ">
//         <div className="mb-10 text-center">
//           <h2 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h2>
//           <p className="text-gray-600">
//             Track and manage your document requests below
//           </p>
//         </div>
//       </section>

//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">All Document Requests</h2>
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/user/create-request"
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//           >
//             <FiPlus className="inline mr-2" />
//             Create New Request
//           </Link>

//           {/* Profile Icon */}
//           <button
//             onClick={() => navigate("/user/personal-details")}
//             className="bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
//             title="Personal Details"
//           >
//             <FiUser className="text-xl text-gray-700" />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable container */}
//       <div className="max-h-[60vh] overflow-y-auto rounded border bg-white shadow p-4 space-y-3">
//         {requests.length === 0 ? (
//           <p className="text-gray-500">No requests found.</p>
//         ) : (
//           requests.map((r) => (
//             <div
//               key={r.id}
//               className="p-3 border rounded hover:bg-gray-100 transition"
//             >
//               <strong>{r.documentType}</strong> - {r.status}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Logout Button (Bottom Right Corner)
//       <button
//         onClick={handleLogout}
//         className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
//       >
//         User Logout
//       </button> */}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import DocumentApplyModal from "./DocumentApply";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/navbars/UserNavbar";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    if (showRequests) {
      fetch("/api/requests/user", {
        headers: {
          Authorization: `Basic ${localStorage.getItem("auth")}`,
        },
      })
        .then((res) => res.json())
        .then(setRequests);
    }
  }, [showRequests]);

  return (
    <>
      <UserNavbar />

      <div className="pt-24 min-h-screen bg-gray-50 flex justify-center px-6">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Document Recovery Hub
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Apply for government documents, recover lost certificates, and track
            request status securely through this portal.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <button
              onClick={() => setShowApply(true)}
              className="flex-1 min-w-[200px] bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow"
            >
              📄 Document Applying
            </button>

            {/* <button
            onClick={() => alert("Document Missing feature coming soon")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl shadow"
            >
            ❓ Document Missing
            </button> */}

            <button
              onClick={() => navigate("/user/missing-report")}
              className="flex-1 min-w-[200px] bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl shadow"
            >
              Document Missing
            </button>

            {/* ✅ NEW TRACK BUTTON */}
            <button
              onClick={() => navigate("/track")}
              className="flex-1 min-w-[200px] bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl shadow"
            >
              🔍 Track Missing Report
            </button>

            <button
              onClick={() => setShowRequests(true)}
              className="flex-1 min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl shadow"
            >
              📂 Your Requests
            </button>
          </div>
        </div>

        {/* DOCUMENT APPLY MODAL */}
        {showApply && (
          <DocumentApplyModal onClose={() => setShowApply(false)} />
        )}

        {/* FLOATING REQUEST MODAL */}
        {showRequests && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
              <button
                onClick={() => setShowRequests(false)}
                className="absolute top-3 right-4 text-xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">
                Your Document Requests
              </h2>

              <div className="max-h-[60vh] overflow-y-auto border rounded p-4 space-y-3">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No document requests found.
                  </p>
                ) : (
                  requests.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 border rounded hover:bg-gray-100"
                    >
                      <strong>{r.documentType}</strong> —{" "}
                      <span
                        className={
                          r.status === "APPROVED"
                            ? "text-green-600"
                            : r.status === "REJECTED"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }
                      >
                        {r.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
