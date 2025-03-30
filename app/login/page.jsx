"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                router.push("/"); // Redirect to home after login
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
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

                {error && <p className="text-red-500">{error}</p>}

                <input type="text" name="name" placeholder="Admin Name" value={formData.name} onChange={handleChange}
                    className="w-full p-2 border rounded mb-2" required />

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    className="w-full p-2 border rounded mb-2" required />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
                <div>
                    <Link href={"/signup"}>Create New Account</Link>
                </div>
            </form>
        </div>
    );
}
