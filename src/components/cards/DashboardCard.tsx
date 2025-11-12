import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; 
}

export default function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="bg-green-50 shadow-md p-5 rounded-md flex items-center gap-4 hover:shadow-lg transition">
      {icon && <div className="text-3xl text-green-600">{icon}</div>}
      <div>
        <h3 className="text-green-700 font-medium">{title}</h3>
        <p className="text-2xl font-bold text-green-800">{value}</p>
      </div>
    </div>
  );
}
