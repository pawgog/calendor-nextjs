import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarRange } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  return (
    <>
      <header className="flex justify-center py-2 border-b bg-card">
        <nav className="font-medium flex justify-between items-center text-sm container">
          <div className="flex items-center gap-2 font-semibold">
            <CalendarRange className="size-6 text-indigo-500" />
            <span className="sr-only md:not-sr-only">Calendling</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/availability">Set availability</NavLink>
            <NavLink href={`/book/${userId}`}>My Schedule</NavLink>
          </div>
          <UserButton
            appearance={{ elements: { userButtonAvatarBox: "size-full" } }}
          />
        </nav>
      </header>
      <main className="container my-6 mx-auto">{children}</main>
    </>
  );
}
