"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartNavLink() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="nav-link">
      Warenkorb{totalItems > 0 ? ` (${totalItems})` : ""}
    </Link>
  );
}
