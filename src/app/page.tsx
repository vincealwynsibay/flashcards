import DeckForm from "@/components/DeckForm";
import { createClerkSupabaseClientSsr } from "./client";

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
          <p key={deck.id}>{deck.name}</p>
        ))}
      </div>
      <DeckForm />
    </div>
  );
}
