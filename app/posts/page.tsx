import { getPosts } from "../actions";
import Forum from "../../src/components/Forum";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog-Beiträge</h1>
      <p className="server-note">
        Server Component: Diese Seite lädt Blog-Beiträge direkt über Server Actions aus der SQLite-Datenbank.
      </p>
      <Forum posts={posts} />
    </main>
  );
}
