"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../src/lib/prisma";

export async function getPosts() {
  return prisma.post.findMany({
    include: { comments: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPost(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: { comments: true },
  });
}

export async function createPost(title: string, content: string) {
  await prisma.post.create({
    data: {
      title,
      content,
      published: true,
    },
  });

  revalidatePath("/posts");
}

export async function updatePost(id: number, title: string, content: string) {
  await prisma.post.update({
    where: { id },
    data: { title, content },
  });

  revalidatePath("/posts");
}

export async function deletePost(id: number) {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/posts");
}

// Mock-Checkout: simuliert eine Bestellung ohne echte Zahlungsabwicklung
// oder Datenbank-Speicherung. Dient als Platzhalter, bis ein echter
// Checkout-Flow (Zahlung, Order-Tabelle) angebunden wird.
export async function mockCheckout(itemCount: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    orderId: Math.floor(Math.random() * 1_000_000),
    itemCount,
  };
}
