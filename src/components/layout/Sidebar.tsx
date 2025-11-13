import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaFileMedical,
  FaUsers,
  FaBars,
  FaTimes,
  FaUserMd,
} from "react-icons/fa";

interface SidebarProps {
  role: "patient" | "doctor";
}

export default function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle for mobile

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded-md transition-all ${
      isActive ? "bg-green-700" : "hover:bg-green-600"
    }`;

  // Patient Menu
  const patientMenu = [
    { name: "Dashboard", path: "/patient-dashboard", icon: <FaTachometerAlt /> },
    { name: "Find Doctors", path: "/patient-doctors", icon: <FaUserMd /> },
    { name: "My Appointments", path: "/patient-appointments", icon: <FaCalendarCheck /> },
    { name: "Medical Records", path: "/patient-medical-records", icon: <FaFileMedical /> },
  ];

  // Doctor Menu
  const doctorMenu = [
    { name: "Dashboard", path: "/doctor-dashboard", icon: <FaTachometerAlt /> },
    { name: "Patients", path: "/doctor-patients", icon: <FaUsers /> },
    { name: "Appointments", path: "/doctor-appointments", icon: <FaCalendarCheck /> },
  ];

  const menuItems = role === "patient" ? patientMenu : doctorMenu;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-green-800 text-white w-64 min-h-screen p-5 flex flex-col gap-4 fixed md:relative top-0 left-0 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 text-center border-b border-green-700 pb-3">
          {role === "patient" ? "Patient Menu" : "Doctor Menu"}
        </h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path} className={getLinkClass}>
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
