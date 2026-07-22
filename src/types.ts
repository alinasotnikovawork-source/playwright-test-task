export interface EventSummary {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
}

export interface Availability {
  eventId: string;
  availableTickets: number;
  status: 'available' | 'sold-out';
}

export interface CartItem {
  eventId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export interface BookingConfirmation {
  bookingId: string;
  event: { id: string; title: string; price: number; date: string };
  quantity: number;
  total: number;
  attendee: Attendee;
  status: string;
}
