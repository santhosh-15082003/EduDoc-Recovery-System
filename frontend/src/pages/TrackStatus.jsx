import { useState } from "react";

export default function TrackStatus() {
  const [reportId, setReportId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    setError("");
    setResult(null);

    if (!reportId) {
      setError("Please enter Report ID");
      return;
    }

    try {
      const res = await fetch(`/api/public/track/${reportId}`);

      if (!res.ok) {
        throw new Error("Report not found");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Invalid Report ID or Report not found");
      console.error(err);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Track Your Application
        </h2>

        <input
          type="number"
          placeholder="Enter Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleTrack}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Track Status
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-6 border-t pt-4">
            <p>
              <strong>ID:</strong> {result.id}
            </p>
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Document Type:</strong> {result.documentType}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  result.status === "APPROVED"
                    ? "text-green-600"
                    : result.status === "REJECTED"
                    ? "text-red-600"
                    : result.status.replace("_", " ") === "UNDER_VERIFICATION"
                    ? "text-blue-600 font-semibold"
                    : "text-yellow-600"
                }
              >
                {result.status}
              </span>
            </p>
            <p>
              <strong>Admin Remark:</strong>{" "}
              {result.remark || "Not updated yet"}
            </p>
            <p>
              <strong>Submitted On:</strong> {result.createdAt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
