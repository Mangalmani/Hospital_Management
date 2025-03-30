import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail or other SMTP service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (not your actual password)
    },
});

export async function POST(req) {
    try {
        const { name, email, phone, appointmentDate, doctorId } = await req.json();

        // Validate input
        if (!name || !email || !phone || !appointmentDate || !doctorId) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId },
        });

        if (!doctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        // Check if patient already exists
        let patient = await prisma.patient.findUnique({ where: { email } });

        // If patient does not exist, create a new one
        if (!patient) {
            patient = await prisma.patient.create({
                data: { name, email, phone },
            });
        }

        // Create an appointment
        const appointment = await prisma.appoitment.create({
            data: {
                appointmentDate: new Date(appointmentDate),
                doctor: { connect: { id: doctorId } },
                patient: { connect: { id: patient.id } },
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Appointment Confirmation",
            html: `<h3>Dear ${name},</h3>
                <p>Your appointment with ${doctor.name} (${doctor.specialty}) is confirmed.</p>
                <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString("en-GB")}</p>
                <p>Thank you for choosing our service.</p>`,
        });

        // Send Email to Doctor
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: doctor.email,
            subject: "New Appointment Scheduled",
            html: `<h3>Dear ${doctor.name},</h3>
                <p>You have a new appointment with ${name}.</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Appointment Date:</strong> ${new Date(appointmentDate).toLocaleDateString("en-GB")}</p>`,
        });

        return NextResponse.json({ message: "Appointment booked successfully", appointment }, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const appointments = await prisma.appoitment.findMany({
            include: {
                patient: true, // Get patient details
            },
        });

        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
    }
}