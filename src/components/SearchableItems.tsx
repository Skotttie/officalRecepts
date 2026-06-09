"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  id: number;
  title: string;
  cuisine: string;
  prepTime: number;
};

type SearchableItemsProps = {
  items: Item[];
};

export default function SearchableItems({ items }: SearchableItemsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState(60);

  const filteredItems = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(normalizedSearchTerm) ||
        item.cuisine.toLowerCase().includes(normalizedSearchTerm);
      const matchesPrepTime = item.prepTime <= maxPrepTime;

      return matchesSearch && matchesPrepTime;
    });
  }, [items, maxPrepTime, searchTerm]);

  return (
    <section className="interactive-panel" aria-label="Interaktive Item-Suche">
      <div className="client-badge">Client Component: Suche und Filter reagieren sofort im Browser</div>

      <div className="controls-grid">
        <label className="control-card">
          <span>Suchen nach Titel oder Küche</span>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="z.B. Pasta, Indisch, Tacos..."
            className="text-input"
          />
        </label>

        <label className="control-card">
          <span>Maximale Zubereitungszeit: {maxPrepTime} Minuten</span>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={maxPrepTime}
            onChange={(event) => setMaxPrepTime(Number(event.target.value))}
            className="range-input"
          />
        </label>
      </div>

      <p className="result-count">
        {filteredItems.length} von {items.length} Einträgen sichtbar
      </p>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/items/${item.id}`} className="item-card item-card-link">
            <h3>{item.title}</h3>
            <p>{item.cuisine}</p>
            <span>{item.prepTime} Minuten</span>
            <strong>Details ansehen →</strong>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="empty-state">Keine passenden Einträge gefunden.</p>
      ) : null}
    </section>
  );
}
