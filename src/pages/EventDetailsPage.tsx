import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAvailability, fetchEventDetails } from '../api/client';
import { useCart } from '../context/CartContext';
import type { Availability, EventSummary } from '../types';

function availabilityText(availability: Availability | null): string {
  if (!availability) {
    return 'Loading availability…';
  }

  if (availability.status === 'available') {
    return `${availability.availableTickets} tickets available`;
  }

  return 'Currently unavailable';
}

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventSummary | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setEvent(null);
    setAvailability(null);
    setNotFound(false);

    fetchEventDetails(id).then((data) => {
      if (data) {
        setEvent(data);
      } else {
        setNotFound(true);
      }
    });
  }, [id]);

  useEffect(() => {
    if (!event) return;
    fetchAvailability(event.id).then(setAvailability);
  }, [event]);

  if (notFound) {
    return (
      <main>
        <p>Event not found.</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main>
        <p>Loading event…</p>
      </main>
    );
  }

  function handleAddToCart() {
    addToCart({ eventId: event!.id, title: event!.title, price: event!.price, quantity });
    navigate('/checkout');
  }

  return (
    <main>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.description}</p>

      <section aria-label="Event booking" className="booking-section">
        <h2>Book tickets</h2>
        <p>Price: ${event.price}</p>
        <p data-testid="availability-status">{availabilityText(availability)}</p>

        <div className="field">
          <label htmlFor="quantity">Number of tickets</label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={availability?.availableTickets}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button
          type="button"
          className="add-to-cart-button primary-button"
          data-testid="add-to-cart-main"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </section>

      <aside aria-label="Quick purchase" className="sticky-panel">
        <p>{event.title}</p>
        <p>
          ${event.price} &times; {quantity}
        </p>
        <button
          type="button"
          className="sticky-add-to-cart-button"
          data-testid="add-to-cart-sticky"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </aside>
    </main>
  );
}
