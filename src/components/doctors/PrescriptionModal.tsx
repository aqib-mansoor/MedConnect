import { useState } from "react";
import type { Appointment } from "../../utils/appointmentStorage";
import { savePrescription } from "../../utils/prescriptionStorage";

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

export default function PrescriptionModal({ patient, onClose, onComplete }: Props) {
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "", time: "" }]);
  const doctorName = localStorage.getItem("currentUserName") || "Dr. Demo";

  const handleAddMedicine = () =>
    setMedicines([...medicines, { name: "", dosage: "", duration: "", time: "" }]);

  const handleChange = (index: number, field: string, value: string) => {
    const newMeds = [...medicines];
    newMeds[index][field as keyof typeof newMeds[0]] = value;
    if (field === "name") newMeds[index].dosage = "";
    setMedicines(newMeds);
  };

  const handleSave = () => {
    if (medicines.some((m) => !m.name || !m.dosage || !m.duration || !m.time)) {
      alert("Please fill all fields for each medicine.");
      return;
    }

    savePrescription({
      id: crypto.randomUUID(),
      appointmentId: patient.id, // link to appointment
      doctorName,
      patientEmail: patient.patientEmail,
      medicines,
      date: new Date().toISOString().split("T")[0],
    });


    onComplete(patient.id);
    alert("Prescription saved and appointment marked as completed!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Write Prescription for {patient.patientName}
        </h2>

        <div className="flex flex-col gap-4">
          {medicines.map((m, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-3 items-center">
              {/* Medicine Name */}
              <select
                value={m.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="flex-1 p-2 border rounded bg-white"
              >
                <option value="">Select Medicine</option>
                {MEDICINES.map((med) => (
                  <option key={med.name} value={med.name}>
                    {med.name}
                  </option>
                ))}
              </select>

              {/* Dosage */}
              <select
                value={m.dosage}
                onChange={(e) => handleChange(i, "dosage", e.target.value)}
                className="flex-1 p-2 border rounded bg-white"
                disabled={!m.name}
              >
                <option value="">Select Dosage</option>
                {MEDICINES.find((med) => med.name === m.name)?.dosages.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Duration */}
              <input
                type="text"
                placeholder="Duration (e.g., 5 days)"
                value={m.duration}
                onChange={(e) => handleChange(i, "duration", e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Time (e.g., 2 times )"
                value={m.time}
                onChange={(e) => handleChange(i, "time", e.target.value)}
                className="flex-1 p-2 border rounded"
              />
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
