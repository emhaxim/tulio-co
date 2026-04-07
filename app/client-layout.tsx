'use client';

import { CartProvider } from './providers';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
