import AppointmentForm from "@/components/views/Appointment";
import Doctor from "@/components/views/Doctor";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-8 mt-8">
      <Doctor />
      <AppointmentForm />
    </div>
  );
}
