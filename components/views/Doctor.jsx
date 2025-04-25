// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "../ui/card";

// export default function Doctor() {
//     const [doctors, setDoctors] = useState([]);

//     const fetchDoctors = async () => {
//         try {
//             const res = await fetch("/api/doctors");
//             const data = await res.json();
//             setDoctors(data); // No need to destructure
//         } catch (error) {
//             console.error("Error fetching doctors:", error);
//         }
//     };

//     useEffect(() => {
//         fetchDoctors();
//     }, []);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {doctors.length > 0 ? (
//                 doctors.map((doctor) => (
//                     <Card key={doctor.id} className="p-4 shadow-lg rounded-lg">
//                         <h2 className="text-xl font-bold">{doctor.name}</h2>
//                         <p className="text-gray-600">{doctor.specialty}</p>
//                         <p className="text-gray-500">{doctor.email}</p>
//                         <p className="text-gray-500">{doctor.phone}</p>
//                     </Card>
//                 ))
//             ) : (
//                 <p className="text-center text-gray-500">No doctors found</p>
//             )}
//         </div>
//     );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";

export default function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all doctors and appointments once
                const doctorsRes = await fetch("/api/doctors");
                const doctorsData = await doctorsRes.json();

                const appointmentsRes = await fetch("/api/appointments");
                const appointmentsData = await appointmentsRes.json();

                setDoctors(doctorsData);
                setAppointments(appointmentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <Card key={doctor?.id} className="p-4 shadow-lg rounded-lg">
                        <h2 className="text-xl font-bold">{doctor?.name}</h2>
                        <p className="text-gray-600">{doctor?.specialty}</p>
                        <p className="text-gray-500">{doctor?.email}</p>
                        <p className="text-gray-500">{doctor?.phone}</p>
                        <button
                            onClick={() => setSelectedDoctor(doctor?.id)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            View Appointments
                        </button>
                    </Card>
                ))
            ) : (
                <p className="text-center text-gray-500">No doctors found</p>
            )}

            {selectedDoctor && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 shadow-lg rounded-lg mt-4">
                    <h2 className="text-2xl font-bold mb-2">Appointments</h2>
                    {appointments.filter(app => app.doctorId === selectedDoctor).length > 0 ? (
                        appointments
                            .filter(app => app.doctorId === selectedDoctor)
                            .map((appointment) => (
                                <div key={appointment?.id} className="border-b py-2">
                                    <p className="text-lg font-semibold">{appointment?.patient?.name}</p>
                                    <p className="text-gray-600">{appointment?.patient?.email}</p>
                                    <p className="text-gray-500">{appointment?.patient?.phone}</p>
                                    <p className="text-gray-500">
                                        Appointment Date: {new Date(appointment?.appointmentDate).toLocaleDateString("en-GB")}
                                    </p>
                                </div>
                            ))
                    ) : (
                        <p className="text-gray-500">No appointments found for this doctor</p>
                    )}
                </div>
            )}
        </div>
    );
}
