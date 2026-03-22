/**
 * @file app/components/SignoutButton.tsx
 * @description signout button component
 */
"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/services/supabase/client"; // client, not server
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignoutButton = () => {
  const router = useRouter();

  async function signout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Unable to sign out. Please try again later.");
      return;
    }

    router.push("/");
  }

  return (
    <Button type="button" className="button" onClick={signout}>
      Sign Out
    </Button>
  );
};

export default SignoutButton;
