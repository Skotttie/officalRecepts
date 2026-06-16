import { prisma } from '../src/lib/prisma';

async function main() {
  // Bestehende Daten löschen
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();

// Testdaten einfügen
  const post1 = await prisma.post.create({
    data: {
      title: "Mein erster Blogpost",
      content: "Willkommen auf meinem Blog!",
      published: true,
      author: "Admin",
      likes: 5,
      comments: {
        create: [
          { text: "Toller Beitrag!", author: "Alice" },
          { text: "Sehr hilfreich!", author: "Bob" },
        ],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "TypeScript ist großartig",
      content: "Warum TypeScript das Leben leichter macht...",
      published: true,
      author: "Admin",
      likes: 3,
    },
  });

  console.log("Seed-Daten erstellt:", { post1, post2 });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());