import type { Doctor } from "./doctorStorage";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: "booked" | "completed" | "cancelled";
}

// Save appointment to localStorage
export const saveAppointment = (appointment: Appointment) => {
  const data = localStorage.getItem("appointments");
  const appointments: Appointment[] = data ? JSON.parse(data) : [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));
};

// Get all appointments
export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem("appointments");
  return data ? JSON.parse(data) : [];
};

// Check if doctor has a booked slot at same time/date
export const isSlotBooked = (doctorId: string, date: string, time: string): boolean => {
  const appointments = getAppointments();
  return appointments.some(
    (a) => a.doctorId === doctorId && a.date === date && a.time === time && a.status === "booked"
  );
};
