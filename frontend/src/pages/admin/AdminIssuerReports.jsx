// import { useEffect, useState } from "react";
// import { FiCheck, FiX, FiDownload } from "react-icons/fi";

// export default function AdminIssuerReports() {
//   const [requests, setRequests] = useState([]);
//   const [filter, setFilter] = useState("ALL");

//   /* ===== FETCH REQUESTS ===== */
//   const fetchRequests = async () => {
//     try {
//       const res = await fetch("/api/requests", {
//         headers: {
//           Authorization: `Basic ${localStorage.getItem("auth")}`,
//         },
//       });

//       if (!res.ok) throw new Error("Fetch failed");

//       const data = await res.json();
//       setRequests(data);
//     } catch (err) {
//       console.error(err);
//       setRequests([]);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   /* ===== UPDATE STATUS ===== */
//   const updateStatus = async (id, status) => {
//     await fetch(`/api/requests/${id}/status?status=${status}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Basic ${localStorage.getItem("auth")}`,
//       },
//     });
//     fetchRequests();
//   };

//   /* ===== DOWNLOAD FIR ===== */
//   const downloadFir = async (id) => {
//     try {
//       const res = await fetch(`/api/requests/${id}/fir-copy`, {
//         headers: {
//           Authorization: `Basic ${localStorage.getItem("auth")}`,
//         },
//       });

//       if (!res.ok) throw new Error("Download failed");

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `fir_request_${id}.pdf`;
//       a.click();

//       URL.revokeObjectURL(url);
//     } catch {
//       alert("❌ Failed to download FIR");
//     }
//   };

//   const filtered =
//     filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

//   return (
//     <div className="pt-24 px-6 min-h-screen bg-gray-50">
//       <h2 className="text-2xl font-bold mb-6">Issuer Reports</h2>

//       <select
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="border p-2 rounded mb-4"
//       >
//         <option value="ALL">All</option>
//         <option value="APPROVED">Approved</option>
//         <option value="REJECTED">Rejected</option>
//         <option value="PENDING">Pending</option>
//       </select>

//       <div className="bg-white rounded shadow overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">User</th>
//               <th className="border p-2">Type</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//               <th className="border p-2">FIR</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center p-6 text-gray-500">
//                   No document requests found
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((r) => (
//                 <tr key={r.id}>
//                   <td className="border p-2">{r.id}</td>
//                   <td className="border p-2">{r.user?.email}</td>
//                   <td className="border p-2">{r.documentType}</td>
//                   <td className="border p-2">{r.status}</td>

//                   <td className="border p-2 space-x-2">
//                     <button
//                       onClick={() => updateStatus(r.id, "APPROVED")}
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                     >
//                       <FiCheck />
//                     </button>
//                     <button
//                       onClick={() => updateStatus(r.id, "REJECTED")}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       <FiX />
//                     </button>
//                   </td>

//                   <td className="border p-2">
//                     {r.hasFirCopy ? (
//                       <button
//                         onClick={() => downloadFir(r.id)}
//                         className="text-blue-600 underline"
//                       >
//                         Download
//                       </button>
//                     ) : (
//                       <span className="text-gray-400">No FIR</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FiCheck, FiX, FiDownload, FiEye } from "react-icons/fi";
import ViewFormModal from "../../components/ViewFormModal";
import axios from "axios";

export default function AdminIssuerReports() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  /* ================= FETCH REQUESTS ================= */
  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests", {
        headers: {
          Authorization: `Basic ${localStorage.getItem("auth")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`/api/requests/${id}/status?status=${status}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${localStorage.getItem("auth")}`,
      },
    });
    fetchRequests();
  };

  /* ================= DOWNLOAD FIR ================= */
  // const downloadFir = (id) => {
  //   window.open(`/api/requests/${id}/fir-copy`, "_blank");
  // };

  // const viewForm = async (id) => {
  //   try {
  //     const res = await fetch(`/api/requests/${id}/full-form`, {
  //       headers: {
  //         Authorization: `Basic ${localStorage.getItem("auth")}`,
  //       },
  //     });

  //     if (!res.ok) throw new Error("Failed");

  //     const data = await res.json();
  //     setFormData(data);
  //     setShowModal(true);
  //   } catch {
  //     alert("❌ Failed to load form");
  //   }
  // };

  const openViewModal = async (id) => {
    try {
      const res = await axios.get(`/api/requests/admin/request/${id}`, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("auth")}`,
        },
      });

      console.log("FORM DATA:", res.data); // ✅ check console

      setSelectedData(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to load form:", error);
      alert("❌ Failed to load form details");
    }
  };

  /* ================= FILTER ================= */
  const filtered =
    filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

  // DOWNLAOD FIR (USING AXIOS TO HANDLE BLOB)
  const downloadFile = async (id, type) => {
    try {
      const auth = localStorage.getItem("auth");

      const response = await fetch(
        `http://localhost:8080/api/requests/${id}/${type}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      );

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert("❌ Download failed");
    }
  };


  /* ================= UI ================= */
  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">📄 Issuer Reports</h1>

      {/* FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-3 py-2 rounded mb-4"
      >
        <option value="ALL">All</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
        <option value="PENDING">Pending</option>
      </select>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Applicant</th>
              <th className="border p-3">Document Type</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">View</th>
              <th className="border p-3">FIR</th>
              <th className="border p-3">ID Proof</th>
              <th className="border p-3">Old Document</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No document requests found
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{r.id}</td>

                  {/* ✅ FIXED: use USERNAME */}
                  <td className="border p-2">{r.applicantName || "N/A"}</td>

                  <td className="border p-2">{r.documentType}</td>

                  {/* STATUS BADGE */}
                  <td className="border p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          r.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : r.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  {/* VIEW FORM (NEXT STEP) */}
                  <td className="border p-2">
                    <button
                      className="text-blue-600 underline flex items-center justify-center gap-1"
                      onClick={() => openViewModal(r.id)}
                    >
                      <FiEye /> View
                    </button>
                  </td>

                  {/* FIR DOWNLOAD */}
                  <td className="border p-2">
                    {r.hasFirCopy ? (
                      <button
                        onClick={() => downloadFile(r.id, "fir-copy")}
                        className="text-indigo-600 underline flex items-center justify-center gap-1"
                      >
                        <FiDownload /> Download
                      </button>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* ID PROOF */}
                  <td className="border p-2">
                    {r.idProof ? (
                      <button
                        onClick={() =>
                          downloadFile(r.id, "id-proof")
                        }
                        className="text-indigo-600 underline flex items-center justify-center gap-1"
                      >
                        <FiDownload /> Download
                      </button>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* OLD DOCUMENT */}
                  <td className="border p-2">
                    {r.oldDocumentImage ? (
                      <button
                        onClick={() =>
                          downloadFile(r.id, "old-document")
                        }
                        className="text-indigo-600 underline flex items-center justify-center gap-1"
                      >
                        <FiDownload /> Download
                      </button>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* APPROVE / REJECT */}
                  <td className="border p-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(r.id, "UNDER_VERIFICATION")}
                    >
                      Under Verification
                    </button>

                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(r.id, "APPROVED")}
                    >
                      Approve
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(r.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW FORM MODAL */}
      <ViewFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        data={selectedData}
      />
    </div>
  );
}
