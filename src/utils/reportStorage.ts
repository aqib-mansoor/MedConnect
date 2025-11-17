export interface MedicalReport {
  id: string;
  doctorName: string;
  patientEmail: string;
  fileName: string;
  fileData: string; // Base64 string
  date: string;
}

// Save report to LocalStorage
export const saveReport = (report: MedicalReport) => {
  const data = localStorage.getItem("medicalReports");
  const reports: MedicalReport[] = data ? JSON.parse(data) : [];
  reports.push(report);
  localStorage.setItem("medicalReports", JSON.stringify(reports));
};

// Get reports for a patient
export const getReportsByPatient = (patientEmail: string): MedicalReport[] => {
  const data = localStorage.getItem("medicalReports");
  const reports: MedicalReport[] = data ? JSON.parse(data) : [];
  return reports.filter(r => r.patientEmail === patientEmail);
};

// Get reports uploaded by a doctor
export const getReportsByDoctor = (doctorName: string): MedicalReport[] => {
  const data = localStorage.getItem("medicalReports");
  const reports: MedicalReport[] = data ? JSON.parse(data) : [];
  return reports.filter(r => r.doctorName === doctorName);
};
