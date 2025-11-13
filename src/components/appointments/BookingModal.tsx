import { useState } from "react";
import type { Doctor } from "../../utils/doctorStorage";
import { saveAppointment, isSlotBooked } from "../../utils/appointmentStorage";

interface Props {
  doctor: Doctor;
  onClose: () => void;
}

export default function BookingModal({ doctor, onClose }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const patientEmail =
    localStorage.getItem("currentUserEmail") || "patient@demo.com";

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    if (isSlotBooked(doctor.id, date, time)) {
      alert("This time slot is already booked!");
      return;
    }

    saveAppointment({
      id: crypto.randomUUID(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientEmail,
      date,
      time,
      status: "booked",
    });

    alert(`Appointment booked with ${doctor.name} on ${date} at ${time}`);
    onClose();
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 border border-green-100 relative">
        {/* Header */}
        <h3 className="text-2xl font-semibold text-green-700 text-center mb-6">
          Book Appointment
        </h3>

        <div className="bg-green-50 rounded-lg p-4 mb-5 text-center">
          <p className="text-gray-700 font-medium">
            <span className="text-green-700 font-semibold">{doctor.name}</span>
          </p>
          <p className="text-sm text-gray-600">
            {doctor.specialization}
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <label className="text-gray-700 font-medium">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <label className="text-gray-700 font-medium">Select Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">-- Choose Time --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
            >
              Confirm Booking
            </button>
          </div>
        </div>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
