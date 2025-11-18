export interface MedicineReminder {
  id: string;
  patientEmail: string;
  medicineName: string;
  dosage: string;
  time: string; // HH:MM 24-hour format
  date: string; // YYYY-MM-DD
}

// Save a reminder
export const saveReminder = (reminder: MedicineReminder) => {
  const data = localStorage.getItem("medicineReminders");
  const reminders: MedicineReminder[] = data ? JSON.parse(data) : [];
  reminders.push(reminder);
  localStorage.setItem("medicineReminders", JSON.stringify(reminders));
};

// Get reminders for a patient
export const getRemindersByPatient = (patientEmail: string): MedicineReminder[] => {
  const data = localStorage.getItem("medicineReminders");
  const reminders: MedicineReminder[] = data ? JSON.parse(data) : [];
  return reminders.filter(r => r.patientEmail === patientEmail);
};
