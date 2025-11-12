import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import { FaUserMd, FaCalendarAlt, FaFileUpload } from "react-icons/fa";

export default function DoctorDashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Patients" value={25} icon={<FaUserMd />} />
        <DashboardCard title="Appointments" value={10} icon={<FaCalendarAlt />} />
        <DashboardCard title="Reports Uploaded" value={15} icon={<FaFileUpload />} />
      </div>
    </Layout>
  );
}
