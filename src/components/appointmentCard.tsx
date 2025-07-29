"use client"

import { Appointment } from "@/app/types";
import { useRouter } from "next/navigation";


export default function AppointmentCard({ data }: { data: Appointment }) {
  const isCanceled = data.status === "rejected";
  const isCompleted = data.status === "approved";
  const router = useRouter()

  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <img src={data.doctorImage} alt="Doctor" className="w-16 h-16 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="font-semibold">{data.doctorName}</h2>
          <p className="text-xs text-gray-500">Token no – {data.id}</p>
          <p className="text-xs text-gray-500">{data.date} | <span className="text-blue-500">{data.time}</span></p>
          <p className="text-xs text-gray-500">Payment | <span className={`${data.payment === "Paid"? "text-green-500" : "text-red-500"}`}>{data.payment}</span></p>
          <p className={`text-xs font-semibold  mt-1  ${data.status === "approved" && "text-green-600"} ${data.status === "pending" && "text-yellow-400"} ${data.status === "rejected" && "text-red-600"}`}>Consulting | {data.status.toUpperCase()}</p>
        </div>
        <div className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13 16h-1v-4h-1m4-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" /></svg>
        </div>
      </div>
      <button
        onClick={()=>{
          if(isCanceled){
            router.push(`/patient/booking/appointment/${data.doctorId}`)
          }else{
            console.log("cancel")
          }
        }}
        className={`mt-4 w-full text-sm py-2 rounded border cursor-pointer
        ${!isCanceled ? "border-red-500 text-white bg-red-500" : "border-gray-300 bg-teal-500 text-gray-700"}`}
      >
        {isCanceled ? "Book Appointment" : "Cancel Appointment"}
      </button>
    </div>
  );
}
