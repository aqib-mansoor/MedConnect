// MedConnect/src/utils/doctorStorage.ts
import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/auth";
import { getUsers, saveUser } from "./storage"; // user helpers

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number; // in years
  email: string;
  role: "doctor";
}

// Predefined doctors
const defaultDoctors: Doctor[] = [
  { id: uuidv4(), name: "Dr. Ayesha Khan", specialization: "Cardiologist", experience: 10, email: "ayesha@hospital.com", role: "doctor" },
  { id: uuidv4(), name: "Dr. Ali Raza", specialization: "Dermatologist", experience: 7, email: "ali@hospital.com", role: "doctor" },
  { id: uuidv4(), name: "Dr. Sara Ahmed", specialization: "Neurologist", experience: 12, email: "sara@hospital.com", role: "doctor" },
  { id: uuidv4(), name: "Dr. Bilal Shah", specialization: "Pediatrician", experience: 8, email: "bilal@hospital.com", role: "doctor" },
  { id: uuidv4(), name: "Dr. Hina Malik", specialization: "Gynecologist", experience: 9, email: "hina@hospital.com", role: "doctor" },
];

export const initDoctors = () => {
  // init doctors list
  const doctors = localStorage.getItem("doctors");
  if (!doctors) {
    localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
  }

  // ensure there's a corresponding user account for each doctor
  // default password (for demo) — change if you prefer
  const DEFAULT_PASSWORD = "password123";

  const existingUsers = getUsers(); // from storage.ts
  defaultDoctors.forEach((doc) => {
    // check by email
    const exists = existingUsers.some(u => u.email === doc.email);
    if (!exists) {
      const user: User = {
        id: doc.id,             // use same id for convenience
        name: doc.name,
        email: doc.email,
        password: DEFAULT_PASSWORD,
        role: "doctor",
      };
      saveUser(user);
    }
  });
};
export const getDoctors = (): Doctor[] => {
  try {
    const data = localStorage.getItem("doctors");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

