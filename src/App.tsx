import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();

  const RequireAuth = ({
    children,
    role,
  }: {
    children: React.ReactNode;
    role: "patient" | "doctor";
  }) => {
    if (!auth?.user || auth.user.role !== role) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/patient-dashboard"
        element={
          <RequireAuth role="patient">
            <PatientDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/doctor-dashboard"
        element={
          <RequireAuth role="doctor">
            <DoctorDashboard />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
