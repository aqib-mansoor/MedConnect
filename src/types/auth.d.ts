//MedConnect\src\types\auth.d.ts
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
}
