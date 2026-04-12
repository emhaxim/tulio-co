'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
      <div className="footer-brand-row">
        <span className="footer-logo">🌷 Bud & Petal</span>
      </div>

      <div className="footer-grid">
        <div className="footer-column">
          <p className="footer-heading">The Bouqs Co.</p>
          <Link href="#">About Us</Link>
          <Link href="#">Blog</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Services</p>
          <Link href="#">Events</Link>
          <Link href="#">Weddings</Link>
          <Link href="#">Corporate Gifts</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Store Locations</p>
          <Link href="#">Islamabad</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Help</p>
          <Link href="#">Help Center</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Privacy Policy</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Local Delivery</p>
          <Link href="#">Islamabad</Link>
          <Link href="#">Rawalpindi</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="https://instagram.com/Bud & Petal" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.56 0-2.385-1.715-4.052-4.163-4.052-2.837 0-4.5 2.126-4.5 4.323 0 .856.33 1.772.741 2.273a.3.3 0 0 1 .069.284c-.076.312-.244 .995-.277 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </a>
        </div>
        <div className="footer-copy">
          <p>© 2026 Bud & Petal. All Rights Reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
