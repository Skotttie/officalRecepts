"use client";

import { createPost } from "../../app/actions";
import { useState, useTransition, useEffect } from "react";

export default function NewPostForm({ author }: { author: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      await createPost(title, content, author || "Anonym");
      setTitle("");
      setContent("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="post-form" aria-label="Neuen Blog-Beitrag erstellen">
      <h2>Neuen Beitrag erstellen {author && `als ${author}`}</h2>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Titel"
        className="text-input"
        required
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Inhalt..."
        className="textarea-input"
        required
      />
      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Wird veröffentlicht..." : "Veröffentlichen"}
      </button>
    </form>
  );
}