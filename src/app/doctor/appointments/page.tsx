"use client";
import { Appointment, AppointmentStatus } from "@/app/types";
import { useDoctorAuth } from "@/context/authContext";
import { getDoctorAppointments, rescheduleAppointment, updateAppointmentsByDoctor } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { string } from "yup";
import toast from "react-hot-toast";

export default function AppointmentsPage() {
  const router = useRouter();
  const [selectedAppointment,setSelectedAppointment] = useState<Appointment | null>(null)
  const [showRescheduleModal,setShowRescheduleModal] = useState(false)
  const [newDate, setNewDate] = useState( "");
  const [newTime, setNewTime] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { doctor, loading } = useDoctorAuth();
  const timeSlots = [
  "09:30 AM - 09:45 AM", "10:00 AM - 10:15 AM",
  "10:30 AM - 10:45 AM", "11:30 AM - 11:45 AM",
  "12:00 PM - 12:15 PM", "01:00 PM - 01:15 PM",
];

  useEffect(() => {
    if (!loading && !doctor) {
      router.push("/doctor/login");
    }
  }, [loading, doctor]);

  const fetchAppointments = async () => {
    if (doctor) {
      const res = await getDoctorAppointments(doctor.id);
      const data = res;
      
      const statusOrder: Record<AppointmentStatus, number> = {
      approved: 1,
      pending: 2,
      completed: 3,
      rejected: 4,
    };

    const sortedAppointments = data.sort((a: { status: AppointmentStatus }, b: { status: AppointmentStatus }) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
      setAppointments(sortedAppointments);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctor]);

  const updateStatus = async (id: string, status: string) => {
    await updateAppointmentsByDoctor(id, status);
    fetchAppointments();
  };

  const handleReschedule = (appt: Appointment) => {
    setNewDate(appt.date)
    setNewTime(appt.time)
    setSelectedAppointment(appt);
    setShowRescheduleModal(true);
  };
  const reshudleSumbitHandler = async (id: string, date:string, time:string)=>{
    const res = await rescheduleAppointment(id, date, time);
    if(res.ok ){
      toast.success("Appointment reshudled successfully")
      setNewDate("")
      setNewTime("")
      setSelectedAppointment(null); 
      setShowRescheduleModal(false);
      await fetchAppointments();
    }else{
      toast.error("Failed to reschedule the appointment.")
    }
  }

  if (loading || !doctor)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="p-6 max-h-screen pt-24 lg:pt-4 overflow-y-scroll bg-gray-50 min-h-screen">
      {showRescheduleModal && selectedAppointment && (
          <Dialog  open={true} onOpenChange={setShowRescheduleModal}>
            <DialogContent >
              <DialogHeader className="border-b-2 pb-2 border-teal-600">
                <DialogTitle>Reschedule Appointment</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  reshudleSumbitHandler(selectedAppointment.id, newDate, newTime);
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block mb-1 font-semibold">Select Time Slot</label>
                  <input
                    type="date"
                    value={newDate}
                    placeholder="new time"
                    onChange={(e) => setNewDate(e.target.value)}
                    className="border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                      <button
                      key={slot}
                      type="button"
                      onClick={() => setNewTime(slot)}
                      className={`border cursor-pointer rounded px-2 py-1 text-sm ${newTime === slot ? 'bg-teal-500 text-white' : ''}`}
                      >
                      {slot}
                      </button>
                  ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-teal-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Confirm Reschedule
                </button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
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
                <td colSpan={8} className="py-6 text-gray-500">
                  <div className="flex flex-col items-center justify-center w-full">
                    <img
                      src="/images/no-user-found.png"
                      alt="No Patients"
                      className="w-32 h-32 md:w-40 md:h-40 mb-4 opacity-70"
                    />
                    <span>No appointments found.</span>
                  </div>
                </td>
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
                        ${
                          appt.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appt.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : appt.status === "completed"
                            ? "bg-sky-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {appt.status === "pending" || appt.status == "approved" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button  className="text-sm cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded">
                            Take Action
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Take Action</DialogTitle>
                            <DialogDescription>
                              What would you like to do with this appointment?
                            </DialogDescription>
                          </DialogHeader>
                          {appt.status == "approved" ?(
                            <div className="gap-4 flex ">
                              <button
                                onClick={() =>
                                  updateStatus(appt.id, "completed")
                                }
                                className="text-sm cursor-pointer bg-green-500  hover:bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Completed
                              </button>
                              <button
                                onClick={() => {handleReschedule(appt)}}
                                className="text-sm cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                              >
                                Reschedule
                              </button>
                            </div>
                          ):(
                            <div className="flex gap-4 justify-center mt-4">
                              <button
                                onClick={() =>
                                  updateStatus(appt.id, "approved")
                                }
                                className="text-sm cursor-pointer bg-green-500 w-[84px] hover:bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(appt.id, "rejected")
                                }
                                className="text-sm cursor-pointer bg-red-500 w-[84px] hover:bg-red-600 text-white px-3 py-1 rounded"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => {handleReschedule(appt)}}
                                className="text-sm cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                              >
                                Reschedule
                              </button>
                            </div>
                          )}
                          
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span className="text-gray-400 italic text-sm">
                        No actions
                      </span>
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
