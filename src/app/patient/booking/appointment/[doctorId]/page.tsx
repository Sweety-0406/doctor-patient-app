"use client";
import { useParams, useRouter } from "next/navigation";
import { getDoctorById, postAppointment } from "@/lib/api";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import { usePatientAuth } from "@/context/patientAuthContext";

const timeSlots = [
  "09:30 AM - 09:45 AM", "10:00 AM - 10:15 AM",
  "10:30 AM - 10:45 AM", "11:30 AM - 11:45 AM",
  "12:00 PM - 12:15 PM", "01:00 PM - 01:15 PM",
];

export default function BookingAppointmentPage({ params }: { params: { doctorId: string } }) {
  const { patient, loading } = usePatientAuth();
  const { doctorId } = useParams(); 
  const router = useRouter()
  const [doc, setDoc] = useState<any>(null);
  
  useEffect(() => {
      if (!doctorId) return;
      console.log(doctorId)
      const fetchData = async () => {
          const doctor = await getDoctorById(Number(doctorId));
          setDoc(doctor);
        };
        fetchData();
    }, [doctorId]);
    
    const [formData, setFormData] = useState({
      patient: "",
      gender: "",
      age: "",
      diagnosis: "",
      phone: "",
      address: "",
      blood: "",
      triage: "",
      date: "",
      time: "",
      payment: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeSelect = (slot: string) => {
        setFormData({ ...formData, time: slot });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const payload = {
            doctorId: doctorId as string,
            patientId: String(patient?.id),
            doctorImage: doc.image,
            doctorName: doc.name,
            status: "pending" as "pending", // cast to valid union value
            patient: formData.patient,
            gender: formData.gender as "Male" | "Female" | "Other",
            age: formData.age.toString(),
            diagnosis: formData.diagnosis,
            phone: formData.phone,
            address: formData.address,
            blood: formData.blood as "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | string,
            triage: formData.triage as "Non Urgent" | "Urgent" | "Emergency" | string,
            date: formData.date,
            time: formData.time,
            payment: formData.payment,
            id: crypto.randomUUID(),
        }
        e.preventDefault();
        console.log("Appointment Data:", payload);
        const res = await postAppointment(payload)
        if(res.ok){
            toast.success("Appointment booked successfully")
        }else{
            toast.error("Booking Failed Please Try Again")
        }
    };

  if (!doc) return <div>Loading...</div>;

  return (
    <div className="relative">
      <div className="bg-teal-500 w-full absolute h-40 rounded-b-4xl"/>
        <div className="absolute  p-4 w-full">
            <div className="mt-4">
            <h2 className="text-2xl text-white flex gap-4 font-semibold mb-10"><span className="cursor-pointer mt-1" onClick={()=>{router.back()}}><FaArrowLeft /></span>Book Your Appointment</h2>
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
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
                <h2 className="text-xl font-semibold">Book Appointment</h2>

                <input type="text" name="patient" placeholder="Patient Name" onChange={handleChange} className="input" required />
                
                <select name="gender" onChange={handleChange} className="input" required>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input type="number" name="age" placeholder="Age" onChange={handleChange} className="input" required />

                <input type="text" name="diagnosis" placeholder="Diagnosis" onChange={handleChange} className="input" required />

                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="input" required />

                <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input" required />

                <select name="blood" onChange={handleChange} className="input" required>
                    <option value="">Select Blood Group</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>

                <select
                    name="triage"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    required
                >
                    <option value="">Select Triage Level</option>
                    <option>Non Urgent</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                </select>

                <input type="date" name="date" onChange={handleChange} className="input" required />

                <div>
                    <label className="block mb-1">Select Time Slot</label>
                    <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                        <button
                        key={slot}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        className={`border rounded px-2 py-1 text-sm ${formData.time === slot ? 'bg-teal-500 text-white' : ''}`}
                        >
                        {slot}
                        </button>
                    ))}
                    </div>
                </div>

                <select name="payment" onChange={handleChange} className="input" required>
                    <option value="">Payment</option>
                    <option value={"Paid"}>Pay now</option>
                    <option value={"Not paid"}>Pay later</option>
                </select>

                <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded">
                    Book Appointment
                </button>
            </form>
        </div>

    </div>
  );
}
