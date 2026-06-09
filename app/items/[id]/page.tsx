import Link from 'next/link';

type Item = {
  id: number;
  title: string;
  cuisine: string;
  prepTime: number;
  description: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

async function getItem(id: string): Promise<Item | undefined> {
  const items: Item[] = [
    {
      id: 1,
      title: 'Pasta mit Tomatensauce',
      cuisine: 'Italienisch',
      prepTime: 25,
      description: 'Eine einfache Pasta als Beispiel für eine Detailseite.',
    },
    {
      id: 2,
      title: 'Gemüse-Curry',
      cuisine: 'Indisch',
      prepTime: 35,
      description: 'Ein würziges Curry mit Gemüse und Reis.',
    },
    {
      id: 3,
      title: 'Tacos',
      cuisine: 'Mexikanisch',
      prepTime: 20,
      description: 'Schnelle Tacos mit frischen Zutaten.',
    },
    {
      id: 4,
      title: 'Sushi Bowl',
      cuisine: 'Japanisch',
      prepTime: 30,
      description: 'Eine Bowl im Sushi-Stil mit Reis und Gemüse.',
    },
    {
      id: 5,
      title: 'Falafel Wrap',
      cuisine: 'Orientalisch',
      prepTime: 15,
      description: 'Ein schneller Wrap mit Falafel und Salat.',
    },
  ];

  return items.find((item) => item.id === Number(id));
}

export default async function ItemDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="server-note">Dynamische Route: Du bist auf /items/{id}.</p>
        <h1 className="text-3xl font-bold mb-6">Item nicht gefunden</h1>
        <Link href="/items" className="back-link">
          ← Zurück zur Liste
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <p className="server-note">
        Dynamische Server Route: Diese Seite kommt aus app/items/[id]/page.tsx. Die ID aus der URL ist {id}.
      </p>

      <article className="detail-card">
        <h1 className="text-3xl font-bold mb-6">{item.title}</h1>
        <p><strong>Küche:</strong> {item.cuisine}</p>
        <p><strong>Zubereitungszeit:</strong> {item.prepTime} Minuten</p>
        <p>{item.description}</p>
      </article>

      <Link href="/items" className="back-link">
        ← Zurück zur Liste
      </Link>
    </main>
  );
}
