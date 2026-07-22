import { expect, test } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('.login-button').click();

  await expect(page).toHaveURL('http://localhost:5173/events');
  await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();
});
