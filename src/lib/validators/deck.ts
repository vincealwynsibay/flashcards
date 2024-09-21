import {z} from 'zod';

export const DeckValidator = z.object({
    name: z.string().trim().min(1),
    description: z.string(),
    flashcards: z.array(z.object({
        id: z.string(),
        front: z.string().trim().min(1),
        back: z.string().trim().min(1),
    }))
})

export type CreateDeckPayload = z.infer<typeof DeckValidator>;
export type UpdateDeckPayload = z.infer<typeof DeckValidator>;
