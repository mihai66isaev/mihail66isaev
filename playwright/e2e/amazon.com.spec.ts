import { test } from "@playwright/test";

test('amazon.com', async ({ page }) => {
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