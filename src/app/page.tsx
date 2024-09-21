import DeckForm from "@/components/DeckForm";
import { createClerkSupabaseClientSsr } from "./client";
import Link from "next/link";

export default async function Home() {
  const client = createClerkSupabaseClientSsr();

  // Query the 'tasks' table to render the list of tasks
  const { data, error } = await client.from("deck").select();
  if (error) {
    throw error;
  }
  const decks = data;

  return (
    <div>
      <h1>Decks</h1>
      <div>
        {decks?.map((deck) => (
          <Link href={`/deck/${deck.id}`} key={deck.id}>
            <p>{deck.name}</p>
          </Link>
        ))}
      </div>
      <DeckForm />
    </div>
  );
}
