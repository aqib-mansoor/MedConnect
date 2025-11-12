import { v4 as uuidv4 } from "uuid";

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

// Save to LocalStorage if not exists
export const initDoctors = () => {
  const doctors = localStorage.getItem("doctors");
  if (!doctors) {
    localStorage.setItem("doctors", JSON.stringify(defaultDoctors));
  }
};

export const getDoctors = (): Doctor[] => {
  const data = localStorage.getItem("doctors");
  return data ? JSON.parse(data) : [];
};
