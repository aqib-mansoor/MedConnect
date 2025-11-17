import { useState } from "react";
import type { Appointment } from "../../utils/appointmentStorage";
import { saveReport } from "../../utils/reportStorage";

interface Props {
  patient: Appointment;
  onClose: () => void;
}

export default function ReportUploadModal({ patient, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  const handleUpload = () => {
    if (!file) return alert("Please select a file!");

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64 = e.target?.result as string;

      saveReport({
        id: crypto.randomUUID(),
        doctorName,
        patientEmail: patient.patientEmail,
        fileName: file.name,
        fileData: base64,
        date: new Date().toISOString().split("T")[0],
      });

      alert("Medical report uploaded successfully!");
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Upload Report for {patient.patientEmail}</h2>

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={handleUpload} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
