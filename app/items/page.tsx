import SearchableItems from "../../src/components/SearchableItems";
import { getItems } from "../../src/lib/items";

export const revalidate = 3600;

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alle Einträge</h1>
      <p className="server-note">
        Server Component: Diese Seite lädt die Grunddaten auf dem Server und gibt sie an eine kleine interaktive Client Component weiter.
      </p>

      <SearchableItems items={items} />
    </main>
  );
}
