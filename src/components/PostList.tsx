"use client";

import { deletePost, updatePost } from "../../app/actions";
import { useState, useTransition } from "react";

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
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isPending, startTransition] = useTransition();

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      await updatePost(post.id, title, content);
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
        <form onSubmit={handleUpdate} className="post-edit-form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="text-input"
            required
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="textarea-input"
            required
          />
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
