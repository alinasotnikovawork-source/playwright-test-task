import type { Page } from '@playwright/test';

export async function clickElement(page: Page, selector: string) {
  await page.locator(selector).click();
}
