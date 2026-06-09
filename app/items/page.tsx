import SearchableItems from "../../src/components/SearchableItems";

type Item = {
  id: number;
  title: string;
  cuisine: string;
  prepTime: number;
};

// Diese Funktion läuft nur auf dem Server.
async function getItems(): Promise<Item[]> {
  // Platzhalterdaten, bis eine echte API oder Datenbank angebunden ist.
  return [
    {
      id: 1,
      title: 'Pasta mit Tomatensauce',
      cuisine: 'Italienisch',
      prepTime: 25,
    },
    {
      id: 2,
      title: 'Gemüse-Curry',
      cuisine: 'Indisch',
      prepTime: 35,
    },
    {
      id: 3,
      title: 'Tacos',
      cuisine: 'Mexikanisch',
      prepTime: 20,
    },
    {
      id: 4,
      title: 'Sushi Bowl',
      cuisine: 'Japanisch',
      prepTime: 30,
    },
    {
      id: 5,
      title: 'Falafel Wrap',
      cuisine: 'Orientalisch',
      prepTime: 15,
    },
  ];
}

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
