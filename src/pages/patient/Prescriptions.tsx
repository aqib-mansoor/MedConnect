import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getPrescriptionsByPatient } from "../../utils/prescriptionStorage";
import type { Prescription } from "../../utils/prescriptionStorage";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const patientEmail = localStorage.getItem("currentUserEmail") || "patient@demo.com";

  useEffect(() => {
    setPrescriptions(getPrescriptionsByPatient(patientEmail));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 text-green-600 text-center">My Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          You have no prescriptions yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 border-l-4 border-green-600"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-green-600"> {p.doctorName}</p>
                <p className="text-gray-400 text-sm">{p.date}</p>
              </div>

              <div className="flex flex-col gap-3">
                {p.medicines.map((m, i) => (
                  <div
                    key={i}
                    className="bg-green-50 border border-green-200 rounded-md p-3 hover:bg-green-100 transition-colors"
                  >
                    <p>
                      <span className="font-semibold text-green-700">Medicine:</span> {m.name}
                    </p>
                    <p>
                      <span className="font-semibold text-green-700">Dosage:</span> {m.dosage}
                    </p>
                    <p>
                      <span className="font-semibold text-green-700">Duration:</span> {m.duration} days
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
