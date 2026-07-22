import { expect, test } from '@playwright/test';
import { clickElement } from './helpers/common';

test('complete event flow works', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('.login-button').click();

  await expect(page).toHaveURL('http://localhost:5173/events');

  await page.getByLabel('Search events').fill('Playwright');
  await expect(page.getByText('Advanced Playwright Workshop')).toBeVisible();
  await expect(page.getByText('React Testing Conference')).toHaveCount(0);

  await page.getByLabel('Search events').fill('');
  await page.locator('.event-card').nth(0).getByRole('link', { name: 'View details' }).click();

  await page.getByLabel('Number of tickets').fill('2');
  await page.getByTestId('add-to-cart-main').click();

  await expect(page).toHaveURL('http://localhost:5173/checkout');
  await expect(page.locator('.cart-item')).toContainText('Advanced Playwright Workshop');

  await page.getByLabel('Full name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane@example.com');
  await page.locator('input').nth(2).fill('555-0100');

  await page.locator('.confirm-button').click();
  await page.waitForTimeout(1000);

  expect(await page.locator('.confirmation-message').isVisible()).toBe(true);
  await expect(page.getByText(/Booking confirmed/i)).toBeVisible();
});

test('booking confirmation displays the total', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await clickElement(page, '.login-button');

  await page.locator('.event-card').nth(0).getByRole('link', { name: 'View details' }).click();
  await page.getByLabel('Number of tickets').fill('2');
  await clickElement(page, '.add-to-cart-button');

  await page.getByLabel('Full name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane@example.com');
  await page.getByLabel('Phone').fill('555-0100');

  await page.locator('.confirm-button').click({ force: true });

  await expect(page.getByRole('heading', { name: 'Booking confirmed' })).toBeVisible();
  expect(await page.locator('.total').textContent()).toBe('Total: $200');
});
