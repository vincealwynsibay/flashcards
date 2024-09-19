import DeckForm from "@/components/DeckForm";
import { SignedIn } from "@clerk/nextjs";
import { supabase } from "./lib/supabase";

export default async function Home() {

  const { data: users } = await supabase.from("users").select();
  console.log("nice");
  console.log("users", users);
  return (
    <div>
      <SignedIn>
        <DeckForm />
      </SignedIn>
    </div>
  );
}
