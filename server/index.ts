import express from 'express';
import { events } from './data';
import type { EventRecord } from './data';

const app = express();
const PORT = 3001;

const VALID_EMAIL = 'admin@example.com';
const VALID_PASSWORD = 'password123';

app.use(express.json());

function toPublicEvent(event: EventRecord) {
  const { id, title, description, date, price } = event;
  return { id, title, description, date, price };
}

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    res.json({ token: 'demo-token', user: { email } });
    return;
  }

  res.status(401).json({ message: 'Invalid email or password' });
});

app.get('/api/events', (_req, res) => {
  res.json(events.map(toPublicEvent));
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  res.json(toPublicEvent(event));
});

app.get('/api/events/:id/availability', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  res.json({
    eventId: event.id,
    availableTickets: event.availableTickets,
    status: event.availableTickets > 0 ? 'available' : 'sold-out',
  });
});

app.post('/api/bookings', (req, res) => {
  const { eventId, quantity, attendee } = req.body ?? {};
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }

  const total = event.price * Number(quantity ?? 1);

  setTimeout(() => {
    res.json({
      bookingId: `BK-${event.id}-${Date.now()}`,
      event: { id: event.id, title: event.title, price: event.price, date: event.date },
      quantity: Number(quantity ?? 1),
      total,
      attendee,
      status: 'confirmed',
    });
  }, 400);
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
