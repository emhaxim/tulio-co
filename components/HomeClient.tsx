'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '../data/products';
import { useCart } from '../app/providers';
import TypingText from './TypingText';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

type Product = typeof products[number];

export default function HomeClient() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);
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
      .filter(Boolean) as Array<{ product: Product; quantity: number }>;
  }, [cartItems]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (id: string) => {
    addItem(id);
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  const closeModal = () => setActiveProduct(null);

  useEffect(() => {
    if (!activeProduct) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeProduct]);

  return (
    <>
      <SiteHeader />
      <main className={activeProduct ? 'page-blurred' : ''}>
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

        <section className="section" id="shop">
          <div className="topbar">
            <div>
              <h2>Featured Bouquets</h2>
              <p style={{ margin: '4px 0 0', color: '#6d655c' }}>
                {filteredProducts.length} beautiful arrangements to explore.
              </p>
            </div>
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
                <button
                  type="button"
                  className="product-link product-link--btn"
                  onClick={() => { setActiveProduct(product); setModalQty(1); }}
                  aria-label={`View ${product.name}`}
                >
                  <Image src={product.image} alt={product.name} width={500} height={330} />
                </button>
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
      </main>
      <SiteFooter />

      {activeProduct && (
        <>
          <div className="product-modal-backdrop" onClick={closeModal} aria-hidden="true" />
          <div className="product-modal" role="dialog" aria-modal="true" aria-label={activeProduct.name}>
            <div className="product-modal__media">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                width={700}
                height={560}
              />
            </div>
            <div className="product-modal__copy">
              <button className="product-modal__close" type="button" onClick={closeModal} aria-label="Close">
                ✕
              </button>
              <div className="hero-tag">Tulio floral studio</div>
              <h2>{activeProduct.name}</h2>
              <p className="detail-description">{activeProduct.description}</p>
              <div className="product-meta" style={{ gap: '14px', marginTop: '24px' }}>
                <span className="badge">{activeProduct.tag}</span>
                <strong style={{ fontSize: '1.35rem' }}>${activeProduct.price.toFixed(2)}</strong>
              </div>
              <div style={{ marginTop: '24px' }}>
                <div className="qty-label">QUANTITY</div>
                <div className="qty-stepper">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{modalQty}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setModalQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button type="button" className="button secondary" onClick={closeModal}>
                  Back to shop
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    for (let i = 0; i < modalQty; i++) addToCart(activeProduct.id);
                    closeModal();
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
