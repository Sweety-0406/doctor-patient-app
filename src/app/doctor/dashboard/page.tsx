'use client';

import { useDoctorAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Appointment } from '@/app/types';
import { getDoctorAppointments, getMyPatientByDoctor } from '@/lib/api';
import WebsiteFooter from '@/components/websiteFooter';
import MyCalendar from '@/components/myCalender';
import Graph from '@/components/graph';

export default function DoctorDashboard() {
  const { doctor, loading } = useDoctorAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState(0);

  useEffect(() => {
    if (!loading && doctor) {
      fetchAppointments();
    } else if (!loading && !doctor) {
      router.push('/doctor/login');
    }
  }, [loading, doctor]);

  const fetchAppointments = async () => {
    if (doctor) {
      const res = await getDoctorAppointments(doctor.id);
      
      const data = await getMyPatientByDoctor(doctor.id);
      const jsonData = await data.json();
      const scheduleData = res.filter((item:Appointment)=>item.status === "pending" || item.status === "approved")
      setAppointments(scheduleData);
      const uniquePatients = new Set(jsonData.map((appt: Appointment) => appt.patientId)).size;
      setPatients(uniquePatients);
    }
  };


  if (!doctor) return null;

  return (
    <div className="min-h-screen max-h-screen pt-20 lg:pt-0 flex bg-gray-50">
      <main className="flex-1">
        {/* Top bar */}
        <div className="flex p-8 justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                router.push('/doctor/profile');
              }}
              className="w-12 h-12 cursor-pointer rounded-full overflow-hidden border border-teal-500"
            >
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-right">
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 p-8 sm:grid-cols-3 gap-6 mb-8">
          <StatCard label="Appointments" value={`${appointments.length}`} color="bg-blue-100 text-blue-600" />
          <StatCard label="Patients" value={`${patients}`} color="bg-orange-100 text-orange-600" />
          <StatCard label="Avg. Earning" value="₹2300.00" color="bg-green-100 text-green-600" />
        </div>

        {/* Graph and Calendar */}
        <div className="grid p-8 grid-cols-1  gap-6">
          {/* Calendar */}
          <MyCalendar scheduleData={appointments}/>

          {/* Graph */}
          <div className="bg-white p-6 rounded shadow-md col-span-2">
            {/* <h3 className="text-lg font-semibold mb-4">Patient Visit</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">
              <Image src="/images/fake-graph.png" alt="Patient Chart" width={400} height={200} className="object-contain" />
            </div> */}
            <Graph />
          </div>
        </div>
        <WebsiteFooter />
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`p-6 rounded shadow-md ${color} transform transition-transform duration-300 hover:scale-105`}>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
