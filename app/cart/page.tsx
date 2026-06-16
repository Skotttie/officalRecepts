"use client";

import Link from "next/link";
import { useCart } from "../../src/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Warenkorb</h1>
      <p className="client-badge">
        Client Component: Der Warenkorb lebt im Browser (LocalStorage) – noch nicht an die Datenbank angebunden.
      </p>

      {items.length === 0 ? (
        <p className="empty-state">
          Dein Warenkorb ist leer. <Link href="/items">Rezepte entdecken →</Link>
        </p>
      ) : (
        <>
          <div className="posts-list">
            {items.map((item) => (
              <div key={item.id} className="post-card">
                <div className="post-header">
                  <h2>{item.title}</h2>
                  <span>{item.cuisine}</span>
                </div>
                <p>{item.prepTime} Minuten Zubereitungszeit</p>
                <div className="button-row">
                  <label>
                    Menge:{" "}
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                      className="text-input"
                    />
                  </label>
                  <button className="danger-button" onClick={() => removeItem(item.id)}>
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="result-count">{totalItems} Portionen im Warenkorb</p>

          <div className="button-row">
            <button className="secondary-button" onClick={clearCart}>
              Warenkorb leeren
            </button>
            <Link href="/cart/checkout" className="primary-button">
              Zur Kasse (Mock Checkout)
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
