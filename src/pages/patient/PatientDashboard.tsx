import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import { FaHeartbeat, FaCalendarCheck, FaPills, FaUserMd } from "react-icons/fa";
import DoctorCard from "../../components/doctors/DoctorCard";
import { getDoctors } from "../../utils/doctorStorage";
import type {  Doctor } from "../../utils/doctorStorage";

import { useState } from "react";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>(getDoctors());

  const upcomingAppointments = [
    { doctor: "Dr. Sara Ahmed", date: "12 Nov 2025", time: "10:00 AM" },
    { doctor: "Dr. Ali Raza", date: "15 Nov 2025", time: "02:00 PM" },
  ];

  const recentPrescriptions = [
    { name: "Paracetamol", dosage: "500mg", status: "Taken" },
    { name: "Amoxicillin", dosage: "250mg", status: "Pending" },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Your Health Overview</h2>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Heart Rate"
          value="78 bpm"
          icon={<FaHeartbeat />}
          color="green"
        />
        <DashboardCard
          title="Appointments"
          value={upcomingAppointments.length}
          icon={<FaCalendarCheck />}
          color="green"
        />
        <DashboardCard
          title="Prescriptions"
          value={recentPrescriptions.length}
          icon={<FaPills />}
          color="green"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.map((appt, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:shadow-2xl transition">
              <h4 className="font-bold text-gray-800">{appt.doctor}</h4>
              <p className="text-gray-500">{appt.date} at {appt.time}</p>
              <span className="text-sm text-green-600 font-semibold">Confirmed</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Prescriptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPrescriptions.map((pres, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-1 hover:shadow-2xl transition">
              <h4 className="font-bold text-gray-800">{pres.name}</h4>
              <p className="text-gray-500">Dosage: {pres.dosage}</p>
              <span className={`text-sm font-semibold ${pres.status === "Taken" ? "text-green-600" : "text-yellow-600"}`}>
                {pres.status}
              </span>
            </div>
          ))}
        </div>
      </div>

     

    
    </Layout>
  );
}
