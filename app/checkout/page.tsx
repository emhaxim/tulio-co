'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import products from '../../data/products';
import { useCart } from '../providers';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const LOGO_MAP: Record<string, React.ReactNode> = {
  VISA: <img src="/visa.svg" alt="Visa" height={28} style={{ display: 'block', borderRadius: 4, border: '1px solid #e0e0e0', background: '#fff', padding: '2px 6px' }} />,
  MC: <img src="/mastercard.svg" alt="Mastercard" height={28} style={{ display: 'block', borderRadius: 4, border: '1px solid #e0e0e0', background: '#fff', padding: '2px 4px' }} />,
  UnionPay: <img src="/unionpay.svg" alt="UnionPay" height={28} style={{ display: 'block', borderRadius: 4 }} />,
};

const PAYMENT_METHODS = [
  {
    id: 'payfast',
    label: 'PAYFAST -- Free Shipping',
    description: "You'll be redirected to PAYFAST -- Free Shipping to complete your purchase.",
    logos: ['VISA', 'MC', 'UnionPay'],
  },
  {
    id: 'cod',
    label: 'Cash on Delivery (COD)',
    description: 'Pay in cash when your order is delivered.',
    logos: [],
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Enter your card details securely on the next step.',
    logos: ['VISA', 'MC'],
  },
];

export default function CheckoutPage() {
  const { cartItems, removeItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('payfast');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fields, setFields] = useState({ name: '', email: '', address: '', city: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!fields.name.trim()) newErrors.name = 'Full name is required.';
    if (!fields.email.trim()) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) newErrors.email = 'Enter a valid email address.';
    if (!fields.address.trim()) newErrors.address = 'Delivery address is required.';
    if (!fields.city) newErrors.city = 'Please select a city.';
    if (!fields.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (fields.phone.length !== 10) newErrors.phone = 'Enter a valid 10-digit number (e.g. 3001234567).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          paymentMethod,
          items: items.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
          total,
        }),
      });
      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Email error: ${data.error ?? 'Unknown error'}\n\nCheck the terminal for details.`);
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const items = cartItems
    .map((item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as Array<{ product: typeof products[number]; quantity: number }>;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <SiteHeader showNav={false} />
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

        {orderPlaced ? (
          <div className="empty-state" style={{ padding: '56px 28px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌷</div>
            <h2 style={{ margin: '0 0 10px', color: 'var(--green)' }}>Order placed!</h2>
            <p style={{ color: '#6d655c', marginBottom: '28px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
              Thank you for your order. We&apos;ve received it and will be in touch shortly.
            </p>
            <Link href="/" className="button">Back to shop</Link>
          </div>
        ) : items.length === 0 ? (
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
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
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
                  <input
                    type="text"
                    placeholder="Alex Rivera"
                    value={fields.name}
                    onChange={e => { setFields(f => ({ ...f, name: e.target.value })); if (e.target.value.trim()) setErrors(err => ({ ...err, name: '' })); }}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    placeholder="hello@tulio.com"
                    value={fields.email}
                    onChange={e => { setFields(f => ({ ...f, email: e.target.value })); if (e.target.value.trim()) setErrors(err => ({ ...err, email: '' })); }}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </label>
                <label>
                  Delivery address
                  <input
                    type="text"
                    placeholder="4485 Thomas Street"
                    value={fields.address}
                    onChange={e => { setFields(f => ({ ...f, address: e.target.value })); if (e.target.value.trim()) setErrors(err => ({ ...err, address: '' })); }}
                    className={errors.address ? 'input-error' : ''}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </label>
                <label>
                  City
                  <select
                    value={fields.city}
                    onChange={e => {
                      setFields(f => ({ ...f, city: e.target.value }));
                      if (e.target.value) setErrors(err => ({ ...err, city: '' }));
                    }}
                    className={errors.city ? 'input-error' : ''}
                  >
                    <option value="">Select a city</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                  </select>
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </label>
                <label>
                  Phone number
                  <div className={`phone-input-group${errors.phone ? ' input-error' : ''}`}>
                    <span className="phone-prefix">
                      <img src="https://flagcdn.com/pk.svg" alt="PK" width={20} height={14} style={{ borderRadius: 2, display: 'block' }} />
                      +92
                    </span>
                    <input
                      type="tel"
                      placeholder="3001234567"
                      value={fields.phone}
                      maxLength={10}
                      onChange={e => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFields(f => ({ ...f, phone: digits }));
                        if (digits.length === 10) setErrors(err => ({ ...err, phone: '' }));
                      }}
                    />
                  </div>
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </label>
                <label>
                  Special notes
                  <textarea
                    placeholder="Leave a note for the florist."
                    value={fields.notes}
                    onChange={e => setFields(f => ({ ...f, notes: e.target.value }))}
                  />
                </label>

                <div className="payment-section">
                  <h3 className="payment-title">Payment</h3>
                  <p className="payment-subtitle">
                    Your payment method&apos;s billing address must match the shipping address.{' '}
                    <span className="payment-subtitle-highlight">All transactions are secure and encrypted.</span>
                  </p>
                  <ul className="payment-methods">
                    {PAYMENT_METHODS.map((method) => {
                      const selected = paymentMethod === method.id;
                      return (
                        <li key={method.id} className={`payment-method${selected ? ' selected' : ''}`}>
                          <label className="payment-method-label">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selected}
                              onChange={() => setPaymentMethod(method.id)}
                              className="payment-radio"
                            />
                            <span className="payment-method-name">{method.label}</span>
                            {method.logos.length > 0 && (
                              <span className="payment-logos">
                                {method.logos.map((logo) => (
                                  <span key={logo} className="payment-logo">
                                    {LOGO_MAP[logo]}
                                  </span>
                                ))}
                              </span>
                            )}
                          </label>
                          {selected && (
                            <p className="payment-method-description">{method.description}</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <button
                  type="button"
                  className="button"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                >
                  {submitting ? 'Placing order…' : 'Place order'}
                </button>
              </form>
            </div>
          </div>
        )}
        </section>
    </main>
    <SiteFooter />
  </>
  );
}
