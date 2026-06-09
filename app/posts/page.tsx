import { getPosts } from "../actions";
import NewPostForm from "../../src/components/NewPostForm";
import PostList from "../../src/components/PostList";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog-Beiträge</h1>
      <p className="server-note">
        Server Component: Diese Seite lädt Blog-Beiträge direkt über Server Actions aus der SQLite-Datenbank.
      </p>
      <NewPostForm />
      <PostList posts={posts} />
    </main>
  );
}
