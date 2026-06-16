"use client";

import { useCart } from "../context/CartContext";

type Props = {
  item: {
    id: number;
    title: string;
    cuisine: string;
    prepTime: number;
  };
};

export default function AddToCartButton({ item }: Props) {
  const { addItem } = useCart();

  return (
    <button className="primary-button" onClick={() => addItem(item)}>
      In den Warenkorb
    </button>
  );
}
