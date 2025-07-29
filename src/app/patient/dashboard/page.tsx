'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import {  Doctor } from '@/app/types';
import { usePatientAuth } from '@/context/patientAuthContext';
import Footer from '@/components/footer';
import DoctorCard from '@/components/doctorCard';
import { IoNotificationsOutline, IoSearchOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { getDoctors } from '@/lib/api';


export default function PatientDashboard() {
    const { patient, loading } = usePatientAuth();
    const router = useRouter();
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
      if (!loading && patient) {
        console.log(patient)
          fetchDoctors()
      } else if (!loading && !patient) {
          router.push("/patient/login");
      }
    }, [loading, patient]);


    const fetchDoctors = async ()=>{
      const res = await getDoctors()
      setDoctors(res)
    }


  if (!patient) return null;

  return (
    <div className="max-h-screen overflow-y-scroll  flex bg-gray-50">
      {/* Main Content */}
      <main className="md:max-w-4xl w-full h-screen overflow-y-hidden mx-auto px-6">
        <div className="max-h-[20vh] pt-2">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div>
                <img  src="/images/user.jpg" alt="" className="size-10 rounded-full" />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold flex">
                  Hello , {patient  && patient.name && (
                    <div>
                      {patient.name.toUpperCase()}
                    </div>
                  )}
                </div>
                <div >
                  <p className="flex text-sm text-gray-500"><span className="mt-[3px]"><CiLocationOn /></span>{patient.location}</p>
                </div>
              </div>
              
            </div>
            <div className="relative cursor-pointer">
              <IoNotificationsOutline className="size-7 mt-2 " />
              <div className="size-4 rounded-full bg-red-400 text-xs text-center text-white absolute top-1 right-0">4</div>
            </div>
          </div>
          <div className="relative mb-4 mt-8 px-2">
            <input
              type="text"
              placeholder="Search Doctors"
              className="w-full px-4 pl-10 py-3 bg-gray-100  rounded-lg shadow-sm text-sm focus:border focus:outline-none focus:border-blue-400"
            />
            <span className="absolute left-6 top-3 text-gray-400">
              <IoSearchOutline className="size-5" />
            </span>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          {doctors.map((d, index) => (
            <DoctorCard key={index} {...d} />
          ))}
        </div>
        <div className="h-[10vh] items-center ">
          <Footer page="home" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`p-6 rounded shadow-md ${color}`}>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
