"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../src/lib/prisma";
import { CreatePostSchema, UpdatePostSchema, type CreatePostInput, type UpdatePostInput } from "../src/schemas/post";

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

export async function createPost(input: CreatePostInput) {
  // Validierung zur Laufzeit, unabhängig von der Client-seitigen Prüfung.
  const { title, content } = CreatePostSchema.parse(input);

  await prisma.post.create({
    data: {
      title,
      content,
      published: true,
    },
  });

  revalidatePath("/posts");
}

export async function updatePost(id: number, input: UpdatePostInput) {
  const { title, content } = UpdatePostSchema.parse(input);

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
