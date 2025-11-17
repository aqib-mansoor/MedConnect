import { useState } from "react";
import type { Appointment } from "../../utils/appointmentStorage";
import { saveReport } from "../../utils/reportStorage";
import { toast } from "react-toastify";

interface Props {
  patient: Appointment & { patientName?: string };
  onClose: () => void;
}

export default function ReportUploadModal({ patient, onClose }: Props) {
  const [files, setFiles] = useState<FileList | null>(null);
  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  const handleUpload = () => {
    if (!files || files.length === 0) {
      toast.error("⚠️ Please select at least one file!");
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target?.result as string;

        saveReport({
          id: crypto.randomUUID(),
          doctorName,
          patientEmail: patient.patientEmail,
          fileName: file.name,
          fileData: base64,
          date: new Date().toISOString().split("T")[0],
        });
      };
      reader.readAsDataURL(file);
    });

    toast.success(` Medical report(s) uploaded for ${patient.patientName || patient.patientEmail}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl border-2 border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
          Upload Reports for {patient.patientName || patient.patientEmail}
        </h2>

        <input
          type="file"
          accept=".pdf,image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="mb-4 p-2 border border-green-300 rounded w-full"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
