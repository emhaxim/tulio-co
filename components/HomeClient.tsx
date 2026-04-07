'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '../data/products';
import { useCart } from '../app/providers';
import TypingText from './TypingText';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function HomeClient() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const { cartItems, addItem, removeItem, totalItems } = useCart();

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.tag))).sort()],
    []
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesText =
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.tag.toLowerCase().includes(search.toLowerCase());
        const matchesTag = selectedTag === 'All' || product.tag === selectedTag;
        return matchesText && matchesTag;
      }),
    [search, selectedTag]
  );

  const cart = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = products.find((product) => product.id === item.id);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter(Boolean) as Array<{ product: typeof products[number]; quantity: number }>;
  }, [cartItems]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (id: string) => {
    addItem(id);
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="section hero">
          <div className="hero-copy">
            <div className="hero-tag">Florist · Artful bouquets · deliver at your door step</div>
            <TypingText text="All About Flowers" as="h1" speed={80} />
            <p>Discover hand-curated bouquets, wedding arrangements, and gift-ready blooms crafted for every moment.</p>
            <div className="cta-row">
              <div className="input-group">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search bouquets, colors, or styles"
                  aria-label="Search listings"
                />
                <button type="button" onClick={() => setSearch('')}>Clear</button>
              </div>
              <Link href="#shop" className="button">
                Explore bouquets
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src="/products/popular.avif"
              alt="Tulio bouquet"
              width={860}
              height={640}
              priority
            />
          </div>
        </section>

        {/* <section className="section features">
          <div className="feature-card">
            <h3>Local designer bouquets</h3>
            <p>Fresh blooms arranged daily with warm tones and long-lasting textures.</p>
          </div>
          <div className="feature-card">
            <h3>Fast delivery</h3>
            <p>Same-day delivery available for local orders and weekend shipping nationwide.</p>
          </div>
          <div className="feature-card">
            <h3>Custom orders</h3>
            <p>Tell us your vision and weâ€™ll craft a custom arrangement just for you.</p>
          </div>
        </section> */}

        <section className="section" id="shop">
          <div className="topbar">
            <div>
              <h2>Featured Bouquets</h2>
              <p style={{ margin: '4px 0 0', color: '#6d655c' }}>
                {filteredProducts.length} beautiful arrangements to explore.
              </p>
            </div>
            <button type="button" onClick={() => {
              setSearch('');
              setSelectedTag('All');
            }}>
              Show all
            </button>
          </div>
          <div className="filters">
            {categories.map((tag) => (
              <button
                key={tag}
                type="button"
                className={selectedTag === tag ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="listings-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product">
                <Link href={`/products/${product.id}`} className="product-link">
                  <Image src={product.image} alt={product.name} width={500} height={330} />
                </Link>
                <div className="product-body">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-meta">
                    <span className="badge">{product.tag}</span>
                    <button type="button" onClick={() => addToCart(product.id)}>
                      Add to cart ${product.price.toFixed(2)}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* <section className="section cart" id="cart">
          <div className="cart-header">
            <div>
              <h2>Your cart</h2>
              <p style={{ margin: '4px 0 0', color: '#6d655c' }}>
                {totalItems} item{totalItems === 1 ? '' : 's'} in your bag.
              </p>
            </div>
            <Link href="/checkout" className="button">
              Proceed to checkout
            </Link>
          </div>

          {cart.length === 0 ? (
            <p style={{ color: '#766e63' }}>Your cart is empty. Add a bouquet to get started.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map(({ product, quantity }) => (
                  <li key={product.id} className="cart-item">
                    <div>
                      <strong>{product.name}</strong>
                      <div style={{ color: '#766e63', marginTop: 4 }}>
                        {quantity} Ã— ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFromCart(product.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <span style={{ fontWeight: 700 }}>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </>
          )}
        </section> */}

        {/* <section className="section contact" id="contact">
          <div className="contact-copy">
            <span className="hero-tag">Get in touch</span>
            <h2>Let Tulio help you say it beautifully</h2>
            <p>Questions about delivery, custom arrangements, or event work? Reach out and weâ€™ll create the perfect bouquet.</p>
            <div className="contact-actions">
              <a href="mailto:hello@tulio.com" className="button">
                Email us
              </a>
              <a href="tel:+1234567890" className="button secondary">
                Call Tulio
              </a>
            </div>
          </div>
        </section> */}
      </main>
      <SiteFooter />
    </>
  );
}

