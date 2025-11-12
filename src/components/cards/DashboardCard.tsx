import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  extra?: ReactNode; // optional extra info
}

export default function DashboardCard({
  title,
  value,
  icon,
  color = "green",
  extra,
}: DashboardCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Gradient Accent Circle */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-br from-${color}-400 to-${color}-600 opacity-20 transition-all duration-500 group-hover:opacity-30`}
      ></div>

      {/* Card Content */}
      <div className="p-6 relative z-10 flex flex-col justify-between h-full">
        {/* Icon */}
        {icon && (
          <div
            className={`text-4xl mb-3 text-${color}-600 bg-${color}-100 w-12 h-12 flex items-center justify-center rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
        )}

        {/* Title & Value */}
        <div>
          <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-1">
            {title}
          </h3>
          <p className="text-3xl font-extrabold text-gray-800">{value}</p>
          {extra && <div className="mt-2 text-sm">{extra}</div>}
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-400 to-${color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        ></div>
      </div>
    </div>
  );
}
