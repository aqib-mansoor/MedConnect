import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAppointments } from "../../utils/appointmentStorage";
import type { Appointment } from "../../utils/appointmentStorage";
import { useToast } from "../../context/ToastContext";
import ConfirmModal from "../../components/common/ConfirmModal";
import { FaUserMd, FaCalendarAlt, FaClock, FaTimesCircle } from "react-icons/fa";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"booked" | "cancelled">("booked");
  const currentUserEmail = localStorage.getItem("currentUserEmail") || "patient@demo.com";
  const { addToast } = useToast();

  useEffect(() => {
    const allAppointments = getAppointments();
    const patientAppointments = allAppointments.filter(a => a.patientEmail === currentUserEmail);
    setAppointments(patientAppointments);
  }, []);

  const handleCancelConfirm = (id: string) => {
    const allAppointments = getAppointments();
    const updatedAppointments = allAppointments.map(a => {
      if (a.id === id) a.status = "cancelled";
      return a;
    });
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments.filter(a => a.patientEmail === currentUserEmail));
    setConfirmId(null);
    addToast("Appointment cancelled successfully!", "success");
  };

  const filteredAppointments = appointments.filter(a => a.status === activeTab);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">My Appointments</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("booked")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "booked" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          } transition`}
        >
          Booked
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "cancelled" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
          } transition`}
        >
          Cancelled
        </button>
      </div>

      {/* Appointment Cards */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-16">
          No {activeTab} appointments.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map(app => (
            <div
              key={app.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 flex flex-col justify-between overflow-hidden border-l-8 ${
                app.status === "booked" ? "border-l-green-500" : "border-l-gray-400 bg-gray-100 line-through"
              }`}
            >
              {/* Gradient Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-400 rounded-bl-full opacity-20"></div>

              {/* Doctor Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 text-green-600 p-4 rounded-full text-3xl flex items-center justify-center">
                  <FaUserMd />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{app.doctorName}</h3>
                  <p className="text-sm text-gray-500">Appointment</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <FaCalendarAlt className="text-green-500" />
                <span>{app.date}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <FaClock className="text-green-500" />
                <span>{app.time}</span>
              </div>

              {/* Status Badge */}
              <div className="mt-2 mb-4">
                <span
                  className={`font-semibold px-3 py-1 rounded-full text-sm ${
                    app.status === "booked"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>

              {/* Cancel Button */}
              {app.status === "booked" && (
                <button
                  onClick={() => setConfirmId(app.id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                >
                  <FaTimesCircle className="w-6 h-6" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to cancel this appointment?"
          onConfirm={() => handleCancelConfirm(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </Layout>
  );
}
