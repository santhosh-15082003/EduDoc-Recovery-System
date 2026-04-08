import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

export default function ViewRequest() {
  const { id } = useParams();
  const [req, setReq] = useState(null);

  useEffect(() => {
    axios.get(`/api/v2/document-requests/admin`).then((res) => {
      const found = res.data.find((r) => r.id === Number(id));
      setReq(found);
    });
  }, [id]);

  if (!req) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Request #{req.id}</h2>

      <p>
        <b>Name:</b> {req.firstName} {req.lastName}
      </p>
      <p>
        <b>DOB:</b> {req.dob}
      </p>
      <p>
        <b>Email:</b> {req.email}
      </p>
      <p>
        <b>Phone:</b> {req.phone}
      </p>
      <p>
        <b>Address:</b> {req.address}, {req.city}, {req.state} - {req.zip}
      </p>
      <p>
        <b>Document:</b> {req.documentType}
      </p>

      <a
        href={`/api/v2/document-requests/${req.id}/file`}
        className="text-blue-600 underline"
      >
        📥 Download Uploaded File
      </a>
    </div>
  );
}
