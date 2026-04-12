import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderBody {
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

export async function POST(req: NextRequest) {
  const body: OrderBody = await req.json();
  const { name, email, address, city, phone, notes, paymentMethod, items, total } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const itemRows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e8f0eb;">${item.name}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e8f0eb;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e8f0eb;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const paymentLabels: Record<string, string> = {
    payfast: 'PayFast (Free Shipping)',
    cod: 'Cash on Delivery (COD)',
    card: 'Credit / Debit Card',
  };

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#faf8f5;padding:32px;border-radius:16px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span style="font-size:2rem;">🌷</span>
        <h1 style="margin:8px 0 4px;color:#214B37;font-size:1.5rem;letter-spacing:-0.02em;">New Order Received</h1>
        <p style="color:#6d8c7a;margin:0;font-size:0.95rem;">Bud & Petal Floral Studio</p>
      </div>

      <div style="background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid #d6e6dd;">
        <h2 style="margin:0 0 16px;color:#214B37;font-size:1rem;text-transform:uppercase;letter-spacing:0.06em;">Customer Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.95rem;color:#214B37;">
          <tr><td style="padding:6px 0;color:#6d8c7a;width:130px;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:6px 0;color:#6d8c7a;">Email</td><td style="padding:6px 0;">${email}</td></tr>
          <tr><td style="padding:6px 0;color:#6d8c7a;">Phone</td><td style="padding:6px 0;">+92 ${phone}</td></tr>
          <tr><td style="padding:6px 0;color:#6d8c7a;">Address</td><td style="padding:6px 0;">${address}</td></tr>
          <tr><td style="padding:6px 0;color:#6d8c7a;">City</td><td style="padding:6px 0;text-transform:capitalize;">${city}</td></tr>
          <tr><td style="padding:6px 0;color:#6d8c7a;">Payment</td><td style="padding:6px 0;">${paymentLabels[paymentMethod] ?? paymentMethod}</td></tr>
          ${notes ? `<tr><td style="padding:6px 0;color:#6d8c7a;vertical-align:top;">Notes</td><td style="padding:6px 0;">${notes}</td></tr>` : ''}
        </table>
      </div>

      <div style="background:#fff;border-radius:12px;padding:24px;margin-bottom:20px;border:1px solid #d6e6dd;">
        <h2 style="margin:0 0 16px;color:#214B37;font-size:1rem;text-transform:uppercase;letter-spacing:0.06em;">Order Items</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.95rem;color:#214B37;">
          <thead>
            <tr style="background:#f0f7f3;">
              <th style="padding:10px 12px;text-align:left;font-weight:700;border-radius:8px 0 0 0;">Item</th>
              <th style="padding:10px 12px;text-align:center;font-weight:700;">Qty</th>
              <th style="padding:10px 12px;text-align:right;font-weight:700;border-radius:0 8px 0 0;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <div style="text-align:right;margin-top:16px;font-size:1.1rem;font-weight:700;color:#214B37;">
          Total: $${total.toFixed(2)}
        </div>
      </div>

      <p style="text-align:center;color:#6d8c7a;font-size:0.85rem;margin:0;">
        This notification was sent automatically by Bud & Petal.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Bud & Petal Orders" <${process.env.GMAIL_USER}>`,
      to: 'emhaxim@gmail.com',
      subject: `🌷 New Order from ${name} — $${total.toFixed(2)}`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Email send error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
