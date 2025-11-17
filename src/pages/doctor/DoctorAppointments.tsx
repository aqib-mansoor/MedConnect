//src\pages\doctor\DoctorAppointments.tsx
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAppointments} from "../../utils/appointmentStorage";
import type { Appointment } from "../../utils/appointmentStorage";


export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const currentDoctorEmail = localStorage.getItem("currentUserEmail") || "doctor@demo.com";

  useEffect(() => {
    const allAppointments = getAppointments();
    const doctorAppointments = allAppointments.filter(
      (a) => a.doctorId === currentDoctorEmail && a.date === selectedDate
    );
    setAppointments(doctorAppointments);
  }, [selectedDate]);

  const handleComplete = (id: string) => {
    const allAppointments = getAppointments();
    const updatedAppointments = allAppointments.map(a => {
      if (a.id === id) a.status = "completed";
      return a;
    });
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments.filter(a => a.doctorId === currentDoctorEmail && a.date === selectedDate));
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      {appointments.length === 0 ? (
        <p>No appointments for this date.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map(a => (
            <div
              key={a.id}
              className={`p-4 rounded shadow-md ${
                a.status === "completed" ? "bg-green-100" : "bg-white"
              }`}
            >
              <h3 className="font-bold text-lg">Patient: {a.patientEmail}</h3>
              <p>Time: {a.time}</p>
              <p>Status: <span className={`font-semibold ${a.status === "booked" ? "text-blue-600" : "text-green-700"}`}>{a.status}</span></p>
              {a.status === "booked" && (
                <button
                  onClick={() => handleComplete(a.id)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
