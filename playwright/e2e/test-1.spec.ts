import { test, expect } from '@playwright/test';

test('demo', async ({ page }) => {
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

test('demo playright', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('test');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByText('All Active Completed').click();
});

test('test amazon', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.locator('i').nth(1).click();
  await page.getByPlaceholder('Type characters').click();
  await page.getByPlaceholder('Type characters').fill('iuyoyqor');
  await page.getByText('Try different image').click();
  await page.getByText('HeadsetsKeyboards').click();
  await page.getByRole('link', { name: 'New year, new supplies Shop' }).click();
  await page.getByRole('link', { name: 'Paper Mate Flair Felt Tip' }).first().click();
  await page.goto('https://www.amazon.com/s?k=school+supplies&_encoding=UTF8&content-id=amzn1.sym.7acbca95-6949-4783-9691-9ac9df8021d9&pd_rd_r=0a582e27-3e13-451b-9962-332733714c7a&pd_rd_w=IlDOk&pd_rd_wg=JE5Cx&pf_rd_p=7acbca95-6949-4783-9691-9ac9df8021d9&pf_rd_r=3F86EF1KVP3GVQC2FP9C&ref=pd_gw_unk');
  await page.getByRole('link', { name: 'Mr. Pen' }).click();
  await page.getByRole('link', { name: 'Mr. Pen- School Supplies' }).first().click();
  await page.getByLabel('Open Menu').click();
  await page.getByRole('link', { name: 'Amazon Music', exact: true }).click();
  await page.getByRole('link', { name: 'Podcasts' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[id="\\32 207"]').getByRole('link', { name: 'Play icon Sign-up link' }).click();
  const page1 = await page1Promise;
});