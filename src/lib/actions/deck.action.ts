"use server"
import { createClerkSupabaseClientSsr } from "@/app/client";
import { CreateDeckPayload, UpdateDeckPayload } from "../validators/deck";



export async function addDeck(deckPayload: CreateDeckPayload) {
    console.log(deckPayload);
    const client = createClerkSupabaseClientSsr()
    try {
        const {data} = await client.from('deck').insert({
          name: deckPayload.name,
        description: deckPayload.description
        }).select().single();

        await client.from('flashcard').insert(deckPayload.flashcards.map(flashcard => ({
            deck_id: data.id,
            front: flashcard.front,
            back: flashcard.back
        }))).select();
    
        console.log('Deck successfully added!', data)
        return data;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to add Deck');
      }
}

export async function getDeckById(id: number) {
    const client = createClerkSupabaseClientSsr()
    try {
        const { data, error } = await client.from('deck').select().eq('id', id).single()
        if (error) {
            throw error
        }
        return data
    } catch (err) {
        console.error(err)
        throw new Error('Failed to get Deck')
    }
}
export async function updateDeckById(id: number, deckPayload: UpdateDeckPayload) {
    const client = createClerkSupabaseClientSsr()
    try {
        const { data, error } = await client.from('deck').update({
            ...(deckPayload.name != "" && { name: deckPayload.name }),
            ...(deckPayload.description != "" && { description: deckPayload.description })
        }).eq('id', id).select()
        if (error) {
            throw error
        }
        return data
    } catch (err) {
        console.error(err)
        throw new Error('Failed to update Deck')
    }
}

export async function deleteDeckById(id: number) {
    const client = createClerkSupabaseClientSsr()
    try {
        const { data, error } = await client.from('deck').delete().eq('id', id)
        if (error) {
            throw error
        }
        return data
    } catch (err) {
        console.error(err)
        throw new Error('Failed to delete Deck')
    }
}
