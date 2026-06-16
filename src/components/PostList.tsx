"use client";

import { deletePost, updatePost } from "../../app/actions";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePostSchema, type UpdatePostInput } from "../schemas/post";

type Comment = {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
};

type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
};

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="empty-state">Noch keine Blog-Beiträge vorhanden.</p>;
  }

  return (
    <section className="posts-list" aria-label="Blog-Beiträge">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostInput>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: { title: post.title, content: post.content },
  });

  function onUpdate(data: UpdatePostInput) {
    startTransition(async () => {
      await updatePost(post.id, data);
      setIsEditing(false);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePost(post.id);
    });
  }

  return (
    <article className="post-card">
      {isEditing ? (
        <form onSubmit={handleSubmit(onUpdate)} className="post-edit-form">
          <input {...register("title")} className="text-input" />
          {errors.title && <p className="form-error">{errors.title.message}</p>}

          <textarea {...register("content")} className="textarea-input" />
          {errors.content && <p className="form-error">{errors.content.message}</p>}

          <div className="button-row">
            <button type="submit" className="primary-button" disabled={isPending}>
              {isPending ? "Speichert..." : "Speichern"}
            </button>
            <button type="button" className="secondary-button" onClick={() => setIsEditing(false)}>
              Abbrechen
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="post-header">
            <h2>{post.title}</h2>
            <span>{post.published ? "Veröffentlicht" : "Entwurf"}</span>
          </div>
          <p>{post.content}</p>
          <small>Erstellt am {post.createdAt.toLocaleDateString("de-DE")}</small>

          {post.comments.length > 0 ? (
            <div className="comments-box">
              <strong>{post.comments.length} Kommentar(e)</strong>
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.text} — {comment.author}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="button-row">
            <button type="button" className="secondary-button" onClick={() => setIsEditing(true)}>
              Bearbeiten
            </button>
            <button type="button" className="danger-button" onClick={handleDelete} disabled={isPending}>
              {isPending ? "Löscht..." : "Löschen"}
            </button>
          </div>
        </>
      )}
    </article>
  );
}
