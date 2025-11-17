import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import { FaUserMd, FaCalendarAlt, FaFileUpload, FaClock } from "react-icons/fa";
import { getAppointments } from "../../utils/appointmentStorage";

interface DoctorUser {
  email: string;
  password: string;
  role: "doctor";
}

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("Doctor");
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      const user: DoctorUser = JSON.parse(storedUser);

      const nameFromEmail = user.email.split("@")[0];
      const capitalized =
        "Dr. " + nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      setDoctorName(capitalized);

      const allAppointments = getAppointments();
      const filtered = allAppointments.filter(
        (a) => a.doctorId === user.email && a.date === today
      );

      setTodayAppointments(filtered);
    }
  }, []);

  const recentReports = [
    { name: "MRI Scan - Aqib", date: "10 Nov 2025" },
    { name: "Blood Test - Fatima", date: "09 Nov 2025" },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Welcome, {doctorName} 👨‍⚕️</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={<FaCalendarAlt />}
          color="green"
          extra={<p className="text-sm text-gray-500 mt-1">Live updated</p>}
        />

        <DashboardCard
          title="Active Patients"
          value={20}
          icon={<FaUserMd />}
          color="green"
        />

        <DashboardCard
          title="Reports Uploaded"
          value={15}
          icon={<FaFileUpload />}
          color="green"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Today's Appointments</h3>

        {todayAppointments.length === 0 && (
          <p className="text-gray-500">No appointments today.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayAppointments.map((appt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:shadow-2xl transition"
            >
              <h4 className="font-bold text-gray-800">
                {appt.patientName} {/*  Now shows patient name */}
              </h4>

              <p className="text-gray-500 flex items-center gap-2">
                <FaClock className="text-green-600" /> {appt.time}
              </p>

              <span className="text-sm font-semibold text-green-600">
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recently Uploaded Reports</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentReports.map((report, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center hover:shadow-2xl transition"
            >
              <div>
                <h4 className="font-bold text-gray-800">{report.name}</h4>
                <p className="text-gray-500 text-sm">{report.date}</p>
              </div>
              <button className="text-green-600 font-semibold hover:text-green-700 transition">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
