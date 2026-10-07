// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function CreateRequest() {
//   const [docType, setDocType] = useState("");
//   const [firFile, setFirFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("documentType", docType);
//     formData.append("firCopy", firFile);

//     // const res = await fetch(`/api/requests?documentType=${docType}`, {
//     //   method: "POST",
//     //   headers: {
//     //     Authorization: `Basic ${localStorage.getItem("auth")}`,
//     //   },
//     // });

//     const res = await fetch("/api/requests", {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${localStorage.getItem("auth")}`,
//       },
//       body: formData,
//     });

//     if (res.ok) {
//       toast.success("Request created successfully! ✅", { autoClose: 2000 });
//     } else {
//       toast.error("Failed to create request ❌", { autoClose: 2000 });
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Create Document Request</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           // type="text"
//           value={docType}
//           placeholder="Document Type"
//           onChange={(e) => setDocType(e.target.value)}
//           className="border p-2 w-full"
//           required
//         />
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFirFile(e.target.files[0])}
//           className="border p-2 w-full"
//           required
//         />
//         <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }


// --------------------------2--------------------------------------------

// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function CreateRequest() {
//   const [docType, setDocType] = useState("");
//   const [firFile, setFirFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("documentType", docType);
//     formData.append("firCopy", firFile);

//     const res = await fetch("/api/requests", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     if (res.ok) {
//       toast.success("Request created successfully! ✅", { autoClose: 2000 });
//     } else {
//       toast.error("Failed to create request ❌", { autoClose: 2000 });
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Create Document Request</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           value={docType}
//           placeholder="Document Type"
//           onChange={(e) => setDocType(e.target.value)}
//           className="border p-2 w-full"
//           required
//         />

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFirFile(e.target.files[0])}
//           className="border p-2 w-full"
//           required
//         />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }

// --------------------------3--------------------------------------------

import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/apiConfig";

export default function CreateRequest() {
  const [docType, setDocType] = useState("");
  const [firFile, setFirFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = localStorage.getItem("auth");

    if (!auth) {
      toast.error("Please login again ❌");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", docType);
    formData.append("firCopy", firFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/requests`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${localStorage.getItem("auth")}`,
        },
        body: formData,
      });


      if (res.ok) {
        toast.success("Request created successfully ✅");
        setDocType("");
        setFirFile(null);
      } else {
        toast.error("Unauthorized or failed ❌");
      }
    } catch (err) {
      console.error("Error creating request:", err);
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Document Request</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={docType}
          placeholder="Document Type"
          onChange={(e) => setDocType(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFirFile(e.target.files[0])}
          className="border p-2 w-full"
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
