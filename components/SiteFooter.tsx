'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-row">
        <span className="footer-logo">🌷 Bouqora</span>
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
          <a href="https://instagram.com/bouqora" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M16.5 2.5a5.5 5.5 0 0 1-5.5 5.5v5.5a3.5 3.5 0 1 1-3.5-3.5V8.5a9.5 9.5 0 1 0 9.5-9.5h.5v3z" />
            </svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.16 6.84 9.47-.09-.8-.17-2.03.03-2.9.19-.8 1.24-5.12 1.24-5.12s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.05.52 1.91 1.55 1.91 1.86 0 3.31-1.96 3.31-4.78 0-2.49-1.79-4.23-4.35-4.23-2.96 0-4.73 2.22-4.73 4.52 0 .9.35 1.86.79 2.38.09.11.1.2.07.31-.08.35-.26 1.12-.3 1.28-.05.2-.17.25-.4.15-1.49-.69-2.42-2.88-2.42-4.64 0-3.78 2.74-7.24 7.91-7.24 4.15 0 7.37 2.96 7.37 6.93 0 4.14-2.62 7.47-6.26 7.47-1.22 0-2.38-.63-2.77-1.37 0 0-.59 2.24-.73 2.78-.22.83-.82 1.66-1.31 2.33C9.1 22.78 10.52 23 12 23c5.52 0 10-4.48 10-10S17.52 3 12 3z" />
            </svg>
          </a>
        </div>
        <div className="footer-copy">
          <p>© 2026 Bouqora. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
