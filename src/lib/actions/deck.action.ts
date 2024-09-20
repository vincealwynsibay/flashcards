"use server"
import { createClerkSupabaseClientSsr } from "@/app/client";
import { CreateDeckPayload } from "../validators/deck";


const client = createClerkSupabaseClientSsr()

export async function addDeck(deckPayload: CreateDeckPayload) {
    try {
        const response = await client.from('deck').insert({
          name: deckPayload.name,
            description: deckPayload.description
        });
    
        console.log('Deck successfully added!', response)
      } catch (err) {
        console.error(err);
        throw new Error('Failed to add Deck');
      }
}