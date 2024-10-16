import SignOutBtn from "@/app/[lang]/_components/SignOutButton";
import { getUserAuth } from "@/server/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="">
      <h1 className="my-2 text-2xl font-bold">Profile</h1>
      <pre className="my-2 rounded-lg bg-secondary p-4">
        {JSON.stringify(session, null, 2)}
      </pre>
      <SignOutBtn />
    </main>
  );
}
