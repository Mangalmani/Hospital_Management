
"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";

export default function Patients() {
    const [patients, setpatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all patients and appointments once
                const patientsRes = await fetch("/api/patient");
                const { patients } = await patientsRes.json();
                setpatients(patients);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>


            <div className="w-full text-center text-3xl font-semibold">
                Patient List
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

                {patients.length > 0 ? (
                    patients.map((patient) => (
                        <Card key={patient?.id} className="p-4 shadow-lg rounded-lg">
                            <h2 className="text-xl font-bold">{patient?.name}</h2>
                            <p className="text-gray-500">{patient?.email}</p>
                            <p className="text-gray-500">{patient?.phone}</p>

                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No patients found</p>
                )}
            </div>
        </div>
    );
}
