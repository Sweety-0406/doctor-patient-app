"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";

type dataType = {
  id: string;
  name: string;
  specialization: string;
  availableToday: boolean;
  image: string;
  description: string;
  timing: string;
}

export default function DoctorCard({
  id,
  name,
  specialization,
  timing,
  description,
  image,
  availableToday,
}: dataType) {
  const [isFav, setIsFav] = useState(false)
  const router = useRouter()
  const onClickHandler=(e: React.MouseEvent<HTMLDivElement | SVGElement>)=>{
    e.stopPropagation();
    setIsFav((val)=>!val)
  }
  return (
    <div onClick={()=>router.push(`/patient/booking/${id}`)} className="grid cursor-pointer grid-cols-5 border border-gray-300 sm:grid-cols-2 items-start gap-4 p-4 bg-white rounded-2xl hover:shadow hover:shadow-md transition">
      <div className="col-span-2 sm:col-span-1">
        <img 
          src={image}
          alt={name}
          className="object-cover sm:aspect-square rounded-2xl w-full h-full"
        />
      </div>
      <div className="col-span-3 sm:col-span-1 text-xs md:text-sm">
        <div className="flex justify-between ">
          <div className="font-semibold  sm:text-lg">{name}</div>
          <FiHeart onClick={onClickHandler} className={`cursor-pointer hover:fill-red-500 hover:text-red-500 ${isFav ? "fill-red-500 text-red-500":"fill-transparent text-gray-500 "}`}/>
        </div>
        <p className=" text-[#46C2DE] font-semibold mb-2">{specialization}</p>
        <span className={` px-2 py-1 font-semibold  rounded-full ${availableToday ? "bg-[#18AB001C] text-[#18AB00]":"bg-red-100 text-red-500"}`}>
          {availableToday ? "Available Today":"Not Available Today"}
        </span>
        <div className="turncate  text-gray-500 mt-2 mb-4">
          {description}
        </div>
        <span className=" px-2 py-1  font-semibold bg-gray-100 rounded-full">
          {timing}
        </span>
      </div>
    </div>
  );
}
