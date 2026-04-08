import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import jsPDF from "jspdf";


export default function ViewFormModal({ requestId, onClose }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/requests/${requestId}/full-form`)
      .then((res) => setFormData(JSON.parse(res.data)))
      .catch(() => alert("Failed to load form data"));
  }, [requestId]);

  if (!formData) return null;

  const exportPDF = () => {
    const pdf = new jsPDF();
    let y = 10;

    pdf.text("Document Request Details", 10, y);
    y += 10;

    Object.entries(formData).forEach(([key, value]) => {
      pdf.text(`${key}: ${value}`, 10, y);
      y += 8;
    });

    pdf.save(`request_${requestId}.pdf`);
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white max-w-3xl w-full rounded-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">📋 Application Details</h2>
          <button
            onClick={exportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>

          <button onClick={onClose} className="text-xl font-bold">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500 capitalize">{key}</p>
              <p className="font-semibold">{value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
