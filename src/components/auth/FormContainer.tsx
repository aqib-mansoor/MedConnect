import type { ReactNode } from "react";

export default function FormContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
}
