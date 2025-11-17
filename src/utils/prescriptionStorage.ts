export interface Prescription {
  id: string;
  appointmentId: string; // NEW: link to appointment
  doctorName: string;
  patientEmail: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  date: string;
}

export const savePrescription = (prescription: Prescription) => {
  const existing = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  existing.push(prescription);
  localStorage.setItem("prescriptions", JSON.stringify(existing));
};

export const getPrescriptionsByAppointment = (appointmentId: string): Prescription[] => {
  const data = localStorage.getItem("prescriptions");
  const prescriptions: Prescription[] = data ? JSON.parse(data) : [];
  return prescriptions.filter(p => p.appointmentId === appointmentId);
};

// Get prescriptions for a patient
export const getPrescriptionsByPatient = (patientEmail: string): Prescription[] => {
  const data = localStorage.getItem("prescriptions");
  const prescriptions: Prescription[] = data ? JSON.parse(data) : [];
  return prescriptions.filter((p) => p.patientEmail === patientEmail);
};

// Get prescriptions for a doctor
export const getPrescriptionsByDoctor = (doctorName: string): Prescription[] => {
  const data = localStorage.getItem("prescriptions");
  const prescriptions: Prescription[] = data ? JSON.parse(data) : [];
  return prescriptions.filter((p) => p.doctorName === doctorName);
};
