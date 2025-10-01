import { db } from "@/drizzle/db";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BookingPage({
  params: { clerkUserId },
}: {
  params: { clerkUserId: string };
}) {
  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId: userIdCol, isActive }, { eq, and }) =>
      and(eq(userIdCol, clerkUserId), eq(isActive, true)),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  });

  if (events.length === 0) return notFound();

  const clerk = await clerkClient();
  const { fullName } = await clerk.users.getUser(clerkUserId);

  return null;
}
