import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaEnvelope, FaLock } from "react-icons/fa";
import InputField from "../../components/auth/InputField";
import Button from "../../components/auth/Button";
import FormContainer from "../../components/auth/FormContainer";

interface Credential {
  email: string;
  password: string;
  role: "patient" | "doctor";
}

// Predefined credentials
const predefinedUsers: Credential[] = [
  { email: "patient@example.com", password: "123", role: "patient" },
  { email: "doctor@example.com", password: "123", role: "doctor" },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = predefinedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate(user.role === "patient" ? "/patient-dashboard" : "/doctor-dashboard");
    } else {
      setError("Invalid credentials. Please check email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-100 px-4">
      <FormContainer>
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4 shadow-md">
            <FaUserMd className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-green-700 mb-1">MedConnect</h1>
          <p className="text-green-600 text-sm text-center">
            Login to access your dashboard and manage appointments
          </p>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center">
            {error}
          </p>
        )}

        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          <InputField label="Email" value={email} onChange={setEmail} className="pl-10" />
        </div>

        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            className="pl-10"
          />
        </div>

        <Button
          text="Login"
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
        />

        <p className="text-center mt-4 text-sm text-green-700">
          Don't have an account?{" "}
          <span
            className="font-medium cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </FormContainer>
    </div>
  );
}
