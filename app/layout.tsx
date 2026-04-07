import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tulio Florist',
  description: 'Tulio flower shop landing page with listings, search, and cart functionality.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
