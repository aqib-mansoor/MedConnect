import { useState } from "react";
import type { Appointment } from "../../utils/appointmentStorage";
import { savePrescription } from "../../utils/prescriptionStorage";
import { toast } from "react-toastify";

const MEDICINES = [
  { name: "Paracetamol", dosages: ["500mg", "650mg", "1g"] },
  { name: "Amoxicillin", dosages: ["250mg", "500mg"] },
  { name: "Ibuprofen", dosages: ["200mg", "400mg", "600mg"] },
  { name: "Metformin", dosages: ["500mg", "850mg", "1g"] },
];

interface Props {
  patient: Appointment;
  onClose: () => void;
  onComplete: (id: string) => void;
}

interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  time: string;
  timesPerDay: number;
}

export default function PrescriptionModal({ patient, onClose, onComplete }: Props) {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "", dosage: "", duration: "1", time: "", timesPerDay: 1 },
  ]);

  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  const handleAddMedicine = () =>
    setMedicines([
      ...medicines,
      { name: "", dosage: "", duration: "1", time: "", timesPerDay: 1 },
    ]);

  const handleChange = (index: number, field: keyof Medicine, value: string) => {
    const newMeds = [...medicines];
    if (field === "name") {
      const [medName, medDosage] = value.split(" | ");
      newMeds[index].name = medName || "";
      newMeds[index].dosage = medDosage || "";
    } else if (field === "timesPerDay") {
      newMeds[index].timesPerDay = Number(value); // convert string to number
    } else {
      newMeds[index][field] = value;
    }
    setMedicines(newMeds);
  };

  const handleSave = () => {
    if (medicines.some((m) => !m.name || !m.dosage || !m.duration || !m.timesPerDay)) {
      toast.error("Please fill all fields for each medicine!", { theme: "colored" });
      return;
    }

    savePrescription({
      id: crypto.randomUUID(),
      appointmentId: patient.id,
      doctorName,
      patientEmail: patient.patientEmail,
      medicines,
      date: new Date().toISOString().split("T")[0],
    });

    toast.success("✅ Prescription saved and appointment marked as completed!", { theme: "colored" });
    onComplete(patient.id);
    onClose();
  };

  const durationOptions = Array.from({ length: 7 }, (_, i) => i + 1);
  const timesOptions = [
    { value: "1", label: "1 time/day (Breakfast or Dinner)" },
    { value: "2", label: "2 times/day (Breakfast + Dinner)" },
    { value: "3", label: "3 times/day (Breakfast + Lunch + Dinner)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Write Prescription for {patient.patientName}
        </h2>

        <div className="flex flex-col gap-4">
          {medicines.map((m, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-3 items-center">
              {/* Medicine + Dosage */}
              <select
                value={m.name ? `${m.name} | ${m.dosage}` : ""}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="flex-1 p-2 border rounded bg-white"
              >
                <option value="">Select Medicine & Dosage</option>
                {MEDICINES.flatMap((med) =>
                  med.dosages.map((d) => (
                    <option key={`${med.name}-${d}`} value={`${med.name} | ${d}`}>
                      {med.name} ({d})
                    </option>
                  ))
                )}
              </select>

              {/* Duration */}
              <select
                value={m.duration}
                onChange={(e) => handleChange(i, "duration", e.target.value)}
                className="flex-1 p-2 border rounded bg-white"
              >
                {durationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d} day{d > 1 ? "s" : ""}
                  </option>
                ))}
              </select>

              {/* Times per day */}
              <select
                value={m.timesPerDay}
                onChange={(e) => handleChange(i, "timesPerDay", e.target.value)}
                className="flex-1 p-2 border rounded bg-white"
              >
                {timesOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6">
          <button
            onClick={handleAddMedicine}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            + Add Medicine
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
