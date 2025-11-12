import type { Doctor } from "../../utils/doctorStorage";
import { FaUserMd, FaBriefcase, FaCalendarAlt, FaStar, FaClock } from "react-icons/fa";

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Gradient accent top-right */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-green-400 rounded-bl-full opacity-30"></div>

      {/* Doctor Avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-100 text-green-700 p-4 rounded-full text-3xl flex items-center justify-center">
          <FaUserMd />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
        </div>
      </div>

      {/* Info Badges */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FaBriefcase />
          <span>{doctor.experience} yrs</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <FaStar />
          <span>4.{Math.floor(Math.random() * 10)} / 5</span>
        </div>
      </div>

      {/* Availability Badge */}
      <div className="flex items-center gap-2 mb-4">
        <FaClock className="text-green-600" />
        <span className="text-green-700 text-sm font-semibold">Available Today</span>
      </div>

      {/* Book button */}
      <button
        onClick={() => onBook(doctor)}
        className="mt-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-xl w-full transition-all shadow-md hover:shadow-lg"
      >
        Book Appointment
      </button>
    </div>
  );
}
