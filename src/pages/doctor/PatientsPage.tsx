// src/pages/doctor/PatientsPage.tsx
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import type { Appointment } from "../../utils/appointmentStorage";
import { getAppointments } from "../../utils/appointmentStorage";
import { getPrescriptionsByAppointment } from "../../utils/prescriptionStorage";

export default function PatientsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  useEffect(() => {
    const allAppointments = getAppointments();
    const doctorAppointments = allAppointments.filter(
      (a) => a.doctorName === doctorName
    );
    setAppointments(doctorAppointments);
  }, [doctorName]);

  // Group appointments by patient email
  const patientsMap = appointments.reduce((acc: Record<string, Appointment[]>, appt) => {
    if (!acc[appt.patientEmail]) acc[appt.patientEmail] = [];
    acc[appt.patientEmail].push(appt);
    return acc;
  }, {});

  const patientsList = Object.values(patientsMap).map((appts) => {
    const lastAppt = appts.reduce((latest, current) =>
      current.date > latest.date ? current : latest
    );
    return {
      patientName: lastAppt.patientName,
      patientEmail: lastAppt.patientEmail,
      lastChecked: lastAppt.date,
      appointments: appts,
    };
  });

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">My Patients</h2>

      {patientsList.length === 0 ? (
        <p className="text-gray-600 text-center">No patients yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientsList.map((p) => {
            // Get last prescription for summary
            const prescriptions = getPrescriptionsByAppointment(
              p.appointments[p.appointments.length - 1].id
            );
            const lastPrescription =
              prescriptions.length > 0 ? prescriptions[prescriptions.length - 1] : null;

            return (
              <div
                key={p.patientEmail}
                className="p-4 rounded-2xl shadow-md bg-white border-l-4 border-green-500 flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg">{p.patientName}</h3>
                <p className="text-gray-600">Last Checked: {p.lastChecked}</p>

                <p className="text-gray-700 mt-2 font-semibold">Last Prescription:</p>
                {lastPrescription && lastPrescription.medicines.length > 0 ? (
                  <ul className="text-gray-800 list-disc list-inside">
                    {lastPrescription.medicines.map(
                      (m: { name: string; dosage: string; duration: string }, i: number) => (
                        <li key={i}>
                          {m.name} - {m.dosage} - {m.duration}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">No prescriptions yet.</p>
                )}

                <p className="text-gray-600 mt-2">
                  Total Appointments: {p.appointments.length}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
