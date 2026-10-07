import { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { RiCollapseDiagonalLine } from "react-icons/ri";

export default function DocumentApplyModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    requesterType: "",
    schoolName: "",
    grade: "",
    collegeName: "",
    department: "",
    courseName: "", // NEW

    registerNumber: "", // ✅ NEW
    universityName: "", // ✅ NEW

    reason: "",
    documents: "",
    deliveryMode: "",
    instructions: "",
  });

  const [file, setFile] = useState(null);
  const [idProof, setIdProof] = useState(null); // NEW
  const [oldDocument, setOldDocument] = useState(null); // NEW

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   if (!file) {
  //     toast.error("Please upload a supporting document");
  //     return;
  //   }

  //   if (!formData.documents) {
  //     toast.error("Please mention document type");
  //     return;
  //   }

  //   const token = localStorage.getItem("auth");

  //   if (!token) {
  //     toast.error("Login expired. Please login again.");
  //     return;
  //   }

  //   const payload = new FormData();
  //   payload.append("documentType", formData.documents);
  //   payload.append("firCopy", file);

  //   try {
  //     setLoading(true);

  //     console.log("TOKEN:", token);

  //     await axios.post("http://localhost:8081/api/requests", payload, {
  //       headers: {
  //         Authorization: `Basic ${token}`, // ✅ THIS WAS MISSING
  //       },
  //     });

  //     toast.success("Document request submitted successfully");
  //     onClose();
  //   } catch (err) {
  //     console.error("Status:", err.response?.status);
  //     toast.error("Failed to submit request");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a supporting document");
      return;
    }

    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Login expired. Please login again.");
      return;
    }

    const payload = new FormData();

    // 🔥 SEND ALL FIELDS MATCHING BACKEND

    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("dob", formData.dob);

    payload.append("addressLine1", formData.address1);
    payload.append("addressLine2", formData.address2);
    payload.append("city", formData.city);
    payload.append("state", formData.state);
    payload.append("zipCode", formData.zip);

    payload.append("email", formData.email);
    payload.append("phone", formData.phone);

    payload.append("requestedBy", formData.requesterType);
    payload.append("schoolName", formData.schoolName);
    payload.append("grade", formData.grade);
    payload.append("collegeName", formData.collegeName);
    payload.append("department", formData.department);
    payload.append("courseName", formData.courseName); // NEW

    payload.append("registerNumber", formData.registerNumber); // ✅ NEW
    payload.append("universityName", formData.universityName); // ✅ NEW

    payload.append("reason", formData.reason);
    payload.append("documentType", formData.documents);
    payload.append("deliveryMethod", formData.deliveryMode);
    payload.append("specialInstructions", formData.instructions);

    // optional
    payload.append(
      "applicantName",
      formData.firstName + " " + formData.lastName,
    );

    payload.append("firCopy", file);
    if (idProof) {
      payload.append("idProof", idProof);
    }

    if (oldDocument) {
      payload.append("oldDocumentImage", oldDocument);
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8081/api/requests", payload, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      toast.success("Document request submitted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-yellow-100 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl relative flex flex-col">
        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Document Request Form</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              onChange={handleChange}
            />
            <Input name="lastName" label="Last Name" onChange={handleChange} />
          </div>

          <Input
            type="date"
            name="dob"
            label="Date of Birth"
            onChange={handleChange}
          />
          <Input
            name="address1"
            label="Street Address"
            onChange={handleChange}
          />
          <Input
            name="address2"
            label="Street Address Line 2"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input name="city" label="City" onChange={handleChange} />
            <Input
              name="state"
              label="State / Province"
              onChange={handleChange}
            />
          </div>

          <Input name="zip" label="Postal / Zip Code" onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input name="email" label="Email" onChange={handleChange} />
            <Input name="phone" label="Phone Number" onChange={handleChange} />
          </div>

          <RadioGroup
            label="Who request a document?"
            name="requesterType"
            options={["Current Student", "Former Student", "Other"]}
            onChange={handleChange}
          />

          <Input
            name="schoolName"
            label="School Name"
            onChange={handleChange}
          />
          <Input name="grade" label="School Grade" onChange={handleChange} />

          <Input
            name="collegeName"
            label="College Name"
            onChange={handleChange}
          />

          <Input
            name="department"
            label="Program / Department"
            onChange={handleChange}
          />

          <Input
            name="courseName"
            label="Course Name"
            onChange={handleChange}
          />

          <Input
            name="registerNumber"
            label="Register Number"
            onChange={handleChange}
          />

          <Input
            name="universityName"
            label="University Name"
            onChange={handleChange}
          />

          <Input
            name="reason"
            label="Why is the document requested?"
            onChange={handleChange}
          />

          <Textarea
            name="documents"
            label="What document(s) are requested?"
            onChange={handleChange}
          />

          <RadioGroup
            label="Document delivery choice"
            name="deliveryMode"
            options={["Pick up myself", "Address Mail", "E-mail", "Other"]}
            onChange={handleChange}
          />

          <Textarea
            name="instructions"
            label="Special instructions"
            onChange={handleChange}
          />

          {/* FILE */}
          <div>
            <label className="font-medium">FIR copy</label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* ID PROOF */}
          <div>
            <label className="font-medium">
              Upload Supporting ID Proof (Aadhaar / ID Card)
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setIdProof(e.target.files[0])}
            />
          </div>

          {/* OLD DOCUMENT IMAGE */}
          <div>
            <label className="font-medium">
              Upload Old Document Image Proof
            </label>
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setOldDocument(e.target.files[0])}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- Reusable UI -------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="font-medium">{label} *</label>
    <input {...props} className="input-light mt-1" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="font-medium">{label} *</label>
    <textarea {...props} className="input-light mt-1 h-28" />
  </div>
);

const RadioGroup = ({ label, name, options, onChange }) => (
  <div>
    <p className="font-medium mb-2">{label} *</p>
    {options.map((opt) => (
      <label key={opt} className="mr-6">
        <input
          type="radio"
          name={name}
          value={opt}
          onChange={onChange}
          className="mr-1"
        />
        {opt}
      </label>
    ))}
  </div>
);
