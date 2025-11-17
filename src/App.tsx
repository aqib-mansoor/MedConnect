import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSearchPage from "./pages/patient/DoctorSearchPage";
import MyAppointments from "./pages/patient/MyAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  return (
    <Routes>
      {/* 👇 FIX HERE — Add home redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/patient-doctors" element={<DoctorSearchPage />} />
      <Route path="/patient-appointments" element={<MyAppointments />} />
      <Route path="/doctor-appointments" element={<DoctorAppointments />} />
    </Routes>
  );
}

export default App;
