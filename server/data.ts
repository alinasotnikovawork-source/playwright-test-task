export interface EventRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  availableTickets: number;
}

export const events: EventRecord[] = [
  {
    id: 'event-1',
    title: 'Advanced Playwright Workshop',
    description:
      'A hands-on workshop covering advanced browser automation patterns, network mocking, and test architecture with Playwright.',
    date: '2026-09-14',
    price: 100,
    availableTickets: 5,
  },
  {
    id: 'event-2',
    title: 'React Testing Conference',
    description:
      'A one-day conference on testing React applications, from component tests to full end-to-end coverage.',
    date: '2026-10-02',
    price: 150,
    availableTickets: 8,
  },
  {
    id: 'event-3',
    title: 'API Automation Masterclass',
    description:
      'Deep dive into designing reliable API test suites, contract testing, and mocking strategies for backend services.',
    date: '2026-11-20',
    price: 120,
    availableTickets: 3,
  },
];
