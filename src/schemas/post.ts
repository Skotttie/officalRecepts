import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Titel ist erforderlich")
    .max(120, "Titel darf maximal 120 Zeichen haben"),
  content: z.string().min(1, "Inhalt ist erforderlich"),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = CreatePostSchema;

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;
