"use client"

import { Appointment } from "@/app/types";
import AppointmentCard from "@/components/appointmentCard";
import Footer from "@/components/footer";
import { usePatientAuth } from "@/context/patientAuthContext";
import { getPatientAppointments } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecordsPage(){
    const[appointments, setAppointments] = useState<Appointment[]>([])
    const { patient, loading } = usePatientAuth();
    const router = useRouter()


    useEffect(() => { 
    if (!loading && patient) {
        console.log(patient)
        fetchAppointments();
        console.log(appointments)
    } else if (!loading && !patient) {
        router.push("/patient/login");
    }
    }, [loading, patient]);

    const fetchAppointments = async () => {
        if(!patient) return null;
        const res = await getPatientAppointments(patient.id);
        const data = await res.json();
        console.log("data",data)
        setAppointments(data);
    
    };    
    return(
        <div className="max-w-3xl max-h-screen mx-auto ">
            <div className="h-[90vh] overflow-y-scroll p-4">
                <h1 className="text-xl font-semibold mb-4">My Appointments Records</h1>
                <div className="mt-4 space-y-4">
                    {appointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} data={appointment} />
                    ))}
                </div>
            </div>
            <div className="h-[10vh] p-4">
                <Footer page="records" />
            </div>
        </div>
    )
}