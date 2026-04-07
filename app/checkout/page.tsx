'use client';

import Link from 'next/link';
import products from '../../data/products';
import { useCart } from '../providers';

export default function CheckoutPage() {
  const { cartItems, removeItem, clearCart } = useCart();

  const items = cartItems
    .map((item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as Array<{ product: typeof products[number]; quantity: number }>;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main>
      <section className="section">
        <div className="checkout-header">
          <div>
            <span className="hero-tag">Checkout</span>
            <h1>Complete your order</h1>
            <p className="detail-description">Review your bouquet selection and enter your details to finalize the order.</p>
          </div>
          <Link href="/" className="button secondary">
            Back to shop
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty. Add a bouquet and return here to checkout.</p>
            <Link href="/" className="button">
              Browse bouquets
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="checkout-summary">
              <h2>Order summary</h2>
              <ul className="cart-list">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="cart-item">
                    <div>
                      <strong>{product.name}</strong>
                      <div style={{ color: '#766e63', marginTop: 4 }}>
                        {quantity} × ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <button type="button" className="button secondary" onClick={() => removeItem(product.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" className="button" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            <div className="checkout-form">
              <h2>Delivery details</h2>
              <form>
                <label>
                  Full name
                  <input type="text" placeholder="Alex Rivera" />
                </label>
                <label>
                  Email address
                  <input type="email" placeholder="hello@tulio.com" />
                </label>
                <label>
                  Delivery address
                  <input type="text" placeholder="4485 Thomas Street" />
                </label>
                <label>
                  Special notes
                  <textarea placeholder="Leave a note for the florist." />
                </label>
                <button type="button" className="button">
                  Place order
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
