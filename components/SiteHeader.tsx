'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '../data/products';
import { useCart } from '../app/providers';

export default function SiteHeader({ showNav = true }: { showNav?: boolean }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, removeItem, totalItems } = useCart();

  const cart = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((product) => product.id === item.id);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<{ product: typeof products[number]; quantity: number }>,
    [cartItems]
  );

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <div className="site-brand">
            <span className="brand-mark" aria-hidden="true">🌷</span>
            <span>Bouqora</span>
          </div>
          <div className="nav-links">
            <Link href="#shop">Shop</Link>
            {/* <Link href="#contact">Contact</Link> */}
            <button type="button" className="cart-toggle" onClick={() => setCartOpen(true)}>
              <span className="cart-icon" aria-hidden="true">🛒</span>
              <span>Cart</span>
              {totalItems ? <span className="cart-count">{totalItems}</span> : null}
            </button>
          </div>
        </nav>
      </header>

      {cartOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer" role="dialog" aria-label="Your basket">
            <div className="cart-drawer__header">
              <div>
                <span className="drawer-title">Your Basket</span>
                <p className="drawer-subtitle">Review your flowers before checkout.</p>
              </div>
              <button type="button" className="drawer-close" onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>
            <div className="cart-drawer__body">
              {cart.length === 0 ? (
                <div className="cart-drawer__empty">
                  <p>Your basket is currently empty.</p>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setCartOpen(false);
                    }}
                  >
                    Shop all
                  </button>
                </div>
              ) : (
                <>
                  <ul className="cart-list">
                    {cart.map(({ product, quantity }) => (
                      <li key={product.id} className="cart-item">
                        <div className="cart-item__media">
                          <Image src={product.image} alt={product.name} width={88} height={88} sizes="88px" />
                        </div>
                        <div className="cart-item__details">
                          <strong>{product.name}</strong>
                          <div className="cart-item__meta">{quantity} × ${product.price.toFixed(2)}</div>
                        </div>
                        <button type="button" className="button secondary" onClick={() => removeItem(product.id)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-summary">
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  <Link href="/checkout" className="button">
                    Checkout
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
