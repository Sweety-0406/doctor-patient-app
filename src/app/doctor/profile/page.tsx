"use client";
import { useDoctorAuth } from "@/context/authContext";
import { updateDoctorProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { doctor, loading } = useDoctorAuth();
  const [name, setName] = useState(doctor?.name || "");
  const [specialization, setSpecialization] = useState(doctor?.specialization || "");
  const router = useRouter()

  useEffect(() => {
    if (!loading && !doctor) {
      router.push("/doctor/login");
    }
  }, [loading, doctor]);
  
  const updateProfile = async () => {
    if(!doctor) return null
    const res = await updateDoctorProfile(doctor?.id, name, specialization);

    if (res.ok) {
      alert("Profile updated!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <input className="input mb-3" value={name} onChange={e => setName(e.target.value)} />
      <input className="input mb-3" value={specialization} onChange={e => setSpecialization(e.target.value)} />
      <button className="btn" onClick={updateProfile}>Save</button>
    </div>
  );
}
