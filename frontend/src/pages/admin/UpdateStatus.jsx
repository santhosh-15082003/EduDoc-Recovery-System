import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateStatus() {
  const [requestId, setRequestId] = useState("");
  const [status, setStatus] = useState("APPROVED");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/requests/${requestId}/status?status=${status}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${localStorage.getItem("auth")}`,
      },
    });
    alert(`Request ${requestId} updated to ${status}`);
  };

  toast.success("Login successful!");
  toast.error("Invalid credentials!");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Request Status</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
