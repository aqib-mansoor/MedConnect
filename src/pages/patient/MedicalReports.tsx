import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getReportsByPatient} from "../../utils/reportStorage";
import type { MedicalReport } from "../../utils/reportStorage";


export default function MedicalReports() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const patientEmail = localStorage.getItem("currentUserEmail") || "patient@demo.com";

  useEffect(() => {
    setReports(getReportsByPatient(patientEmail));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">My Medical Reports</h2>
      {reports.length === 0 ? (
        <p>No reports uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r) => (
            <div key={r.id} className="p-4 bg-white rounded shadow-md">
              <p className="font-semibold">Uploaded by: {r.doctorName}</p>
              <p>Date: {r.date}</p>
              <a
                href={r.fileData}
                download={r.fileName}
                className="mt-2 inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download {r.fileName}
              </a>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
