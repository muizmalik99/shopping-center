"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          address,
          contact,
          cart: cartItems.map(({ id, name, price, quantity }) => ({
            id,
            name,
            price,
            quantity,
          })),
          total,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      clearCart();
      setMessage(`Order placed successfully! Order ID: ${result.orderId}`);
      if (result.previewUrl) setPreviewUrl(result.previewUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Enter your details to place the order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact No</label>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            {message && (
              <div className="text-center text-sm text-gray-700">
                <p>{message}</p>
                {previewUrl && (
                  <p>
                    Email preview: <a className="text-blue-600 underline" href={previewUrl} target="_blank" rel="noreferrer">Open</a>
                  </p>
                )}
              </div>
            )}
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-gray-800 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-yellow-600 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


