import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAppointments } from "../../utils/appointmentStorage";
import type { Appointment } from "../../utils/appointmentStorage";
import { getPrescriptionsByAppointment } from "../../utils/prescriptionStorage";
import type { Prescription } from "../../utils/prescriptionStorage";
import ReportUploadModal from "../../components/doctors/ReportUploadModal";
import PrescriptionListModal from "../../components/doctors/PrescriptionListModal";
import { AiOutlineFileText, AiOutlineOrderedList } from "react-icons/ai";

export default function PatientsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedPatientForReport, setSelectedPatientForReport] = useState<Appointment | null>(null);
  const [showPrescriptionList, setShowPrescriptionList] = useState<{
    patientName: string;
    prescriptions: Prescription[];
  } | null>(null);

  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  useEffect(() => {
    const allAppointments = getAppointments();
    const doctorAppointments = allAppointments.filter(a => a.doctorName === doctorName);
    setAppointments(doctorAppointments);
  }, [doctorName]);

  // Group appointments by patient email
  const patientsMap = appointments.reduce((acc: Record<string, Appointment[]>, appt) => {
    if (!acc[appt.patientEmail]) acc[appt.patientEmail] = [];
    acc[appt.patientEmail].push(appt);
    return acc;
  }, {});

  const patientsList = Object.values(patientsMap).map((appts) => {
    const lastAppt = appts.reduce((latest, current) => current.date > latest.date ? current : latest);
    return {
      patientName: lastAppt.patientName || lastAppt.patientEmail,
      patientEmail: lastAppt.patientEmail,
      lastChecked: lastAppt.date,
      appointments: appts,
    };
  });

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">My Patients</h2>

      {patientsList.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No patients yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientsList.map((p) => {
            const lastAppointment = p.appointments[p.appointments.length - 1];
            const prescriptions = getPrescriptionsByAppointment(lastAppointment.id);

            return (
              <div
                key={p.patientEmail}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow relative"
              >
                {/* Patient Header */}
                <div className="flex items-center mb-4 gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {p.patientName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{p.patientName}</h3>
                    <p className="text-gray-500 text-sm">
                      Last Checked: <span className="font-medium">{p.lastChecked}</span>
                    </p>
                  </div>
                </div>

                {/* Last Prescription */}
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold mb-1 flex items-center gap-1">
                    <AiOutlineOrderedList /> Last Prescription:
                  </p>
                  {prescriptions.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-800 text-sm max-h-32 overflow-y-auto">
                      {prescriptions[prescriptions.length - 1].medicines
                        .slice(-2) // last 2 medicines
                        .map((m, i) => (
                          <li key={i}>{m.name} - {m.dosage} - {m.duration}</li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No prescriptions yet.</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  {/* View Prescriptions Button */}
                  <button
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-2 px-4 shadow transition-colors text-sm w-full sm:w-auto"
                    onClick={() =>
                      setShowPrescriptionList({ patientName: p.patientName, prescriptions })
                    }
                  >
                    <AiOutlineOrderedList className="text-lg" /> Prescription
                  </button>

                  {/* Upload Report Button */}
                  <button
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl py-2 px-4 shadow transition-colors text-sm w-full sm:w-auto"
                    onClick={() => setSelectedPatientForReport(lastAppointment)}
                  >
                    <AiOutlineFileText className="text-lg" /> Report
                  </button>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  Total Appointments: <span className="font-medium">{p.appointments.length}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      {selectedPatientForReport && (
        <ReportUploadModal
          patient={selectedPatientForReport}
          onClose={() => setSelectedPatientForReport(null)}
        />
      )}

      {showPrescriptionList && (
        <PrescriptionListModal
          patientName={showPrescriptionList.patientName}
          prescriptions={showPrescriptionList.prescriptions}
          onClose={() => setShowPrescriptionList(null)}
        />
      )}
    </Layout>
  );
}
