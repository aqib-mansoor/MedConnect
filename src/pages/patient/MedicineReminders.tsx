import { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import { getPrescriptionsByPatient } from "../../utils/prescriptionStorage";
import { toast } from "react-toastify";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

export default function MedicineReminders() {
  const patientEmail =
    localStorage.getItem("currentUserEmail") || "patient@demo.com";

  const [appointmentId, setAppointmentId] = useState<string>("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [todayMedicines, setTodayMedicines] = useState<any[]>([]);
  const [nextMedicine, setNextMedicine] = useState<any | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toTimeString().slice(0, 5)
  );

  const scheduledTimeouts = useRef<number[]>([]);

  const mealTimes: Record<string, string> = {
    Breakfast: "09:00",
    Lunch: "14:00",
    Dinner: "20:00",
  };

  const categorizeMedicine = (med: any) => {
    const times = parseInt(med.timesPerDay);
    if (times === 3) return ["Breakfast", "Lunch", "Dinner"];
    if (times === 2) return ["Breakfast", "Dinner"];
    if (times === 1) return ["Breakfast"];
    return ["Breakfast"];
  };

  // Generate stable ID for each medicine
  const generateMedicineId = (prescriptionId: string, medName: string, slot: string) => {
    return `${prescriptionId}-${medName}-${slot}`;
  };

  const loadTakenStatus = (medId: string) => {
    const stored = localStorage.getItem("takenMedicines");
    if (!stored) return false;
    const takenList: string[] = JSON.parse(stored);
    return takenList.includes(medId);
  };

  const saveTakenStatus = (medId: string) => {
    const stored = localStorage.getItem("takenMedicines");
    let takenList: string[] = stored ? JSON.parse(stored) : [];
    if (!takenList.includes(medId)) {
      takenList.push(medId);
    }
    localStorage.setItem("takenMedicines", JSON.stringify(takenList));
  };

  const loadDeletedMedicines = () => {
    const stored = localStorage.getItem("deletedMedicines");
    if (!stored) return [];
    return JSON.parse(stored);
  };

  const saveDeletedMedicine = (medId: string) => {
    const deleted = loadDeletedMedicines();
    if (!deleted.includes(medId)) {
      deleted.push(medId);
      localStorage.setItem("deletedMedicines", JSON.stringify(deleted));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().slice(0, 5));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Load appointments
  useEffect(() => {
    const allPrescriptions = getPrescriptionsByPatient(patientEmail);
    const uniqueAppointments = Array.from(
      new Set(allPrescriptions.map((p) => p.appointmentId))
    ).map((id) => {
      const pres = allPrescriptions.find((p) => p.appointmentId === id);
      return { id, doctorName: pres?.doctorName || "Unknown" };
    });
    setAppointments(uniqueAppointments);
    if (uniqueAppointments.length > 0 && !appointmentId) {
      setAppointmentId(uniqueAppointments[0].id || "");
    }

  }, []);

  // Load medicines for today
  useEffect(() => {
    if (!appointmentId) return;

    scheduledTimeouts.current.forEach((t) => clearTimeout(t));
    scheduledTimeouts.current = [];

    const selectedPrescriptions = getPrescriptionsByPatient(patientEmail).filter(
      (p) => p.appointmentId === appointmentId
    );

    const deletedMedicines = loadDeletedMedicines();

    const medsForToday: any[] = [];

    selectedPrescriptions.forEach((pres) => {
      pres.medicines.forEach((med: any) => {
        const slots = categorizeMedicine(med);
        slots.forEach((slot) => {
          const medId = generateMedicineId(pres.id, med.name, slot);

          if (deletedMedicines.includes(medId)) return;

          const medObj = {
            id: medId,
            doctor: pres.doctorName,
            name: med.name,
            dosage: med.dosage,
            duration: med.duration,
            when: slot,
            time: mealTimes[slot],
            taken: loadTakenStatus(medId),
          };

          medsForToday.push(medObj);

          scheduleNotification(medObj);
        });
      });
    });

    setTodayMedicines(medsForToday);
  }, [appointmentId]);

  const scheduleNotification = (med: any) => {
    const [hours, minutes] = med.time.split(":").map(Number);
    const now = new Date();
    const medTime = new Date();
    medTime.setHours(hours, minutes, 0, 0);
    const delay = medTime.getTime() - now.getTime();
    if (delay < 0) return;

    const timeoutId = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification(`Medicine Reminder: ${med.name}`, {
          body: `Dosage: ${med.dosage} - Prescribed by: ${med.doctor}`,
        });
      }
    }, delay);

    scheduledTimeouts.current.push(timeoutId);
  };

  const handleDeleteMedicine = (medId: string) => {
    toast(
      ({ }: any) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this medicine?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                setTodayMedicines(prev => prev.filter(m => m.id !== medId));
                saveDeletedMedicine(medId);
                toast.dismiss();
                toast.success("Medicine deleted!", { theme: "colored" });
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

  const handleMarkTaken = (medId: string) => {
    setTodayMedicines((prev) =>
      prev.map((m) => (m.id === medId ? { ...m, taken: true } : m))
    );
    saveTakenStatus(medId);
    toast.success("Medicine marked as taken!", { theme: "colored" });
  };

  useEffect(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let next: any = null;
    let minDiff = Infinity;

    todayMedicines.forEach((med) => {
      const [hours, minutes] = med.time.split(":").map(Number);
      const medMinutes = hours * 60 + minutes;
      const diff = medMinutes - currentMinutes;

      if (!med.taken && diff >= 0 && diff < minDiff) {
        minDiff = diff;
        next = med;
      }
    });

    setNextMedicine(next);
  }, [todayMedicines, currentTime]);

  const breakfast = todayMedicines.filter((m) => m.when === "Breakfast");
  const lunch = todayMedicines.filter((m) => m.when === "Lunch");
  const dinner = todayMedicines.filter((m) => m.when === "Dinner");

  const renderMedicineCard = (m: any) => {
    const isCurrent = m.time === currentTime && !m.taken;
    return (
      <div
        key={m.id}
        className={`p-3 rounded shadow-sm border mb-3 flex justify-between items-start
          ${isCurrent ? "border-2 border-red-500 bg-red-50" : "border-green-200 bg-white"}
          ${m.taken ? "bg-gray-100 text-gray-400 line-through" : ""}`}
      >
        <div>
          <p><strong>{m.name}</strong> ({m.dosage})</p>
          <p className="text-sm text-gray-600">Time: {m.time}</p>
          <p className="text-xs text-green-700">Prescribed by: {m.doctor}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          {!m.taken && (
            <button
              className="text-green-600 hover:text-green-800"
              onClick={() => handleMarkTaken(m.id)}
              title="Mark as Taken"
            >
              <FaCheckCircle />
            </button>
          )}
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDeleteMedicine(m.id)}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

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

      {nextMedicine && !nextMedicine.taken && (
        <div className="p-4 bg-green-100 border border-green-300 rounded mb-6 shadow">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Next Medicine</h3>
          <p>
            <strong>{nextMedicine.name}</strong> ({nextMedicine.dosage}) at {nextMedicine.time} - Prescribed by {nextMedicine.doctor} ({nextMedicine.when})
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍳 Breakfast</h3>
          {breakfast.length === 0
            ? <p className="text-gray-500">No morning medicines.</p>
            : breakfast.map(renderMedicineCard)
          }
        </div>

        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍽 Lunch</h3>
          {lunch.length === 0
            ? <p className="text-gray-500">No noon medicines.</p>
            : lunch.map(renderMedicineCard)
          }
        </div>

        <div className="p-4 bg-green-50 rounded-xl shadow border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-3">🍛 Dinner</h3>
          {dinner.length === 0
            ? <p className="text-gray-500">No evening medicines.</p>
            : dinner.map(renderMedicineCard)
          }
        </div>
      </div>
    </Layout>
  );
}
