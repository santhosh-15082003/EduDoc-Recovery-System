import { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

export default function DocumentApplyV2({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!file) return toast.error("File required");

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    data.append("file", file);

    try {
      setLoading(true);
      await axios.post("/api/v2/document-requests", data);
      toast.success("Request submitted");
      onClose();
    } catch {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        name="firstName"
        placeholder="First Name *"
        onChange={handleChange}
      />
      <inputk
        name="lastName"
        placeholder="Last Name *"
        onChange={handleChange}
      />
      <input name="dob" type="date" onChange={handleChange} />
      <input
        name="documentType"
        placeholder="Document Type *"
        onChange={handleChange}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={submit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
