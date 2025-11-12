import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import { FaUserMd, FaCalendarAlt, FaFileUpload, FaClipboardList, FaClock } from "react-icons/fa";

export default function DoctorDashboard() {
  const todayAppointments = [
    { patient: "Aqib Mansoor", time: "10:00 AM", status: "Upcoming" },
    { patient: "Fatima Ali", time: "11:30 AM", status: "Completed" },
    { patient: "Bilal Khan", time: "2:00 PM", status: "Upcoming" },
  ];

  const recentReports = [
    { name: "MRI Scan - Aqib", date: "10 Nov 2025" },
    { name: "Blood Test - Fatima", date: "09 Nov 2025" },
  ];

  const upcomingSlots = [
    { day: "Monday", time: "9:00 AM - 2:00 PM" },
    { day: "Tuesday", time: "10:00 AM - 3:00 PM" },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Welcome, Dr. Smith 👨‍⚕️</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Active Patients"
          value={25}
          icon={<FaUserMd />}
          color="green"
          extra={<p className="text-sm text-gray-500 mt-1">+3 new this week</p>}
        />
        <DashboardCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={<FaCalendarAlt />}
          color="green"
          extra={<p className="text-sm text-gray-500 mt-1">2 completed</p>}
        />
        <DashboardCard
          title="Reports Uploaded"
          value={15}
          icon={<FaFileUpload />}
          color="green"
          extra={<p className="text-sm text-gray-500 mt-1">5 new this month</p>}
        />
      </div>

      {/* Today's Appointments */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Today's Appointments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayAppointments.map((appt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:shadow-2xl transition"
            >
              <h4 className="font-bold text-gray-800">{appt.patient}</h4>
              <p className="text-gray-500 flex items-center gap-2">
                <FaClock className="text-green-600" /> {appt.time}
              </p>
              <span
                className={`text-sm font-semibold ${
                  appt.status === "Upcoming" ? "text-green-600" : "text-gray-400"
                }`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
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
