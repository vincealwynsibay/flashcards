import {z} from 'zod';

export const DeckValidator = z.object({
    name: z.string(),
    description: z.string()
})

export type CreateDeckPayload = z.infer<typeof DeckValidator>;
export type UpdateDeckPayload = z.infer<typeof DeckValidator>;
