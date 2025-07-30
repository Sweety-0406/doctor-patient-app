"use client"

import { Appointment } from "@/app/types";
import { cancellAppointment } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function AppointmentCard({ 
  data, 
  onCancel 
}: { 
  data: Appointment, 
  onCancel: (id: string) => void; 
}) {
  const isRejected = data.status === "rejected";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const router = useRouter()

  return (
    <div className="border border-teal-500 bg-gradient-to-b from-teal-100 to-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <img src={data.doctorImage} alt="Doctor" className="w-16 h-16 rounded-full object-cover" />
        <div className="flex flex-col">
          <h2 className="font-semibold">{data.doctorName}</h2>
          <p className="text-xs text-gray-500">Token no – {data.id}</p>
          <p className="text-xs text-gray-500">{data.date} | <span className="text-blue-500">{data.time}</span></p>
          <p className="text-xs text-gray-500">Payment | <span className={`${data.payment === "Paid"? "text-green-500" : "text-red-500"}`}>{data.payment}</span></p>
          <p className={`text-xs font-semibold  mt-1  ${data.status === "approved" && "text-green-600"} ${data.status === "pending" && "text-yellow-400"} ${data.status === "rejected" && "text-red-600"} ${data.status === "completed" && "text-blue-600"} `}>Consulting | {data.status.toUpperCase()}</p>
        </div>
        <div className="text-gray-400 rounded-full bg-sky-100 p-1 flex text-center">
          🏢
        </div>
      </div>
      {(!isCompleted ) && (
        <button
          onClick={async ()=>{
            if(isRejected){
              router.push(`/patient/booking/appointment/${data.doctorId}`)
            }else{
              if(onCancel){
                await onCancel(data.id)
              }
            }
          }}
          className={`mt-4 w-full text-sm py-2 rounded border cursor-pointer
          ${(isRejected || isCancelled )? "border-gray-300 bg-teal-500 text-gray-700 " : "border-red-500 text-white bg-red-500"}`}
        >
          {(isRejected || isCancelled )? "Book Appointment" : "Cancel Appointment"}
        </button>
      )}
    </div>
  );
}
