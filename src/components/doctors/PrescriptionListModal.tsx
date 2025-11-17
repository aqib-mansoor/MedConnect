import type { Prescription } from "../../utils/prescriptionStorage";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  prescriptions: Prescription[];
  patientName: string;
  onClose: () => void;
}

export default function PrescriptionListModal({ prescriptions, patientName, onClose }: Props) {
  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    // Temporarily show the print div if hidden
    const printDiv = printRef.current;
    printDiv.style.display = "block";

    const canvas = await html2canvas(printDiv, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${patientName}-prescription.pdf`);

    // Hide the print div again
    printDiv.style.display = "none";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
        {/* On-screen modal content */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Patient Prescription</h2>
          {prescriptions.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No prescriptions available.</p>
          ) : (
            <div className="space-y-4">
              {prescriptions.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-xl p-4 bg-green-50 shadow-md hover:shadow-lg transition-shadow"
                >
                  <p className="text-gray-700 font-medium mb-2">
                    Prescription Date: {p.date}
                  </p>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-green-200 text-green-900">
                        <th className="border px-3 py-1">Medicine Name</th>
                        <th className="border px-3 py-1">Dosage</th>
                        <th className="border px-3 py-1">Duration (Days)</th>
                        <th className="border px-3 py-1">Times/Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.medicines.map((m, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-green-50"}>
                          <td className="border px-3 py-1">{m.name}</td>
                          <td className="border px-3 py-1">{m.dosage}</td>
                          <td className="border px-3 py-1">{m.duration}</td>
                          <td className="border px-3 py-1">{m.time || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-gray-700 italic text-right mt-3">
                    Signature: <span className="font-semibold">{doctorName}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Download PDF
          </button>
        </div>

        {/* Hidden print template */}
        <div ref={printRef} className="hidden w-full p-6 bg-white" style={{ fontFamily: "Arial" }}>
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">MedConnect Clinic</h1>
          <p className="text-sm mb-2">
            Prescribed by: <strong>{doctorName}</strong>
          </p>
          <p className="text-sm mb-4">
            Patient: <strong>{patientName}</strong> | Date: <strong>{new Date().toLocaleDateString()}</strong>
          </p>

          {prescriptions.map((p) => (
            <div key={p.id} className="mb-6">
              <p className="text-sm font-medium mb-2">Prescription Date: {p.date}</p>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-green-200 text-green-900">
                    <th className="border px-3 py-1">Medicine Name</th>
                    <th className="border px-3 py-1">Dosage</th>
                    <th className="border px-3 py-1">Duration (Days)</th>
                    <th className="border px-3 py-1">Times/Day</th>
                  </tr>
                </thead>
                <tbody>
                  {p.medicines.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-green-50"}>
                      <td className="border px-3 py-1">{m.name}</td>
                      <td className="border px-3 py-1">{m.dosage}</td>
                      <td className="border px-3 py-1">{m.duration}</td>
                      <td className="border px-3 py-1">{m.time || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm italic text-right mt-2">
                Signature: <strong>{doctorName}</strong>
              </p>
            </div>
          ))}

          <p className="text-center text-gray-500 text-xs mt-4">
            MedConnect Clinic - Your health, our priority
          </p>
        </div>
      </div>
    </div>
  );
}
