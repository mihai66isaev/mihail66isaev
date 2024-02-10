import { test } from '@playwright/test';

test('demo.playwright.dev', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('test');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByText('All Active Completed').click();
});