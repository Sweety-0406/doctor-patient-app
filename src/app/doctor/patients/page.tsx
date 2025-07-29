"use client";
import { useDoctorAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Appointment } from "@/app/types";
import { getMyPatientByDoctor } from "@/lib/api";



export default function PatientListPage() {
  const { doctor, loading } = useDoctorAuth();
  const [patients, setPatients] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !doctor) {
      router.push("/doctor/login");
    }
  }, [loading, doctor]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (doctor) {
        try {
          const res = await getMyPatientByDoctor(doctor.id);
          const data: Appointment[] = await res.json();
          setPatients(data);
        } catch (error) {
          console.error("Failed to fetch patients:", error);
        }
      }
    };

    fetchPatients();
  }, [doctor]);


  const uniquePatients = Array.from(
    new Map(patients.map((p) => [p.id, p])).values()
  );

  return (
    <div className=" max-h-screen  ">
        <div className="p-6 h-full min-h-screen overflow-y-scroll overflow-x-auto">
            <h1 className="text-2xl font-bold mb-6">My Patients</h1>
            <div className="bg-white rounded-lg shadow  overflow-x-auto">
                <table className="w-full table-auto text-left">
                    <thead>
                    <tr className="bg-teal-400 text-left text-sm text-gray-600 uppercase">
                        <th className="p-3">Name</th>
                        <th className="p-3">Gender</th>
                        <th className="p-3">Age</th>
                        <th className="p-3">Diagnosis</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Address</th>
                        <th className="p-3">Blood</th>
                        <th className="p-3">Triage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {uniquePatients.map((p, idx) => (
                        <tr key={idx} className="border-t text-sm bg-teal-50 text-gray-700">
                        <td className="p-3 flex items-center gap-2">
                            <Image
                            src={`/images/patient.png`}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                            />
                            {p.patient}
                        </td>
                        <td className="p-3">{p.gender}</td>
                        <td className="p-3">{p.age} yo</td>
                        <td className="p-3">{p.diagnosis}</td>
                        <td className="p-3">{p.phone}</td>
                        <td className="p-3">{p.address}</td>
                        <td className="p-3">{p.blood}</td>
                        <td className="p-3">
                            <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                                p.triage === "Emergency"
                                ? "bg-red-100 text-red-600"
                                : p.triage === "Urgent"
                                ? "bg-orange-100 text-orange-600"
                                : p.triage === "Resuscitation"
                                ? "bg-blue-100 text-blue-600"
                                : p.triage === "Pass Away"
                                ? "bg-gray-200 text-gray-600"
                                : "bg-green-100 text-green-600"
                            }`}
                            >
                            {p.triage}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
