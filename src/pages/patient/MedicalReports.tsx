import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getReportsByPatient } from "../../utils/reportStorage";
import type { MedicalReport } from "../../utils/reportStorage";

export default function MedicalReports() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const patientEmail = localStorage.getItem("currentUserEmail") || "patient@demo.com";

  useEffect(() => {
    setReports(getReportsByPatient(patientEmail));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-extrabold mb-8 text-green-700 text-center">
        My Medical Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-gray-600 text-center mt-10 text-lg">
          No reports uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reports.map((r) => (
            <div
              key={r.id}
              className="flex flex-col bg-white shadow-md rounded-2xl border border-green-300 overflow-hidden hover:shadow-lg transition duration-200"
            >
              {/* Header */}
              <div className="bg-green-50 p-3 flex justify-between items-center border-b border-green-200">
                <p className="font-semibold text-green-700 text-sm">{r.doctorName}</p>
                <p className="text-gray-500 text-xs">{r.date}</p>
              </div>

              {/* Content */}
              <div className="flex justify-center items-center bg-gray-50 h-40 p-2">
                {r.fileName.endsWith(".pdf") ? (
                  <embed
                    src={r.fileData}
                    type="application/pdf"
                    className="w-full h-full border rounded"
                  />
                ) : (
                  <img
                    src={r.fileData}
                    alt={r.fileName}
                    className="w-full h-full object-contain rounded"
                  />
                )}
              </div>

              {/* Download Button */}
              <div className="p-2 flex justify-center">
                <a
                  href={r.fileData}
                  download={`${r.fileName}`}
                  className="w-full text-center px-3 py-1 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 text-sm"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
