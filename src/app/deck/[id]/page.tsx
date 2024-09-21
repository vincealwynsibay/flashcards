import UpdateDeckForm from "@/components/UpdateDeckForm";
import DeleteDeckDialog from "@/components/DeleteDeckDialog";
import { getDeckById } from "@/lib/actions/deck.action";

export default async function Page({ params }: { params: { id: number } }) {
  const deck = await getDeckById(params.id);

  return (
    <div>
      <div className="">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
      </div>

      <UpdateDeckForm
        id={params.id}
        name={deck.name}
        description={deck.description}
      />

      <DeleteDeckDialog id={params.id} />
    </div>
  );
}
