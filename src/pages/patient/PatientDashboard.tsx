import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import { FaCalendarCheck, FaPills, FaFileMedical } from "react-icons/fa";

export default function PatientDashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Appointments" value={5} icon={<FaCalendarCheck />} />
        <DashboardCard title="Prescriptions" value={12} icon={<FaPills />} />
        <DashboardCard title="Medical Records" value={8} icon={<FaFileMedical />} />
      </div>
    </Layout>
  );
}
