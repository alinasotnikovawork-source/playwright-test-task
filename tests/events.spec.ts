import { expect, test } from '@playwright/test';

test('user can view event details', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('.login-button').click();

  await page.locator('.event-card').nth(0).getByRole('link', { name: 'View details' }).click();

  await expect(page.getByRole('heading', { name: 'Advanced Playwright Workshop' })).toBeVisible();
  await expect(page.getByText('5 tickets available')).toBeVisible();
});

test('user can add an event to the cart', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('.login-button').click();

  await page.locator('.event-card').nth(0).getByRole('link', { name: 'View details' }).click();
  await page.locator('.add-to-cart-button').click();

  await expect(page).toHaveURL('http://localhost:5173/checkout');
  await expect(page.locator('.cart-item')).toContainText('Advanced Playwright Workshop');
});

test('clicking add to cart works from the event page', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('.login-button').click();

  await page.locator('.event-card').nth(0).getByRole('link', { name: 'View details' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page).toHaveURL('http://localhost:5173/checkout');
});
