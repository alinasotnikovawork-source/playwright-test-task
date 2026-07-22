import type { Attendee, Availability, BookingConfirmation, EventSummary } from '../types';

export async function login(email: string, password: string): Promise<{ token: string } | null> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function fetchEvents(): Promise<EventSummary[]> {
  const response = await fetch('/api/events');
  return response.json();
}

export async function fetchEventDetails(id: string): Promise<EventSummary | null> {
  const response = await fetch(`/api/events/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function fetchAvailability(id: string): Promise<Availability | null> {
  const response = await fetch(`/api/events/${id}/availability`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function createBooking(payload: {
  eventId: string;
  quantity: number;
  attendee: Attendee;
}): Promise<BookingConfirmation> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response.json();
}
