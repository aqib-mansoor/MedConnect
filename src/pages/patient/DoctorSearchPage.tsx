import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import DoctorCard from "../../components/doctors/DoctorCard";
import type { Doctor } from "../../utils/doctorStorage";
import { getDoctors } from "../../utils/doctorStorage";
import BookingModal from "../../components/appointments/BookingModal";

export default function DoctorSearchPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    setDoctors(getDoctors());
  }, []);


  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.specialization.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <h2 className="text-3xl font-extrabold mb-8 text-green-600 text-center">Available Doctor's</h2>
      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onBook={setSelectedDoctor} />
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </Layout>
  );
}
