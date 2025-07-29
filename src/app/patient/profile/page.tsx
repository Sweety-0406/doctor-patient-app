"use client"
import Footer from "@/components/footer";
import { FiEdit2, FiBell, FiLogOut, FiUsers, FiHelpCircle, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { usePatientAuth } from "@/context/patientAuthContext";
import { JSX } from "react";

export default function ProfilePage (){
    const { patient, loading, logout } = usePatientAuth();
    const router = useRouter()

    if (!patient && loading) return <div className="text-center mt-10">Loading...</div>
    return(
        <div className="max-w-3xl max-h-screen mx-auto ">
            <div className="h-[90vh] overflow-y-scroll p-4">
                <div className="flex items-center space-x-3 mb-6">
                    <button onClick={() => router.back()}>
                    <FiArrowLeft className="text-lg" />
                    </button>
                    <h2 className="text-lg font-semibold">Profile</h2>
                </div>

                {/* Profile Card */}
                <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl">
                    {/* Placeholder Avatar */}
                    <span className="text-gray-600">👤</span>
                    </div>
                    <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium">{patient?.name}</h3>
                    <p className="text-gray-500 text-xs">{patient?.email}</p>
                    </div>
                    <FiEdit2 className="text-teal-500 cursor-pointer" />
                </div>

                {/* Options */}
                <div className="divide-y border-t border-b text-sm">
                    <ProfileOption icon={<FiBell />} label="Notification" />
                    <ProfileOption icon={<FiHelpCircle />} label="Help and support" />
                    <ProfileOption icon={<FiUsers />} label="Invite friends" />
                </div>

                {/* Logout */}
                <button 
                    onClick={()=>{
                        logout()
                        router.push("/")
                    }} className="mt-6 cursor-pointer text-red-500 flex items-center space-x-2">
                    <FiLogOut />
                    <span >Logout</span>
                </button>
            </div>
            <div className="h-[10vh] p-4">
                <Footer page="profile" />
            </div>
        </div>
    )
}


function ProfileOption({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-3 text-gray-700">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-gray-400">{">"}</span>
    </div>
  );
}