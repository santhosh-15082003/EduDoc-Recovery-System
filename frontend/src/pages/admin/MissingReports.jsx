import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export default function MissingReports() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [remark, setRemark] = useState("");

  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/missing", {
          headers: { Authorization: `Basic ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/missing/${id}/status`, null, {
        params: { status, remark },
        headers: { Authorization: `Basic ${token}` },
      });

      toast.success(`Report ${status}`);
      setSelected(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Status update failed");
    }
  };

  // const downloadFile = (id, type) => {
  //   window.open(`http://localhost:8081/api/missing/${id}/${type}`, "_blank");
  // };

  // ✅ FIXED DOWNLOAD FUNCTION (With Auth Header)
  const downloadFile = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
        headers: { Authorization: `Basic ${token}` }, // 🔥 ADDED THIS
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = "file";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
      toast.error("File download failed");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-red-600">
        Missing Document Reports
      </h2>

      <table className="w-full border bg-white shadow">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Applicant</th>
            <th>Document</th>
            <th>Status</th>
            <th>Action</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t text-center">
              <td>{r.id}</td>
              <td>{r.fullName}</td>
              <td>{r.documentType}</td>
              <td>{r.status}</td>
              <td>
                <button
                  onClick={() => setSelected(r)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Open
                </button>
              </td>
              <td>{r.policeReported ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-xl relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Full Report Details</h3>

            <p>
              <strong>Name:</strong> {selected.fullName}
            </p>
            <p>
              <strong>Father:</strong> {selected.fatherName}
            </p>
            <p>
              <strong>Email:</strong> {selected.email}
            </p>
            <p>
              <strong>Mobile:</strong> {selected.mobile}
            </p>
            <p>
              <strong>Description:</strong> {selected.description}
            </p>
            <p>
              <strong>Date of Loss:</strong> {selected.dateOfLoss}
            </p>

            <p>
              <strong>Time of Loss:</strong> {selected.timeOfLoss}
            </p>

            <p>
              <strong>Place of Occurrence:</strong> {selected.placeOfOccurrence}
            </p>

            <p>
              <strong>University Name:</strong> {selected.universityName}
            </p>

            <p>
              <strong>College Name:</strong> {selected.collegeName}
            </p>

            <p>
              <strong>Register Number:</strong> {selected.registerNumber}
            </p>

            <div className="mt-4 space-x-3">
              {/* ✅ FIXED BUTTON CALLS */}
              <button
                onClick={() =>
                  downloadFile(
                    `/api/missing/${selected.id}/fir`,
                  )
                }
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                Download FIR
              </button>

              <button
                onClick={() =>
                  downloadFile(
                    `/api/missing/${selected.id}/selfie`,
                  )
                }
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                Download Selfie
              </button>

              <button
                onClick={() =>
                  downloadFile(
                    `/api/missing/${selected.id}/verification`,
                  )
                }
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                Download Verification
              </button>

              <button
                onClick={() =>
                  downloadFile(
                    `/api/missing/${selected.id}/college-id`,
                  )
                }
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                Download College ID
              </button>
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Enter admin remark..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mt-4 space-x-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(selected.id, "UNDER_VERIFICATION")}
              >
                Under Verification
              </button>

              <button
                onClick={() => updateStatus(selected.id, "APPROVED")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(selected.id, "REJECTED")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
