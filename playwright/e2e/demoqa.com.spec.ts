import { test } from "@playwright/test";

test('demoqa.com', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('div').filter({ hasText: /^Elements$/ }).first().click();
    await page.locator('li').filter({ hasText: 'Text Box' }).click();
    await page.locator('li').filter({ hasText: 'Check Box' }).click();
    await page.getByText('Radio Button').click();
    await page.getByText('Web Tables').click();
    await page.locator('li').filter({ hasText: 'Buttons' }).click();
    await page.locator('li').filter({ hasText: /^Links$/ }).click();
    await page.getByText('Broken Links - Images').click();
    await page.getByText('Upload and Download').click();
    await page.getByText('Dynamic Properties').click();
    await page.getByRole('button', { name: 'Color Change' }).click();
    await page.getByRole('button', { name: 'Visible After 5 Seconds' }).click();
});