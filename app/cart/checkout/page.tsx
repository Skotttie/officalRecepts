"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../../src/context/CartContext";
import { mockCheckout } from "../../actions";

export default function CheckoutPage() {
  const { items, totalItems, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [orderId, setOrderId] = useState<number | null>(null);

  async function handleCheckout() {
    setStatus("loading");
    const result = await mockCheckout(totalItems);
    setOrderId(result.orderId);
    clearCart();
    setStatus("done");
  }

  if (status === "done") {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Bestellung simuliert</h1>
        <p className="server-note">
          Bestellnummer (Mock): #{orderId}. Es wurde keine echte Zahlung oder Datenbank-Speicherung durchgeführt.
        </p>
        <Link href="/items" className="back-link">
          ← Weitere Rezepte entdecken
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mock Checkout</h1>
      <p className="server-note">
        Platzhalter-Checkout für die Entwicklung. Eine echte Zahlungsintegration folgt später.
      </p>

      {items.length === 0 ? (
        <p className="empty-state">Dein Warenkorb ist leer.</p>
      ) : (
        <>
          <div className="posts-list">
            {items.map((item) => (
              <div key={item.id} className="post-card">
                <div className="post-header">
                  <h2>{item.title}</h2>
                  <span>{item.quantity}x</span>
                </div>
              </div>
            ))}
          </div>

          <div className="button-row">
            <button className="primary-button" onClick={handleCheckout} disabled={status === "loading"}>
              {status === "loading" ? "Wird verarbeitet..." : "Bestellung abschließen (Mock)"}
            </button>
          </div>
        </>
      )}

      <div className="button-row">
        <Link href="/cart" className="back-link">
          ← Zurück zum Warenkorb
        </Link>
      </div>
    </main>
  );
}
