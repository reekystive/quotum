import { expect, test } from '@playwright/test';

test('has a title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Quotum/);
});
