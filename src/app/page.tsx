import DeckForm from "@/components/DeckForm";
import pb from "@/utils/pocketbase";
import { SignedIn } from "@clerk/nextjs";

export default async function Home() {
  const decks = await pb.collection("users").getFullList();
  console.log(decks);
  return (
    <div>
      <SignedIn>
        <DeckForm />
      </SignedIn>
    </div>
  );
}
