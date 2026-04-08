console.log("ADMIN ISSUER REPORTS PAGE LOADED");

import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function AdminRequestList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests for admin
  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/v2/document-requests/admin");
      setList(res.data);
    } catch (err) {
      console.error("Failed to fetch admin requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status (APPROVED / REJECTED)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/v2/document-requests/${id}/status?status=${status}`,
      );
      fetchRequests();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading requests...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Issuer Reports – Document Requests
      </h2>

      {list.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No document requests found
        </p>
      ) : (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Applicant</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="border p-2">{r.id}</td>
                <td className="border p-2">{r.applicantName}</td>
                <td className="border p-2">{r.documentType}</td>

                <td
                  className={`border p-2 font-semibold ${
                    r.status === "APPROVED"
                      ? "text-green-600"
                      : r.status === "REJECTED"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {r.status}
                </td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(r.id, "APPROVED")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(r.id, "REJECTED")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
