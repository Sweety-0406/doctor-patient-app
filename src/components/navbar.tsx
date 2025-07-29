import { useDoctorAuth } from "@/context/authContext";
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";

const Navbar = ()=>{
    const pathname = usePathname()
    const { logout } = useDoctorAuth();
    const router = useRouter();

    const logoutHandler = () => {
        logout();
        router.push("/doctor/login");
    };
    return(
        <nav className="w-full  h-20 flex justify-between bg-white shadow-md p-6 flex  justify-between">
            <div className="flex justify-between ">
                <a href="/" className="text-2xl font-bold text-teal-600 ">Doc-Center</a>
                <nav className="flex justify-between gap-4 ml-4 mt-1  ">
                    <Link href="/doctor/dashboard" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/dashboard') && "text-teal-600 font-semibold text-lg"}`}>🏠 </Link>
                    <Link href="/doctor/appointments" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/appointments') && "text-teal-600 font-semibold text-lg"}`}>📅 </Link>
                    <Link href="/doctor/patients" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/patients') && "text-teal-600 font-semibold text-lg"}`}>👥 </Link>
                    {/* <Link href="/doctor/messages" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/dashboard') && "text-teal-600 font-semibold text-lg"}`}>💬 </Link> */}
                    <Link href="/doctor/profile" className={`text-gray-700 hover:text-teal-600 hover:text-lg ${pathname.includes('doctor/profile') && "text-teal-600 font-semibold text-lg"}`}>🩺 </Link>
                </nav>
            </div>

            <button onClick={logoutHandler} className=" bg-teal-500 hover:bg-teal-600 text-gray-700 py-1 px-2 text-center rounded">
                Logout
            </button>
        </nav>
    )
}

export default Navbar