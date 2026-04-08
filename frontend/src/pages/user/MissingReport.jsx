import { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { University } from "lucide-react";

export default function MissingReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    addressLine1: "",
    addressLine2: "",
    district: "",
    state: "",
    pincode: "",
    mobile: "",
    email: "",
    documentType: "",
    dateOfLoss: "",
    timeOfLoss: "",
    placeOfOccurrence: "",
    universityName: "",
    collegeName: "",
    registerNumber: "",
    description: "",
    policeReported: false,
  });

  const [files, setFiles] = useState({
    firCopy: null,
    selfie: null,
    verificationCard: null,
    collegeIdCard: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setForm({ ...form, policeReported: value === "yes" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // const handleSubmit = async () => {
  //   const token = localStorage.getItem("auth");

  //   if (!token) {
  //     toast.error("Login expired. Please login again.");
  //     return;
  //   }

  //   const payload = new FormData();

  //   Object.keys(form).forEach((key) => {
  //     payload.append(key, form[key]);
  //   });

  //   Object.keys(files).forEach((key) => {
  //     if (files[key]) payload.append(key, files[key]);
  //   });

  //   try {
  //     setLoading(true);

  //     await axios.post("http://localhost:8080/api/missing", payload, {
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       },
  //     });

  //     toast.success("Missing report submitted successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Submission failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ✅ NEW AI FUNCTION
  const generateDescription = async () => {
    const token = localStorage.getItem("auth");

    if (!token) {
      toast.error("Login expired. Please login again.");
      return;
    }

    try {
      setAiLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/missing/generate-description",
        {
          fullName: form.fullName,
          documentType: form.documentType,
          placeOfOccurrence: form.placeOfOccurrence,
          dateOfLoss: form.dateOfLoss,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );

      setForm({ ...form, description: res.data.description });

      toast.success("AI description generated!");
    } catch (err) {
      toast.error("Failed to generate description");
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("auth");

    if (!token) {
      toast.error("Login expired. Please login again.");
      return;
    }

    const payload = new FormData();

    Object.keys(form).forEach((key) => {
      payload.append(key, form[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) payload.append(key, files[key]);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/missing",
        payload,
        { headers: { Authorization: `Basic ${token}` } },
      );

      setTrackingId(res.data.id);
      toast.success("Report submitted successfully!");
    } catch (err) {
      toast.error("Submission failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (trackingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Report Submitted Successfully!
          </h2>

          <p className="text-gray-600 mb-2">Your Tracking ID:</p>

          <div className="text-3xl font-bold text-purple-600 mb-6">
            #{trackingId}
          </div>

          <button
            onClick={() => navigate(`/user/track/${trackingId}`)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Track Report
          </button>

          <br />

          <button
            onClick={() => navigate("/user/dashboard")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
        Missing Document Report
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Input name="fullName" label="Full Name" onChange={handleChange} />
        <Input name="fatherName" label="Father Name" onChange={handleChange} />
      </div>

      <Input
        name="addressLine1"
        label="Address Line 1"
        onChange={handleChange}
      />
      <Input
        name="addressLine2"
        label="Address Line 2"
        onChange={handleChange}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input name="district" label="District" onChange={handleChange} />
        <Input name="state" label="State" onChange={handleChange} />
        <Input name="pincode" label="Pincode" onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input name="mobile" label="Mobile" onChange={handleChange} />
        <Input name="email" label="Email" onChange={handleChange} />
      </div>

      <Input
        name="documentType"
        label="Document Type"
        onChange={handleChange}
      />
      <Input
        type="date"
        name="dateOfLoss"
        label="Date of Loss"
        onChange={handleChange}
      />
      <Input
        type="time"
        name="timeOfLoss"
        label="Time of Loss"
        onChange={handleChange}
      />
      <Input
        name="placeOfOccurrence"
        label="Place of Occurrence"
        onChange={handleChange}
      />

      <Input
        name="universityName"
        label="University Name"
        onChange={handleChange}
      />

      <Input
        name="collegeName"
        label="College Name"
        onChange={handleChange}
      />

      <Input
        name="registerNumber"
        label="Register Number"
        onChange={handleChange}
      />

      <Textarea
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      {/* ✅ AI BUTTON */}
      <button
        type="button"
        onClick={generateDescription}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-2"
      >
        {aiLoading ? "Generating..." : "Generate Description with AI"}
      </button>

      <div className="mt-4">
        <label className="font-medium">Did you report to police?</label>
        <div className="mt-2">
          <label className="mr-4">
            <input
              type="radio"
              name="policeReported"
              value="yes"
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="policeReported"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {/* ✅ SHOW WARNING IF USER SELECTS NO */}
      {form.policeReported === false ? (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-400 rounded-xl text-center">
          <p className="text-yellow-700 font-medium">
            ⚠ You must first report the missing document to the nearest police
            station and obtain the FIR copy before submitting this form.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <>
          <FileInput
            name="firCopy"
            label="Upload FIR Copy"
            onChange={handleFileChange}
          />
          <FileInput
            name="selfie"
            label="Upload Selfie"
            onChange={handleFileChange}
          />
          <FileInput
            name="verificationCard"
            label="Upload Aadhaar/License"
            onChange={handleFileChange}
          />
          <FileInput
            name="collegeIdCard"
            label="Upload College ID"
            onChange={handleFileChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </>
      )}
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div className= " mt-3">
    <label className="font-medium">{label}</label>
    <input {...props} className="input-light mt-1 w-full" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="mt-3">
    <label className="font-medium">{label}</label>
    <textarea {...props} className="input-light mt-1 w-full h-24" />
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div className="mt-3">
    <label className="font-medium">{label}</label>
    <input type="file" {...props} className="input-light mt-1" />
  </div>
);