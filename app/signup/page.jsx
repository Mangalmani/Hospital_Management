"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/admin/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Signup successful! Redirecting to login...");
                setTimeout(() => router.push("/login"), 2000); // Redirect to login after 2 seconds
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <input type="text" name="name" placeholder="Admin Name" value={formData.name} onChange={handleChange}
                    className="w-full p-2 border rounded mb-2" required />

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    className="w-full p-2 border rounded mb-2" required />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Signup</button>
                <div>
                    <Link href={"/login"}>Log In Here</Link>
                </div>
            </form>
        </div>
    );
}
