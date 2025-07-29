"use client";
import { Appointment } from "@/app/types";
import { useDoctorAuth } from "@/context/authContext";
import { getDoctorAppointments, updateAppointmentsByDoctor } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AppointmentsPage() {
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const { doctor, loading } = useDoctorAuth();

    useEffect(() => {
        if (!loading && !doctor) {
        router.push("/doctor/login");
        }
    }, [loading, doctor]);

    const fetchAppointments = async () => {
        if (doctor) {
            const res = await getDoctorAppointments(doctor.id);
            const data = await res.json();
            setAppointments(data);
        }
    };

  useEffect(() => {
    fetchAppointments();
  }, [doctor]);

  const updateStatus = async (id: string, status: string) => {
    await updateAppointmentsByDoctor(id, status)
    fetchAppointments();
  };

  if (loading || !doctor) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="p-6 max-h-screen overflow-y-scroll  bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h1>

      <div className="bg-white rounded-lg shadow  overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-teal-400 text-gray-700">
              <th className="p-3">Patient</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((appt, index) => (
                <tr key={index} className="border-t bg-teal-50">
                  <td className="p-3 font-medium">{appt.patient}</td>
                  <td className="p-3">{appt.gender}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold
                      ${appt.status === "pending" ? "bg-yellow-100 text-yellow-700"
                        : appt.status === "approved" ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {appt.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(appt.id, "approved")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(appt.id, "rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
