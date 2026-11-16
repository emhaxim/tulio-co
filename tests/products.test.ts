import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import products from '../data/products';

describe('product catalogue', () => {
  it('has at least one product', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('uses unique, URL-safe ids', () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('gives every product a name, description and positive price', () => {
    for (const p of products) {
      expect(p.name.trim(), p.id).not.toBe('');
      expect(p.description.trim(), p.id).not.toBe('');
      expect(p.price, p.id).toBeGreaterThan(0);
    }
  });

  it('points every product at an image that exists in public/', () => {
    for (const p of products) {
      const file = join(process.cwd(), 'public', p.image);
      expect(existsSync(file), `${p.id}: missing ${p.image}`).toBe(true);
    }
  });
});
