"use server"
import { createClerkSupabaseClientSsr } from "@/app/client";
import { CreateDeckPayload, UpdateDeckPayload } from "../validators/deck";



export async function addDeck(deckPayload: CreateDeckPayload) {
    const client = createClerkSupabaseClientSsr()
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
