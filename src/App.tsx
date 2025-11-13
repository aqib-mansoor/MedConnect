import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSearchPage from "./pages/patient/DoctorSearchPage";
import MyAppointments from "./pages/patient/MyAppointments";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/patient-doctors" element={<DoctorSearchPage />} />
      <Route path="/patient-appointments" element={<MyAppointments />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
