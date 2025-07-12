import { UserButton } from "@clerk/nextjs";

export default async function EventsPage() {
  return (
    <>
      <h1 className="text-3xl mb-4">Events Page</h1>
      <UserButton />
    </>
  );
}
