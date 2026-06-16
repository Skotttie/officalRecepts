"use client";

import { useState, useEffect } from "react";
import NewPostForm from "../../src/components/NewPostForm";
import PostList from "../../src/components/PostList";

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
  author?: string | null;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
};

export default function Forum({ posts }: { posts: Post[] }) {
  const [currentUser, setCurrentUser] = useState("Anonym");

  useEffect(() => {
    const stored = localStorage.getItem("forumAuthor");
    if (stored) setCurrentUser(stored);
  }, []);

  function handleAuthorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setCurrentUser(name);
    localStorage.setItem("forumAuthor", name);
  }

  return (
    <>
      <div className="author-selector">
        <input
          value={currentUser}
          onChange={handleAuthorChange}
          placeholder="Dein Name für neue Beiträge"
          className="text-input"
          style={{ maxWidth: "300px", marginBottom: "1rem" }}
        />
      </div>
      <NewPostForm author={currentUser} />
      <PostList posts={posts} currentUser={currentUser} />
    </>
  );
}