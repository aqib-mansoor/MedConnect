import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSearchPage from "./pages/patient/DoctorSearchPage";
import MyAppointments from "./pages/patient/MyAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientsPage from "./pages/doctor/PatientsPage";
import MedicalReports from "./pages/patient/MedicalReports";
import AvailabilityPage from "./pages/doctor/AvailabilityPage";
import MedicineReminders from "./pages/patient/MedicineReminders";
import Prescriptions from "./pages/patient/Prescriptions";



function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/patient-doctors" element={<DoctorSearchPage />} />
      <Route path="/patient-appointments" element={<MyAppointments />} />
      <Route path="/doctor-appointments" element={<DoctorAppointments />} />
      <Route path="/doctor-patients" element={<PatientsPage />} />
      <Route path="/patient-reports" element={<MedicalReports />} />
      <Route path="/doctor-availability" element={<AvailabilityPage />} />
      <Route path="/medicine-reminders" element={<MedicineReminders />} />
      <Route path="/patient-prescriptions" element={<Prescriptions />} />

    </Routes>
  );
}

export default App;
