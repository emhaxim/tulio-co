import { describe, expect, it } from 'vitest';
import { calculateSubtotal, escapeHtml, validateOrder, type OrderBody } from '../lib/order';

const validOrder: OrderBody = {
  name: 'Ayesha Khan',
  email: 'ayesha@example.com',
  address: '12 Garden Road',
  city: 'lahore',
  phone: '3001234567',
  notes: '',
  paymentMethod: 'cod',
  items: [
    { name: 'Picnic', quantity: 2, price: 50 },
    { name: 'Queen Bee', quantity: 1, price: 72 },
  ],
  total: 172,
};

describe('escapeHtml', () => {
  it('escapes characters that could inject HTML into the order email', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml("Tom & Jerry's")).toBe('Tom &amp; Jerry&#39;s');
  });

  it('leaves plain text unchanged and handles empty values', () => {
    expect(escapeHtml('Pink Pearl')).toBe('Pink Pearl');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(null)).toBe('');
  });
});

describe('calculateSubtotal', () => {
  it('sums price × quantity across items', () => {
    expect(calculateSubtotal(validOrder.items)).toBe(172);
  });

  it('returns 0 for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it('rounds to cents', () => {
    expect(calculateSubtotal([{ name: 'x', quantity: 3, price: 0.1 }])).toBe(0.3);
  });
});

describe('validateOrder', () => {
  it('accepts a complete order', () => {
    expect(validateOrder(validOrder)).toEqual([]);
  });

  it('rejects a missing body', () => {
    expect(validateOrder(null)).toEqual(['Request body is missing']);
  });

  it('requires customer fields', () => {
    const errors = validateOrder({ ...validOrder, name: '  ', phone: '' });
    expect(errors).toContain('name is required');
    expect(errors).toContain('phone is required');
  });

  it('rejects an invalid email', () => {
    expect(validateOrder({ ...validOrder, email: 'not-an-email' })).toContain('email is invalid');
  });

  it('rejects an empty cart', () => {
    expect(validateOrder({ ...validOrder, items: [] })).toContain(
      'items must contain at least one item'
    );
  });

  it('rejects bad quantities and prices', () => {
    const errors = validateOrder({
      ...validOrder,
      items: [{ name: 'Picnic', quantity: 0, price: -5 }],
    });
    expect(errors).toContain('items[0].quantity must be a positive whole number');
    expect(errors).toContain('items[0].price must be a non-negative number');
  });
});
