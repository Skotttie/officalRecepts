# Deployment auf Vercel

## Lokale Umgebung

1. `.env.example` nach `.env.local` kopieren.
2. `DATABASE_URL` mit der Connection-URL der gehosteten Postgres-Datenbank setzen.
3. Dependencies installieren und Prisma vorbereiten:

```bash
npm install
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed
```

## Vercel

1. Repository auf `vercel.com/new` importieren.
2. Framework-Preset: Next.js.
3. Unter `Settings -> Environment Variables` setzen:

```bash
DATABASE_URL=postgresql://...
```

`DATABASE_URL` darf nicht mit `NEXT_PUBLIC_` beginnen, weil sie nur serverseitig verfügbar sein soll.

## Datenbank-Migration

Das Projekt ist für Vercel von SQLite auf Postgres umgestellt:

- `prisma/schema.prisma`: `provider = "postgresql"`
- `src/lib/prisma.ts`: Prisma Postgres Adapter
- `prisma/migrations/.../migration.sql`: Postgres-kompatible Initialmigration

Für eine frische gehostete Datenbank:

```bash
npx prisma migrate deploy
npm run prisma:seed
```

Wenn lokal eine alte SQLite-Entwicklungsdatenbank existiert, wird sie nicht weiterverwendet. Die neue lokale `.env.local` muss auf eine Postgres-Datenbank zeigen.

## Rendering und Caching

- `/posts`: dynamisches Rendering zur Laufzeit, damit der Produktions-Build keine Live-Datenbank zum Prerendern benötigt.
- `/items`: `revalidate = 3600`; statische Daten werden stündlich revalidiert.
- `/items/[id]`: statisch vorgerenderte Detailseiten per `generateStaticParams`.

## Lighthouse

Nach dem Deployment in Chrome DevTools unter `Lighthouse` testen:

- Mode: Navigation
- Device: Mobile
- Category: Performance
- Ziel: 80+

Aktuelle Performance-Vorbereitung im Projekt:

- `next/font` im Root Layout
- statisch vorgerenderte Rezept-Detailseiten
- gezielte Revalidierung für Datenbankseiten statt dauerhaft dynamischem Rendering
