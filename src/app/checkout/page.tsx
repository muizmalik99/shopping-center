import CheckoutClient from "./CheckoutClient";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type CheckoutActionState = {
  success?: boolean;
  orderId?: string;
  previewUrl?: string;
  error?: string;
};

export async function placeOrderAction(
  _prevState: CheckoutActionState,
  formData: FormData
): Promise<CheckoutActionState> {
  "use server";
  try {
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const address = String(formData.get("address") || "");
    const contact = String(formData.get("contact") || "");
    const cartJson = String(formData.get("cart") || "[]");
    const totalStr = String(formData.get("total") || "0");

    const cart: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }> = JSON.parse(cartJson);
    const total = Number(totalStr);

    if (!name || !email || !address || !contact || !Array.isArray(cart)) {
      return { error: "Missing required fields" };
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT)
      : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmailEnv = process.env.FROM_EMAIL || smtpUser;

    let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    let fromEmail = fromEmailEnv;
    let usingEthereal = false;

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmailEnv) {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
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
          `${item.name} x ${item.quantity} — $${(
            item.price * item.quantity
          ).toFixed(2)}`
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
                `<li>${item.name} x ${item.quantity} — $${(
                  item.price * item.quantity
                ).toFixed(2)}</li>`
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
      subject: `Order Confirmation at Shopping Center`,
      text,
      html,
    });

    const previewUrl = usingEthereal
      ? nodemailer.getTestMessageUrl(info) || undefined
      : undefined;
    return { success: true, orderId, previewUrl };
  } catch (error) {
    console.error("Checkout action error:", error);
    return { error: "Failed to place order" };
  }
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Enter your details to place the order</p>
        </div>
      </div>

      <CheckoutClient action={placeOrderAction} />
    </div>
  );
}
