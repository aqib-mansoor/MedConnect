import DashboardLayout from "./DashboardLayout";
import { useNavigate } from "react-router-dom";
import Button from "../components/auth/Button";

export default function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>
      <p className="mb-4">Welcome! Manage your appointments and view doctors here.</p>
      <Button onClick={() => navigate("/doctor-list")}>Find Doctors</Button>
    </DashboardLayout>
  );
}
