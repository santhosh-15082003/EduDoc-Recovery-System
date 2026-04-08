const ViewFormModal = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[750px] p-6 rounded-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Full Form Details
        </h2>
        <Field label="First Name" value={data.firstName} />
        <Field label="Last Name" value={data.lastName} />
        <Field label="DOB" value={data.dob} />
        <Field label="Address Line 1" value={data.addressLine1} />
        <Field label="Address Line 2" value={data.addressLine2} />
        <Field label="City" value={data.city} />
        <Field label="State" value={data.state} />
        <Field label="Zip Code" value={data.zipCode} />
        <Field label="Email" value={data.email} />
        <Field label="Phone" value={data.phone} />
        <Field label="Requested By" value={data.requestedBy} />
        <Field label="School Name" value={data.schoolName} />
        <Field label="Grade" value={data.grade} />
        <Field label="College Name" value={data.collegeName} />
        <Field label="Department" value={data.department} />
        <Field label="Course Name" value={data.courseName} />
        {/* NEW FIELDS ADDED */}{" "}
        <Field label="Register Number" value={data.registerNumber} />{" "}
        <Field label="University Name" value={data.universityName} />
        
        <Field label="Reason" value={data.reason} />
        <Field label="Document Type" value={data.documentType} />
        <Field label="Delivery Method" value={data.deliveryMethod} />
        <Field label="Special Instructions" value={data.specialInstructions} />
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <p className="mb-2 text-gray-700">
    <strong>{label}:</strong> {value || "-"}
  </p>
);

export default ViewFormModal;
