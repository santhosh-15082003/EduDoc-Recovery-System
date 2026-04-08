import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function UserRequests() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v2/document-requests/user")
      .then((res) => setList(res.data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Requests</h2>

      {list.map((r) => (
        <div
          key={r.id}
          className="border p-4 rounded mb-3 flex justify-between"
        >
          <span>{r.documentType}</span>
          <span
            className={
              r.status === "APPROVED"
                ? "text-green-600"
                : r.status === "REJECTED"
                ? "text-red-600"
                : r.status.replace("_"," ") === "UNDER_VERIFICATION"
                ? "text-blue-600 font-semibold"
                : "text-yellow-600"
            }
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}
