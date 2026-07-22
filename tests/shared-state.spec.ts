import { expect, test, type Page } from '@playwright/test';

let sharedPage: Page;

test.describe.serial('cart persistence across the booking flow', () => {
  test.beforeAll(async ({ browser }) => {
    sharedPage = await browser.newPage();

    await sharedPage.goto('http://localhost:5173/login');
    await sharedPage.locator('#email').fill('admin@example.com');
    await sharedPage.locator('#password').fill('password123');
    await sharedPage.locator('.login-button').click();
  });

  test('add an event to the shared cart', async () => {
    await sharedPage.locator('.event-card').nth(1).getByRole('link', { name: 'View details' }).click();
    await sharedPage.getByTestId('add-to-cart-main').click();

    await expect(sharedPage).toHaveURL('http://localhost:5173/checkout');
    await expect(sharedPage.locator('.cart-item')).toContainText('React Testing Conference');
  });

  test('complete checkout using the existing shared cart', async () => {
    await sharedPage.goto('http://localhost:5173/checkout');

    await expect(sharedPage.locator('.cart-item')).toContainText('React Testing Conference');

    await sharedPage.getByLabel('Full name').fill('Sam Lee');
    await sharedPage.getByLabel('Email').fill('sam@example.com');
    await sharedPage.getByLabel('Phone').fill('555-0199');
    await sharedPage.locator('.confirm-button').click();

    await expect(sharedPage.getByRole('heading', { name: 'Booking confirmed' })).toBeVisible();
  });
});
