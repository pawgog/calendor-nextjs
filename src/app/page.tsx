import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId != null) redirect("/events");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-10 h-10" />
          <span className="text-4xl font-semibold tracking-tight">
            Calendling
          </span>
        </div>
        <p className="text-indigo-100 max-w-md mb-10 text-lg">
          Book meetings effortlessly. Share availability and let others schedule
          time with you.
        </p>
        <div className="relative w-72 h-72 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center mb-12 shadow-xl">
          <Clock className="w-32 h-32 text-white/80" />
          <span className="absolute bottom-6 text-sm text-white/70">
            Time & meetings
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button
            asChild
            className="flex-1 rounded-xl bg-white text-indigo-500 py-3 font-semibold hover:bg-indigo-50 transition"
          >
            <SignInButton />
          </Button>
          <Button
            asChild
            className="flex-1 rounded-xl bg-indigo-500 border border-white/30 py-3 font-semibold hover:bg-indigo-400 transition"
          >
            <SignUpButton />
          </Button>
        </div>
        <p className="mt-8 text-sm text-white/70">
          Syncs with your calendar • Works on all devices
        </p>
      </div>
    </div>
  );
}
