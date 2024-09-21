"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { addDeck } from "@/lib/actions/deck.action";
import { DeckValidator } from "@/lib/validators/deck";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Editor } from "./ui/editor";
import { v4 as uuidv4 } from "uuid";

function DeckForm() {
  const router = useRouter();
  // const [flashcards, setFlashcards] = useState([
  //   {
  //     id: uuidv4(),
  //     front: "",
  //     back: "",
  //   },
  // ]);

  const form = useForm<z.infer<typeof DeckValidator>>({
    resolver: zodResolver(DeckValidator),
    defaultValues: {
      name: "",
      description: "",
      flashcards: [
        {
          id: uuidv4(),
          front: "",
          back: "",
        },
      ],
    },
  });
  const errors = form.formState.errors;

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "flashcards",
  });

  async function onSubmit(values: z.infer<typeof DeckValidator>) {
    await addDeck(values);
    router.refresh();
    form.reset();
  }

  function handleAddCard() {
    append({
      id: uuidv4(),
      front: "",
      back: "",
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((flashcard, index) => (
            <>
              <Card key={flashcard.id}>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Editor {...form.register(`flashcards.${index}.front`)} />
                    {errors.flashcards?.[index]?.front && (
                      <p style={{ color: "red" }}>
                        {errors.flashcards[index].front.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Editor {...form.register(`flashcards.${index}.back`)} />
                    {errors.flashcards?.[index]?.back && (
                      <p style={{ color: "red" }}>
                        {errors.flashcards[index].back.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ))}

          <Button onClick={handleAddCard}>ADD CARD</Button>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default DeckForm;
