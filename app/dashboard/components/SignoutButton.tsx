/**
 * @file app/components/SignoutButton.tsx
 * @description signout button component
 */
"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/services/supabase/client"; // client, not server
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignoutButton = () => {
  const router = useRouter();
  const [isLogOut, setIsLogout] = useState(false);

  async function signout() {
    setIsLogout(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    setIsLogout(false);

    if (error) {
      toast.error("Unable to sign out. Please try again later.");
      return;
    }

    router.push("/");
  }

  return (
    <Button
      type="button"
      className="bg-red-500 hover:bg-red-600 cursor-pointer"
      onClick={signout}
      disabled={isLogOut}
      autoFocus
    >
      {isLogOut ? (
        <div className="flex items-center gap-2">
          <Spinner className="size-4" />
          Logging Out...
        </div>
      ) : (
        "Log Out"
      )}
    </Button>
  );
};

export default SignoutButton;
