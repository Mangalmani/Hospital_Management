// import React from 'react'

// export default function Header() {
//     return (
//         <div className='w-full '>
//             <div className='bg-blue-600  '>
//                 <div className='container mx-auto h-48 flex items-center justify-center' >
//                     <h1 className='text-6xl text-white font-bold'>
//                         RK Hospital
//                     </h1>
//                 </div>
//             </div>
//             <div className='bg-blue-800 flex justify-between'>
//                 <div className='container mx-auto flex justify-between p-4 font-semibold'>
//                     <div className='text-2xl text-white'>
//                         Patients
//                     </div>
//                     <div className='text-2xl text-white'>
//                         Doctors
//                     </div>
//                     <div className='text-2xl text-white'>
//                         Appointment
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function Header() {
//     const router = useRouter();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         // Check if the admin is logged in (JWT exists in cookies)
//         const token = document.cookie.split("; ").find(row => row.startsWith("token="));
//         setIsLoggedIn(!!token);
//     }, []);

//     const handleLogout = async () => {
//         await fetch("/api/admin/logout");
//         setIsLoggedIn(false);
//         router.push("/login");
//     };

//     return (
//         <div className="w-full">
//             {/* Hospital Banner */}
//             <div className="bg-blue-600">
//                 <div className="container mx-auto h-48 flex items-center justify-center">
//                     <h1 className="text-6xl text-white font-bold">RK Hospital</h1>
//                 </div>
//             </div>

//             {/* Navigation Bar */}
//             <div className="bg-blue-800 flex justify-between items-center">
//                 <div className="container mx-auto flex justify-between p-4 font-semibold">
//                     <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/")}>
//                         Patients
//                     </div>
//                     <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/doctors")}>
//                         Doctors
//                     </div>
//                     <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/appointments")}>
//                         Appointments
//                     </div>
//                 </div>

//                 {/* Logout Button (Only if Logged In) */}
//                 {isLoggedIn && (
//                     <button
//                         onClick={handleLogout}
//                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
//                     >
//                         Logout
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/check"); // Create this API route
                const data = await res.json();
                setIsLoggedIn(data.isAuthenticated);
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        };
        checkAuth();
    }, []);


    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            Cookies.remove("token"); // Remove token from cookies
            setIsLoggedIn(false);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="w-full">
            {/* Hospital Banner */}
            <div className="bg-blue-600">
                <div className="container mx-auto h-48 flex items-center justify-center">
                    <h1 className="text-6xl text-white font-bold">RK Hospital</h1>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-blue-800 flex justify-between items-center">
                <div className="container mx-auto flex justify-between p-4 font-semibold">
                    <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/")}>
                        Patients
                    </div>
                    <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/doctors")}>
                        Doctors
                    </div>
                    <div className="text-2xl text-white cursor-pointer" onClick={() => router.push("/appointment")}>
                        Appointments
                    </div>
                </div>

                {/* Logout Button (Only if Logged In) */}
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}
