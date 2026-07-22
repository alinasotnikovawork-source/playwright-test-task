import { expect, test } from "@playwright/test";

test("mocked event displays mocked availability", async ({ page }) => {
  await page.route("**/api/events/event-1*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "event-1",
        status: "available",
        availableTickets: 10,
      }),
    });
  });

  await page.goto("http://localhost:5173/login");
  await page.locator("#email").fill("admin@example.com");
  await page.locator("#password").fill("password123");
  await page.locator(".login-button").click();
  await expect(page).toHaveURL("http://localhost:5173/events");

  await page.goto("http://localhost:5173/events/event-1");

  await expect(page.getByText("10 tickets available")).toBeVisible();
});
