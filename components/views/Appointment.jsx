"use client";

import React, { useEffect, useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors from API
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    }
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Appointment booked successfully!");
        setForm({ name: "", email: "", phone: "", appointmentDate: "", doctorId: "" });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to book appointment", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
