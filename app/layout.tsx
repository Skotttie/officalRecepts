import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Simple placeholder app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <nav className="site-nav">
          <div className="nav-inner">
            <Link href="/" className="nav-link">
              Start
            </Link>
            <Link href="/items" className="nav-link">
              Einträge
            </Link>
            <Link href="/posts" className="nav-link">
              Blog
            </Link>
            <Link href="/about" className="nav-link">
              Über uns
            </Link>
          </div>
        </nav>

        <div className="layout-explanation">
          <strong>Layout-Erklärung:</strong> Diese Navigation kommt aus dem Root Layout und bleibt auf allen Seiten gleich. Beim Klick auf einen internen Link tauscht Next.js nur den Seiteninhalt aus.
        </div>

        {children}
      </body>
    </html>
  );
}
