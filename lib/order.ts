export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderBody {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  notes: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape user-supplied text before inserting it into the order email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

/** Sum of price × quantity for every line item, rounded to cents. */
export function calculateSubtotal(items: OrderItem[]): number {
  const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return Math.round(sum * 100) / 100;
}

/** Returns a list of problems with the order; an empty list means it is valid. */
export function validateOrder(body: Partial<OrderBody> | null | undefined): string[] {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') return ['Request body is missing'];

  for (const field of ['name', 'email', 'address', 'city', 'phone'] as const) {
    const value = body[field];
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${field} is required`);
    }
  }

  if (typeof body.email === 'string' && body.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('email is invalid');
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push('items must contain at least one item');
  } else {
    body.items.forEach((item, i) => {
      if (!item || typeof item.name !== 'string' || item.name.trim() === '') {
        errors.push(`items[${i}].name is required`);
      }
      if (!item || !Number.isInteger(item.quantity) || item.quantity < 1) {
        errors.push(`items[${i}].quantity must be a positive whole number`);
      }
      if (!item || typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0) {
        errors.push(`items[${i}].price must be a non-negative number`);
      }
    });
  }

  if (typeof body.total !== 'number' || !Number.isFinite(body.total) || body.total < 0) {
    errors.push('total must be a non-negative number');
  }

  return errors;
}
