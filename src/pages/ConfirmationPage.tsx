import { Link, Navigate, useLocation } from 'react-router-dom';
import type { BookingConfirmation } from '../types';

export function ConfirmationPage() {
  const location = useLocation();
  const confirmation = location.state as BookingConfirmation | null;

  if (!confirmation) {
    return <Navigate to="/events" replace />;
  }

  return (
    <main>
      <h1>Booking confirmed</h1>
      <p className="confirmation-message">
        Your booking is confirmed. A confirmation email has been sent to {confirmation.attendee.email}.
      </p>

      <dl className="confirmation-details">
        <dt>Booking ID</dt>
        <dd>{confirmation.bookingId}</dd>

        <dt>Event</dt>
        <dd>{confirmation.event.title}</dd>

        <dt>Tickets</dt>
        <dd>{confirmation.quantity}</dd>

        <dt>Total</dt>
        <dd className="total">Total: ${confirmation.total}</dd>
      </dl>

      <Link to="/events">Back to events</Link>
    </main>
  );
}
