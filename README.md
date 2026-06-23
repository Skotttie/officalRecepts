# Official Recepts

Official Recepts ist eine kleine Full-Stack-Webanwendung für Rezepte, Blog-Beiträge und einen einfachen Warenkorb. Die App ist als Kursprojekt gebaut und zeigt zentrale Konzepte aus Next.js, Server Components, Client Components, Prisma, PostgreSQL, Server Actions und typsicherer Formularvalidierung.

## Live-Demo

- Vercel-URL: `TODO: https://...vercel.app`
- Repository: `TODO: GitHub-URL eintragen`

Für die Präsentation sollte die deployed Version auf Vercel verwendet werden. Lokale `.env`-Dateien und Datenbank-Zugangsdaten gehören nicht in GitHub.

## Features

- Startseite mit gemeinsamer Navigation über das Root Layout
- Rezept-/Item-Liste mit Suche nach Titel oder Küche
- Filter nach maximaler Zubereitungszeit
- Statisch generierte Rezept-Detailseiten
- Warenkorb mit Mengenänderung, Entfernen, Leeren und LocalStorage
- Mock-Checkout als Server Action
- Blog-Seite mit PostgreSQL-Daten über Prisma
- Beiträge erstellen, bearbeiten und löschen
- Validierung mit Zod und React Hook Form
- Loading-Zustände bei Formularaktionen
- Empty-States für leere Listen und Suchergebnisse

## Tech Stack

- Next.js App Router
- React Server Components und Client Components
- TypeScript
- Prisma ORM
- PostgreSQL, z.B. Neon
- Prisma PostgreSQL Adapter und `pg`
- Zod für Schema-Validierung
- React Hook Form für Formulare
- Next Font für optimierte Schriftarten
- Vercel für Deployment

## Setup

```bash
git clone TODO_REPOSITORY_URL
cd officalRecepts
npm install
cp .env.example .env.local
```

Danach in `.env.local` die echte Datenbank-URL eintragen:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

Die echte Neon-/Postgres-URL darf nicht in GitHub committed werden. `.env.local` ist lokal und wird durch `.gitignore` ausgeschlossen.

## Datenbank

Migrationen ausführen:

```bash
npx prisma migrate deploy
```

Seed-Daten einspielen:

```bash
npm run prisma:seed
```

Prisma-Schema validieren:

```bash
npx prisma validate
```

## Entwicklung

Lokalen Entwicklungsserver starten:

```bash
npm run dev
```

Produktionsbuild testen:

```bash
npm run build
```

## Deployment

1. Repository auf `vercel.com/new` importieren.
2. Framework Preset: Next.js.
3. In Vercel unter `Settings -> Environment Variables` setzen:

```env
DATABASE_URL="postgresql://..."
```

4. Deployment starten.
5. Nach dem Deployment die Live-URL im Browser testen.

Bei jedem Push auf `main` wird automatisch ein neues Deployment erstellt. Pull Requests erhalten Preview-Deployments.

## Architektur

```text
app/
├── actions.ts              # Server Actions für Blog und Mock Checkout
├── layout.tsx              # Root Layout, Navigation, Font und CartProvider
├── page.tsx                # Startseite
├── about/
│   └── page.tsx            # Infoseite
├── items/
│   ├── page.tsx            # Rezeptliste, Server Component mit Revalidate
│   └── [id]/
│       └── page.tsx        # Statisch generierte Detailseiten
├── posts/
│   └── page.tsx            # Blog-Seite mit Prisma/Postgres
└── cart/
    ├── page.tsx            # Warenkorb im Browser
    └── checkout/
        └── page.tsx        # Mock Checkout

src/
├── components/             # Wiederverwendbare UI- und Feature-Komponenten
│   ├── AddToCartButton.tsx
│   ├── CartNavLink.tsx
│   ├── NewPostForm.tsx
│   ├── PostList.tsx
│   └── SearchableItems.tsx
├── context/
│   └── CartContext.tsx     # Warenkorb-State und LocalStorage
├── lib/
│   ├── items.ts            # Statische Rezeptdaten
│   └── prisma.ts           # Prisma Client mit PostgreSQL Adapter
└── schemas/
    └── post.ts             # Zod-Schemas für Blog-Formulare

prisma/
├── schema.prisma           # Datenmodell und PostgreSQL Provider
├── seed.ts                 # Seed-Daten für Blog/Kommentare
└── migrations/             # SQL-Migrationen
```

## Datenmodell

Die Datenbank enthält aktuell diese Prisma-Modelle:

- `User`: Autorendaten für Items
- `Item`: Rezept-/Katalogeinträge
- `Comment`: Kommentare zu Items oder Posts
- `Post`: Blog-Beiträge mit Titel, Inhalt, Status und Zeitstempeln

Die Blog-Seite nutzt die Datenbank aktiv. Die Rezeptliste nutzt derzeit statische Beispieldaten aus `src/lib/items.ts`.

## Rendering und Caching

- `/items`: `revalidate = 3600`, die Seite wird gecacht und stündlich revalidiert.
- `/items/[id]`: statisch generierte Detailseiten über `generateStaticParams`.
- `/posts`: `dynamic = "force-dynamic"`, damit Blog-Daten zur Laufzeit aus Postgres geladen werden.
- Server Actions für Blog-Mutationen rufen `revalidatePath("/posts")` auf.

## Screenshots

Mindestens 2 bis 3 Screenshots sollten vor der Abgabe ergänzt werden:

```text
docs/screenshots/home.png
docs/screenshots/items.png
docs/screenshots/posts.png
```

Empfohlene Screenshots:

- Startseite oder Rezeptliste
- Rezeptdetail mit Warenkorb-Button
- Blog-Seite mit Formular und Beiträgen
- Optional: Warenkorb oder Checkout

## Aufgabe 11.1: Präsentation

Zeit: 3 bis 5 Minuten pro Gruppe.

### Ablaufvorschlag

1. Live-Demo, ca. 1 Minute
   - Vercel-URL öffnen.
   - Rezeptliste zeigen.
   - Suche und Zeitfilter kurz demonstrieren.
   - Ein Rezept öffnen und in den Warenkorb legen.
   - Blog-Beitrag erstellen oder vorhandenen Beitrag bearbeiten.

2. Architektur, ca. 1 Minute
   - Next.js App Router mit `app/`.
   - Server Components für Datenladen und Seiten.
   - Client Components für Suche, Formulare und Warenkorb.
   - Prisma mit PostgreSQL/Neon für Blog-Daten.
   - Server Actions für Create, Update, Delete und Checkout.

3. Highlight und Lernerfahrung, ca. 30 Sekunden
   - Highlight: Kombination aus Server Actions, Zod-Validierung und Prisma.
   - Besonders hilfreich: klare Trennung zwischen Server- und Client-Logik.

4. Retrospektive, ca. 30 Sekunden
   - Herausforderung: Deployment mit Environment-Variablen und gehosteter Datenbank.
   - Beim nächsten Mal: früher deployen und Datenbank/Env-Setup direkt dokumentieren.

## Aufgabe 11.2: Feature Freeze & Polish

Keine neuen Features mehr. Fokus: Bugs, UX, Edge Cases und Responsive-Verhalten.

### Testdurchlauf

- [ ] Startseite lädt ohne Fehler.
- [ ] Navigation funktioniert auf allen Seiten.
- [ ] `/items` lädt und Suche/Filter funktionieren.
- [ ] Suchergebnis ohne Treffer zeigt Empty-State.
- [ ] `/items/[id]` zeigt Details.
- [ ] Ungültige Item-URL wird sinnvoll behandelt.
- [ ] Warenkorb: Hinzufügen, Menge ändern, Entfernen, Leeren.
- [ ] Warenkorb bleibt nach Reload über LocalStorage erhalten.
- [ ] Checkout funktioniert als Mock-Aktion.
- [ ] `/posts` lädt mit Daten aus Postgres.
- [ ] Blog-Beitrag erstellen funktioniert.
- [ ] Blog-Beitrag bearbeiten funktioniert.
- [ ] Blog-Beitrag löschen funktioniert.
- [ ] Zod-Validierung zeigt verständliche Fehlermeldungen.
- [ ] Buttons sind während laufender Aktionen deaktiviert.
- [ ] App ist in Mobile-Ansicht bedienbar.
- [ ] Tab-Navigation ist nachvollziehbar.

### Bug-Liste

| Priorität | Problem | Status | Notiz |
| --- | --- | --- | --- |
| Kritisch | TODO | Offen | Blockiert zentrale Nutzung |
| Mittel | TODO | Offen | UX oder Edge Case verbessern |
| Niedrig | TODO | Offen | Polish |

### Polish-Ideen

- Erfolgsfeedback nach Erstellen, Bearbeiten oder Löschen eines Blog-Beitrags ergänzen.
- Fehlerzustände bei Datenbank-/Netzwerkproblemen sichtbarer machen.
- Lange Titel und Inhalte auf kleinen Bildschirmen prüfen.
- Lighthouse Mobile Audit nach Deployment wiederholen.

## Aufgabe 11.3: Code Review Marathon

Für das Review eines anderen Teams:

1. Repository-URL austauschen.
2. Projekt klonen.
3. README-Setup befolgen.
4. App lokal starten.
5. Code Review schriftlich als GitHub Issue, Review oder Dokument abgeben.

### Review-Vorlage

```md
# Code Review für [Projektname]

## Positive Aspekte

1. ...
2. ...
3. ...

## Bugs

1. ...
2. ...
3. ...

## Verbesserungsvorschläge

1. ...
2. ...
3. ...

## Sicherheit

- ...

## Lesbarkeit und Struktur

- ...
```

### Review-Kriterien

- Saubere Trennung von Server und Client Components
- Verständliche Ordnerstruktur
- Validierung in Client und Server Actions
- Keine Secrets im Repository
- Gute Empty-, Loading- und Error-States
- Responsive Layout
- Verständliche README und Setup-Anleitung

## Aufgabe 11.4: Dokumentation

Diese README deckt die wichtigsten Punkte ab:

- Projektbeschreibung
- Tech Stack
- Setup-Anleitung
- Deployment-Anleitung
- Architektur-Überblick
- Datenmodell
- Caching-Strategie
- Präsentationsleitfaden
- Polish-Checkliste
- Review-Vorlage
- Retrospektive

Vor der finalen Abgabe noch ergänzen:

- [ ] Live-URL eintragen.
- [ ] GitHub-URL eintragen.
- [ ] Screenshots im Ordner `docs/screenshots/` ergänzen.
- [ ] Team-Mitglieder und Beiträge ausfüllen.
- [ ] Bug-Liste aktualisieren.

## Team

| Name | Beitrag |
| --- | --- |
| TODO | TODO |
| TODO | TODO |
| TODO | TODO |

## Aufgabe 11.5: Retrospektive & Reflexion

### Was war leicht?

- React-Komponenten wiederverwenden
- Seiten im App Router strukturieren
- Einfache Client-Interaktionen wie Suche, Filter und Warenkorb

### Was war schwer?

- Unterschied zwischen Server Components und Client Components sauber einhalten
- Environment-Variablen korrekt lokal und auf Vercel setzen
- Prisma mit einer gehosteten PostgreSQL-Datenbank verbinden
- Deployment-Probleme systematisch debuggen

### Was würden wir als Nächstes bauen?

- Eine echte Bestellfunktion mit Order-Tabelle
- Authentifizierung für Benutzer
- Admin-Bereich für Rezepte und Blog-Beiträge
- Bilder-Upload für Rezepte

### Was wollen wir noch lernen?

- Auth mit Next.js
- Bessere Fehlerbehandlung in Server Actions
- Testing mit Playwright oder Vitest
- Performance-Optimierung mit Lighthouse
- Datenmodellierung mit Prisma in größeren Projekten

### Wie hat KI geholfen?

- Beim Strukturieren von Komponenten und Server Actions
- Beim Debuggen von Prisma-, Env- und Deployment-Problemen
- Beim Formulieren von README, Review-Checklisten und Präsentationspunkten

Wichtig bleibt: KI-Vorschläge sollten verstanden, getestet und an das eigene Projekt angepasst werden. Besonders bei Secrets, Datenbankzugriffen und Deployment-Konfiguration darf Code nicht blind übernommen werden.

