import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getPrescriptionsByPatient } from "../../utils/prescriptionStorage";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function MedicineReminders() {
  const patientEmail =
    localStorage.getItem("currentUserEmail") || "patient@demo.com";

  const [appointmentId, setAppointmentId] = useState<string>(""); // Selected appointment
  const [appointments, setAppointments] = useState<any[]>([]); // Appointments list
  const [todayMedicines, setTodayMedicines] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]); // Prescriptions for selected appointment

  const mealTimes: Record<string, string> = {
    Breakfast: "09:00",
    Lunch: "14:00",
    Dinner: "20:00",
  };

  const categorizeMedicine = (med: any) => {
    const times = parseInt(med.timesPerDay); // convert string to number
    if (times === 3) return ["Breakfast", "Lunch", "Dinner"];
    if (times === 2) return ["Breakfast", "Dinner"];
    if (times === 1) return ["Breakfast"];
    return ["Breakfast"];
  };

  useEffect(() => {
    const allPrescriptions = getPrescriptionsByPatient(patientEmail);
    const uniqueAppointments = Array.from(
      new Set(allPrescriptions.map((p) => p.appointmentId))
    ).map((id) => {
      const pres = allPrescriptions.find((p) => p.appointmentId === id);
      return {
        id,
        doctorName: pres?.doctorName || "Unknown",
      };
    });
    setAppointments(uniqueAppointments);
    if (uniqueAppointments.length > 0 && !appointmentId) {
      setAppointmentId(uniqueAppointments[0].id);
    }
  }, []);

  useEffect(() => {
    if (!appointmentId) return;

    const selectedPrescriptions = getPrescriptionsByPatient(patientEmail).filter(
      (p) => p.appointmentId === appointmentId
    );
    setPrescriptions(selectedPrescriptions);

    const medsForToday: any[] = [];

    selectedPrescriptions.forEach((pres) => {
      pres.medicines.forEach((med: any) => {
        const slots = categorizeMedicine(med);
        slots.forEach((slot) => {
          // Unique ID per medicine slot
          medsForToday.push({
            id: crypto.randomUUID(),
            doctor: pres.doctorName,
            name: med.name,
            dosage: med.dosage,
            duration: med.duration,
            when: slot,
            time: mealTimes[slot],
          });
        });
      });
    });

    setTodayMedicines(medsForToday);
  }, [appointmentId]);

  const handleDeleteMedicine = (medId: string) => {
    toast(
      ({ closeToast }: any) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this medicine?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                const updated = todayMedicines.filter((m) => m.id !== medId);
                setTodayMedicines(updated);
                toast.dismiss();
                toast.success(" Medicine deleted!", { theme: "colored" });
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => toast.dismiss()}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const breakfast = todayMedicines.filter((m) => m.when === "Breakfast");
  const lunch = todayMedicines.filter((m) => m.when === "Lunch");
  const dinner = todayMedicines.filter((m) => m.when === "Dinner");

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6 text-green-600">
        Today’s Medicine Schedule
      </h2>

      {appointments.length > 0 && (
        <div className="mb-6">
          <label className="font-semibold text-green-700 mr-2">Select Appointment:</label>
          <select
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {appointments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.doctorName} 
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakfast */}
        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍳 Breakfast</h3>
          {breakfast.length === 0 ? (
            <p className="text-gray-500">No morning medicines.</p>
          ) : (
            breakfast.map((m) => (
              <div key={m.id} className="p-3 bg-white rounded shadow-sm border border-green-200 mb-3 flex justify-between items-start">
                <div>
                  <p><strong>{m.name}</strong> ({m.dosage})</p>
                  <p className="text-sm text-gray-600">Time: {m.time}</p>
                  <p className="text-xs text-green-700">Prescribed by: {m.doctor}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteMedicine(m.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Lunch */}
        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍽 Lunch</h3>
          {lunch.length === 0 ? (
            <p className="text-gray-500">No noon medicines.</p>
          ) : (
            lunch.map((m) => (
              <div key={m.id} className="p-3 bg-white rounded shadow-sm border border-green-200 mb-3 flex justify-between items-start">
                <div>
                  <p><strong>{m.name}</strong> ({m.dosage})</p>
                  <p className="text-sm text-gray-600">Time: {m.time}</p>
                  <p className="text-xs text-green-700">Prescribed by: {m.doctor}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteMedicine(m.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Dinner */}
        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍛 Dinner</h3>
          {dinner.length === 0 ? (
            <p className="text-gray-500">No evening medicines.</p>
          ) : (
            dinner.map((m) => (
              <div key={m.id} className="p-3 bg-white rounded shadow-sm border border-green-200 mb-3 flex justify-between items-start">
                <div>
                  <p><strong>{m.name}</strong> ({m.dosage})</p>
                  <p className="text-sm text-gray-600">Time: {m.time}</p>
                  <p className="text-xs text-green-700">Prescribed by: {m.doctor}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteMedicine(m.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
