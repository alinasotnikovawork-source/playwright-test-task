import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createBooking } from '../api/client';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [calculating, setCalculating] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!cart) return;
    setCalculating(true);
    const timer = setTimeout(() => setCalculating(false), 1200);
    return () => clearTimeout(timer);
  }, [cart]);

  if (!cart) {
    return (
      <main>
        <h1>Checkout</h1>
        <p>
          Your cart is empty. <Link to="/events">Browse events</Link>
        </p>
      </main>
    );
  }

  const total = cart.price * cart.quantity;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const confirmation = await createBooking({
      eventId: cart!.eventId,
      quantity: cart!.quantity,
      attendee: { name, email, phone },
    });

    clearCart();
    navigate('/confirmation', { state: confirmation });
  }

  return (
    <main>
      <h1>Checkout</h1>

      <section aria-label="Order summary" className="order-summary">
        <div className="cart-item">
          <span>{cart.title}</span> &times; <span>{cart.quantity}</span>
          <button type="button" className="remove-from-cart-button" onClick={clearCart}>
            Remove
          </button>
        </div>
        <p className="total">Total: ${total}</p>
      </section>

      <form aria-label="Attendee details" onSubmit={handleSubmit} className="attendee-form">
        <div className="field">
          <label htmlFor="attendeeName">Full name</label>
          <input id="attendeeName" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="attendeeEmail">Email</label>
          <input
            id="attendeeEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="attendeePhone">Phone</label>
          <input id="attendeePhone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <button type="submit" className="confirm-button" disabled={submitting}>
          Confirm booking
        </button>
      </form>

      {(calculating || submitting) && (
        <div className="loading-overlay">
          <p>{calculating ? 'Calculating total…' : 'Processing booking…'}</p>
        </div>
      )}
    </main>
  );
}
