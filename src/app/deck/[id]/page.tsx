import { getDeckById } from "@/lib/actions/deck.action";

export default async function Page({ params }: { params: { id: number } }) {
  const deck = await getDeckById(params.id);
  console.log(deck);
  return (
    <div>
      <div className="">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
      </div>
    </div>
  );
}
