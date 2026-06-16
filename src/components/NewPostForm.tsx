"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../../app/actions";
import { CreatePostSchema, type CreatePostInput } from "../schemas/post";

export default function NewPostForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: { title: "", content: "" },
  });

  function onSubmit(data: CreatePostInput) {
    startTransition(async () => {
      await createPost(data);
      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="post-form" aria-label="Neuen Blog-Beitrag erstellen">
      <h2>Neuen Beitrag erstellen</h2>

      <input {...register("title")} placeholder="Titel" className="text-input" />
      {errors.title && <p className="form-error">{errors.title.message}</p>}

      <textarea {...register("content")} placeholder="Inhalt..." className="textarea-input" />
      {errors.content && <p className="form-error">{errors.content.message}</p>}

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Wird veröffentlicht..." : "Veröffentlichen"}
      </button>
    </form>
  );
}
