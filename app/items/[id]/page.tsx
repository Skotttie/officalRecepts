import Link from 'next/link';
import AddToCartButton from '../../../src/components/AddToCartButton';
import { getItem, getItems } from '../../../src/lib/items';

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getItems();

  return items.map((item) => ({
    id: String(item.id),
  }));
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

        <div className="button-row">
          <AddToCartButton
            item={{
              id: item.id,
              title: item.title,
              cuisine: item.cuisine,
              prepTime: item.prepTime,
            }}
          />
        </div>
      </article>

      <Link href="/items" className="back-link">
        ← Zurück zur Liste
      </Link>
    </main>
  );
}
