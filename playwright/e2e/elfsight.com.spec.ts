import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://elfsight.com/instagram-feed-instashow/');
  await page.getByRole('link', { name: 'Create widget', exact: true }).click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe').getByRole('button', { name: 'Continue with this template' }).click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe').getByRole('button', { name: 'Add to website for free' }).click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByRole('button', { name: 'Continue with Email' }).click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByPlaceholder('Email').click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByPlaceholder('Email').fill('mr89202769899@gmail.com');
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByPlaceholder('Password').click();
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByPlaceholder('Password').fill('988ddFc');
  await page.frameLocator('iframe[name="preview"]').frameLocator('iframe >> nth=1').getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Copy Code' }).click();
  await page.locator('.sc-ac25f716-1 > button').click();
});