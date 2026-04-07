import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '../../../data/products';

type PageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params: { id } }: PageProps) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <section className="section">
        <div className="detail-grid">
          <div className="detail-media">
            <Image src={product.image} alt={product.name} width={900} height={700} />
          </div>
          <div className="detail-copy">
            <div className="hero-tag">Tulio floral studio</div>
            <h1>{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <div className="product-meta" style={{ gap: '14px', marginTop: '24px' }}>
              <span className="badge">{product.tag}</span>
              <strong style={{ fontSize: '1.35rem' }}>${product.price.toFixed(2)}</strong>
            </div>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/" className="button secondary">
                Back to shop
              </Link>
              <Link href="/" className="button">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
