"use client";
import { useParams, useRouter } from "next/navigation";
import { getDoctorById } from "@/lib/api";
import { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function BookingPage({ params }: { params: { id: string } }) {
  const { id } = useParams(); 
  const router = useRouter()
  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const doctor = await getDoctorById(Number(id));
      setDoc(doctor);
    };
    fetchData();
  }, [id]);


  if (!doc) return <div>Loading...</div>;

  return (
    <div className="relative">
      <div className="bg-teal-500 w-full absolute h-40 rounded-b-4xl"/>
      <div className="absolute  p-4 w-full">
        <div className="mt-4">
          <h2 className="text-2xl text-white flex gap-4 font-semibold mb-10"><span className="cursor-pointer mt-1" onClick={()=>{router.back()}}><FaArrowLeft /></span>Book Appointment</h2>
        </div>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-3  rounded-2xl mx-[10%] sm:px-8 bg-white shadow p-2">
            <div className="col-span-2 sm:pr-4">
              <h1 className="sm:text-xl font-semibold mb-1">{doc.name}</h1>
              <p className="text-gray-500 text-xs mb-1 sm:text-base">{doc.specialization}</p>
              <p className="text-teal-500 text-xs mb-1 sm:text-base">{doc.qualification}</p>
              <p className="text-gray-500 text-xs mb-1 sm:text-base">Fellow of Sankara Natrayala, Chennai</p>
            </div>
            <div className="col-span-1">
              <img 
                src={doc.image}
                alt={doc.name}
                className="object-cover aspect-square rounded-2xl w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]"
              />
            </div>
          </div>
          <div></div>
        </div>
        <div className="p-4 w-full max-w-md mx-auto space-y-4">
          {/* Speciality */}
          <div>
            <h3 className="font-semibold text-base mb-2">Speciality</h3>
            <div className="flex flex-wrap gap-2">
              {doc.specialties.map((speciality:any) => (
                <span
                  key={speciality}
                  className="px-3 py-1 text-sm border border-teal-500 font-semibold rounded-full"
                >
                  {speciality}
                </span>
              ))}
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <h3 className="font-semibold text-base mb-1">About Doctor</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {doc.description}
            </p>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold text-base mb-1">Availability For Consulting</h3>
            {doc.available.map((data:any, index:number)=>(
              <p key={index} className="text-gray-600 text-sm">
                {data}
              </p>
            ))}
          </div>

          {/* Appointment Card */}
          <div className="flex mt-10 w-full items-center justify-between p-4 bg-gray-100 rounded-xl   shadow-sm">
            <div className="flex items-center w-full space-x-3">
              <FaCalendarAlt className="text-gray-500 text-lg" />
              <div className="bg-white p-2  rounded-lg flex w-full justify-between">
                <div>
                  <p className="text-xs text-teal-500">Earliest Available Appointment</p>
                  <p className="text-sm font-medium">10 Oct, 2023 | 11:30 AM</p>
                </div>
                <div className="text-xl text-gray-400 mt-2"><IoIosArrowDropright /></div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={()=>router.push(`/patient/booking/appointment/${id}`)} className="w-full bg-teal-500 py-3 rounded-lg text-white font-semibold cursor-pointer">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
