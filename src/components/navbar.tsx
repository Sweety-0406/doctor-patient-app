import { useDoctorAuth } from "@/context/authContext";
import Link from "next/link"
import {  usePathname, useRouter } from "next/navigation"

const Navbar = ()=>{
    const pathname = usePathname()
    const { logout } = useDoctorAuth();
    const router = useRouter();

    const logoutHandler = () => {
        logout();
        router.push("/");
    };
    return(
        <nav className="w-full z-10 absolute  h-20 flex justify-between bg-white shadow-md p-6 flex  justify-between">
            <div className="flex justify-between ">
                <Link href="/" className="text-2xl font-bold text-teal-600 ">Doc-Center</Link>
                <nav className="flex justify-between gap-4 ml-4 mt-1  ">
                    <Link href="/doctor/dashboard" className={`text-gray-700  hover:text-lg ${pathname.includes('doctor/dashboard') && "rounded bg-teal-100 px-1 font-semibold text-lg"} hover:bg-teal-100 rounded px-1`}>🏠 </Link>
                    <Link href="/doctor/appointments" className={`text-gray-700  hover:text-lg ${pathname.includes('doctor/appointments') && "rounded bg-teal-100 px-1 font-semibold text-lg"} hover:bg-teal-100 rounded px-1`}>📅 </Link>
                    <Link href="/doctor/patients" className={`text-gray-700  hover:text-lg ${pathname.includes('doctor/patients') && "rounded bg-teal-100 px-1 font-semibold text-lg"} hover:bg-teal-100 rounded px-1`}>👥 </Link>
                    <Link href="/doctor/profile" className={`text-gray-700  hover:text-lg ${pathname.includes('doctor/profile') && "rounded bg-teal-100 px-1 font-semibold text-lg"} hover:bg-teal-100 rounded px-1`}>🩺 </Link>
                </nav>
            </div>

            <button onClick={logoutHandler} className=" bg-teal-500 hover:bg-teal-600 text-gray-700 py-1 px-2 text-center rounded">
                Logout
            </button>
        </nav>
    )
}

export default Navbar