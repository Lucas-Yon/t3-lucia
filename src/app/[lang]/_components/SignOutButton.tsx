"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { signOutAction } from "@/server/actions/users";

export default function SignOutBtn() {
  return (
    <form action={signOutAction} className="w-full text-left">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={"destructive"}>
      Sign{pending ? "ing" : ""} out
    </Button>
  );
};
