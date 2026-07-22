# Event Booking — Playwright QA Exercise

A small event-booking application used as a Senior QA Engineer interview exercise. You'll log in, browse events, book tickets, and check out — then turn your attention to an existing Playwright suite that already covers this flow.

## What's in the app

- **Login page** — hardcoded demo credentials (see below).
- **Events page** — a list of seeded events with a search box.
- **Event details page** — description, price, live availability, and a quantity selector.
- **Checkout page** — order summary and an attendee details form.
- **Confirmation page** — booking summary once checkout completes.

The frontend is React + TypeScript + Vite. It talks to a small local Express API (also TypeScript) that serves fixed, seeded event data — there are no external services or network calls involved.

Demo login:

```
email:    admin@example.com
password: password123
```

## Running it

### Option A — GitHub Codespaces

Open this repository in a Codespace. Setup runs automatically (`npm install` and Playwright's browser install). Once it finishes:

```bash
npm start
```

This starts the API (port 3001) and the Vite dev server (port 5173) together. Open the forwarded port 5173 in the browser preview.

### Option B — Local machine

Requirements: Node.js 20+.

```bash
npm install
npx playwright install --with-deps chromium
npm start
```

Then visit http://localhost:5173.

## Running the tests

With the app running (`npm start` in one terminal):

```bash
npm test              # run the full suite headlessly
npm run test:headed   # run with a visible browser
npm run test:ui       # Playwright's UI mode, useful for debugging
npm run test:report   # open the last HTML report
```

The suite lives in `tests/`.

## Your assignment

Budget roughly **2–3 hours**. You do not need to finish everything — prioritize and be ready to explain your choices and trade-offs.

1. **Run the suite** and see what passes and what doesn't.
2. **Investigate the failure(s).** At least one test fails consistently. Find the root cause — in the test, the app, or both — before changing anything.
3. **Fix it.** Make the failing test pass in a way that reflects the actual, correct behavior of the application (not just a change that silences the assertion).
4. **Review the rest of the suite** for reliability and maintainability issues. Things to consider: test isolation, locator strategy, setup duplication, waiting strategy, assertion style, and general structure. You don't have to fix everything you find — a prioritized list with reasoning is valuable on its own.
5. **Refactor the issues you consider most important.** Pick a handful, not all of them, and make the changes.
6. **Add one or two tests** for behavior you think is currently under-tested.
7. **Write up your findings** — a short `NOTES.md` (or similar) covering what you found, what you fixed, what you'd do next if you had more time, and how you'd wire this suite into CI.

## What to submit

- Your modified repository (or a diff/patch/PR against this one).
- Your notes/write-up from step 7.
- Any new or modified test files.

## A few things worth knowing going in

- The API has two endpoints that look similar — the event details page calls both of them.
- Playwright configuration in this repo is intentionally minimal in a few places. You're welcome to improve it as part of your review.
- There is no hidden "correct" refactor — reasonable, well-justified choices are what we're evaluating, not a specific diff.

Good luck, and feel free to ask questions about the exercise itself (not about the bugs — finding those is the point).
