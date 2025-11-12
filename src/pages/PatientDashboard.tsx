import DashboardLayout from "./DashboardLayout";

export default function PatientDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>
      <p>Here patients can search doctors, book appointments, and view medical records.</p>
    </DashboardLayout>
  );
}
