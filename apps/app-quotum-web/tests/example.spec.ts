import { expect, test } from '@playwright/test';

test('has a title', async ({ page }) => {
  await page.goto('/demos/mutation');
  await expect(page).toHaveTitle(/Subby/);
});

test('has a refetch button', async ({ page }) => {
  await page.goto('/demos/mutation');
  await expect(page.getByRole('button', { name: 'Refetch' })).toBeVisible();
});
