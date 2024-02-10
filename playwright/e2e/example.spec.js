// @ts-check
const { test, expect } = require('@playwright/test');
const { emit } = require('process');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("New test grinfer", async ({page}) => {
   await page.goto("https://landings.evristica.com/")
   page.locator("#nectar-user-account").click()
   await page.locator('#email').fill('OQA21Test@gmail.com')
   await page.locator('#password').fill('988ddFc')
});

test("landing test 2", async ({page}) => {
  await page.goto("https://landings.evristica.com/")
  await page.locator("#menu-item-191").click()
  await page.locator("#menu-item-190").click()
 
  expect('.column-bg-overlay-wrap').toBeTruthy
});
