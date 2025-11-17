import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { saveAvailability, getAvailability } from "../../utils/availabilityStorage";
import type { Availability } from "../../utils/availabilityStorage";
import { toast } from "react-toastify";

export default function AvailabilityPage() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  useEffect(() => {
    setAvailabilities(getAvailability(doctorName));
  }, [doctorName]);

  const handleSave = () => {
    if (!day || !startTime || !endTime) {
      toast.warning("⚠️ Please fill all fields!");
      return;
    }

    if (startTime >= endTime) {
      toast.warning("⚠️ Start time must be before end time!");
      return;
    }

    const newAvailability: Availability = { doctorName, day, startTime, endTime };
    saveAvailability(newAvailability);
    setAvailabilities(getAvailability(doctorName));

    toast.success(`Availability saved successfully for ${day} (${startTime} - ${endTime})`);

    setDay("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6 text-green-600">Set Availability</h2>

      <div className="p-4 bg-green-50 rounded shadow-md mb-6">
        <input
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="mb-2 p-2 border border-green-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2 mb-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 border border-green-300 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 border border-green-300 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Availability
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-green-700">Your Scheduled Availabilities</h3>
      {availabilities.length === 0 ? (
        <p>No availability set yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availabilities.map((a, i) => (
            <div key={i} className="p-3 bg-green-50 rounded shadow-md border border-green-200">
              <p><strong>Date:</strong> {a.day}</p>
              <p><strong>Time:</strong> {a.startTime} - {a.endTime}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
