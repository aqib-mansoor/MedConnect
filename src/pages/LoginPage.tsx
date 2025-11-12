import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FaUserMd, FaUser } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "patient" | "doctor") => {
    login({
      name: role === "patient" ? "Patient User" : "Doctor User",
      role,
    });
    navigate(role === "patient" ? "/patient-dashboard" : "/doctor-dashboard");
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center px-4">
      <div className="relative bg-white shadow-2xl rounded-2xl p-12 w-full max-w-md text-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-60px] right-[-40px] w-56 h-56 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <h1 className="text-4xl font-extrabold mb-3 text-blue-600 tracking-tight">
          MedConnect
        </h1>
        <p className="mb-10 text-gray-500 text-sm sm:text-base">
          Select your role to login and start managing your healthcare journey.
        </p>

        <div className="flex flex-col gap-5">
          <Button
            onClick={() => handleLogin("patient")}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <FaUser className="text-lg" />
            Login as Patient
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleLogin("doctor")}
            className="flex items-center justify-center gap-3 bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <FaUserMd className="text-lg text-blue-600" />
            Login as Doctor
          </Button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          &copy; 2025 MedConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
}
