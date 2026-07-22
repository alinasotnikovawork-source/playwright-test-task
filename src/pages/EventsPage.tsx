import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/client';
import type { EventSummary } from '../types';

export function EventsPage() {
  const [events, setEvents] = useState<EventSummary[] | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  if (!events) {
    return (
      <main>
        <h1>Events</h1>
        <p>Loading events…</p>
      </main>
    );
  }

  const filtered = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main>
      <h1>Events</h1>
      <div className="field">
        <label htmlFor="event-search">Search events</label>
        <input
          id="event-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className="event-list">
        {filtered.map((event) => (
          <li className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>${event.price}</p>
            <Link to={`/events/${event.id}`}>View details</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
