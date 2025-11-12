import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/auth";
import InputField from "../../components/auth/InputField";
import Button from "../../components/auth/Button";
import FormContainer from "../../components/auth/FormContainer";
import { v4 as uuidv4 } from "uuid";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [bloodGroup, setBloodGroup] = useState(""); // Patient field
  const [allergies, setAllergies] = useState(""); // Patient field
  const [specialization, setSpecialization] = useState(""); // Doctor field
  const [credentials, setCredentials] = useState(""); // Doctor field
  const [error, setError] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const allergyOptions = ["None", "Peanuts", "Dairy", "Gluten", "Seafood", "Pollen"];
  const specializationOptions = ["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist", "General Physician"];
  const credentialsOptions = ["MBBS", "MD", "DO", "PhD"];

  const handleRegister = () => {
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      password,
      role,
      allergies: role === "patient" ? allergies : "",
      bloodGroup: role === "patient" ? bloodGroup : "",
      specialization: role === "doctor" ? specialization : "",
      credentials: role === "doctor" ? credentials : "",
    };

    if (register(newUser)) {
      navigate("/login");
    } else {
      setError("User already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <FormContainer>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">MedConnect</h1>
          <p className="text-green-600 mt-2">Register as Patient or Doctor</p>
        </div>

        {error && <p className="text-red-500 mb-3 text-center font-medium">{error}</p>}

        <InputField label="Full Name" value={name} onChange={setName} />
        <InputField label="Email" value={email} onChange={setEmail} />
        <InputField label="Password" type="password" value={password} onChange={setPassword} />

        <div className="flex justify-between mb-4 mt-2">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={role === "patient"}
              onChange={() => setRole("patient")}
              className="accent-green-500"
            />
            Patient
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={role === "doctor"}
              onChange={() => setRole("doctor")}
              className="accent-green-500"
            />
            Doctor
          </label>
        </div>

        {/* Patient additional fields */}
        {role === "patient" && (
          <>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Medical Allergies</label>
              <select
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Allergy</option>
                {allergyOptions.map((al) => (
                  <option key={al} value={al}>{al}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Doctor additional fields */}
        {role === "doctor" && (
          <>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Specialization</option>
                {specializationOptions.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1 font-medium">Professional Credentials</label>
              <select
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Credentials</option>
                {credentialsOptions.map((cred) => (
                  <option key={cred} value={cred}>{cred}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <Button text="Register" onClick={handleRegister} />

        <p className="mt-4 text-green-700 text-sm text-center">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-green-900"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </FormContainer>
    </div>
  );
}
