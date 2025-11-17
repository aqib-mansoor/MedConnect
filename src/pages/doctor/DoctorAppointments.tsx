// src/pages/doctor/DoctorAppointments.tsx
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAppointments } from "../../utils/appointmentStorage";
import type { Appointment } from "../../utils/appointmentStorage";
import PrescriptionModal from "../../components/doctors/PrescriptionModal";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "previous">("today");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const currentDoctorEmail = localStorage.getItem("currentUserEmail") || "doctor@demo.com";

  useEffect(() => {
    const allAppointments = getAppointments();
    const doctorAppointments = allAppointments.filter(
      (a) => a.doctorId === currentDoctorEmail
    );
    setAppointments(doctorAppointments);
  }, [currentDoctorEmail]);

  const handleComplete = (appointmentId: string) => {
    const allAppointments = getAppointments();
    const updated = allAppointments.map(a => {
      if (a.id === appointmentId) a.status = "completed";
      return a;
    });
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated.filter(a => a.doctorId === currentDoctorEmail));
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === "today") return a.date === today && a.status === "booked";
    if (activeTab === "upcoming") return a.date > today && a.status === "booked";
    if (activeTab === "previous") return a.status === "completed";
    return false;
  });

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">My Appointments</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "today" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          } transition`}
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "upcoming" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          } transition`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "previous" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          } transition`}
        >
          Previous
        </button>
      </div>

      {/* Appointment Cards */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-16">No appointments in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((a) => (
            <div
              key={a.id}
              className={`p-4 rounded-2xl shadow-md flex flex-col justify-between border-l-8 overflow-hidden ${
                a.status === "completed"
                  ? "border-l-blue-500 bg-blue-50"
                  : "border-l-green-500 bg-white"
              }`}
            >
              <h3 className="font-bold text-lg">{a.patientName}</h3>
              <p>Date: {a.date}</p>
              <p>Time: {a.time}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    a.status === "booked" ? "text-green-700" : "text-blue-700"
                  }`}
                >
                  {a.status.toUpperCase()}
                </span>
              </p>

              {activeTab !== "previous" && a.status === "booked" && (
                <button
                  onClick={() => setSelectedAppointment(a)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Write Prescription
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {selectedAppointment && (
        <PrescriptionModal
          patient={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onComplete={handleComplete}
        />
      )}
    </Layout>
  );
}
