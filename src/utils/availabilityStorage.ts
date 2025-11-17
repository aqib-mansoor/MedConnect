export interface Availability {
  doctorName: string;
  day: string; // e.g., "2025-11-15"
  startTime: string;
  endTime: string;
}

// Save doctor availability
export const saveAvailability = (availability: Availability) => {
  const data = localStorage.getItem("doctorAvailability");
  const availabilities: Availability[] = data ? JSON.parse(data) : [];
  availabilities.push(availability);
  localStorage.setItem("doctorAvailability", JSON.stringify(availabilities));
};

// Get availability for a doctor
export const getAvailability = (doctorName: string): Availability[] => {
  const data = localStorage.getItem("doctorAvailability");
  const availabilities: Availability[] = data ? JSON.parse(data) : [];
  return availabilities.filter(a => a.doctorName === doctorName);
};

// Check if a date/time is within availability
export const isWithinAvailability = (doctorName: string, date: string, time: string): boolean => {
  const availabilities = getAvailability(doctorName).filter(a => a.day === date);
  if (availabilities.length === 0) return false;

  for (let a of availabilities) {
    if (time >= a.startTime && time <= a.endTime) return true;
  }
  return false;
};
