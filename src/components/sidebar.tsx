import { useDoctorAuth } from "@/context/authContext";
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"

const SideBar = ()=>{
    const pathname = usePathname()
    const { logout } = useDoctorAuth();
    const router = useRouter();

    const logoutHandler = () => {
        logout();
        router.push("/doctor/login");
    };
    return(
        <aside className="w-full h-screen bg-white shadow-md p-6 flex flex-col justify-between">
            <div>
            <Link href="/" className="text-2xl font-bold text-teal-600 ">Doc-Center</Link>
            <nav className="flex flex-col gap-4 mt-8">
                <Link href="/doctor/dashboard" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/dashboard') && "text-teal-600 font-semibold text-lg"}`}>🏠 Dashboard</Link>
                <Link href="/doctor/appointments" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/appointments') && "text-teal-600 font-semibold text-lg"}`}>📅 Appointments</Link>
                <Link href="/doctor/patients" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/patients') && "text-teal-600 font-semibold text-lg"}`}>👥 Patient List</Link>
                {/* <Link href="/doctor/messages" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/dashboard') && "text-teal-600 font-semibold text-lg"}`}>💬 Messages</Link> */}
                <Link href="/doctor/profile" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/profile') && "text-teal-600 font-semibold text-lg"}`}>🩺 Profile</Link>
            </nav>
            </div>

            <div className="mt-10">
            {/* <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded mb-4">
                Upgrade Pro
            </button> */}
            <button onClick={logoutHandler} className="w-full bg-teal-500 hover:bg-teal-600 text-gray-700 py-2 rounded">
                Logout
            </button>
            </div>
      </aside>
    )
}

export default SideBar