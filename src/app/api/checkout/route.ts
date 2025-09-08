export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

interface CheckoutRequestBody {
  name: string;
  email: string;
  address: string;
  contact: string;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const { name, email, address, contact, cart, total } = body;

    if (!name || !email || !address || !contact || !Array.isArray(cart)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT)
      : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmailEnv = process.env.FROM_EMAIL || smtpUser;

    // If SMTP is not configured, create an Ethereal test account for development
    let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    let fromEmail = fromEmailEnv;
    let usingEthereal = false;

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmailEnv) {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      fromEmail = `Shopping Center <${testAccount.user}>`;
      usingEthereal = true;
    } else {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
    }

    const itemsTable = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const text = `Hello ${name},\n\nThank you for your order!\n\nOrder ID: ${orderId}\nContact: ${contact}\nAddress: ${address}\n\nItems:\n${itemsTable}\n\nTotal: $${total.toFixed(
      2
    )}\n\nWe will notify you when your order ships.\n\nBest regards,\nShopping Center`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank you for your order, ${name}!</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Address:</strong> ${address}</p>
        <h3>Items</h3>
        <ul>
          ${cart
            .map(
              (item) =>
                `<li>${item.name} x ${item.quantity} — $${(item.price * item.quantity).toFixed(
                  2
                )}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p>We will notify you when your order ships.</p>
        <p>— Shopping Center</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: `Your order ${orderId} at Shopping Center`,
      text,
      html,
    });

    const previewUrl = usingEthereal ? nodemailer.getTestMessageUrl(info) : undefined;

    return NextResponse.json({ success: true, orderId, previewUrl });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Failed to send order email" },
      { status: 500 }
    );
  }
}


