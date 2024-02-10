import {Page} from "puppeteer";

const exist = async (page: Page, selector: string, timeout: number = 3000): Promise<boolean> => {
    try {
        await page.waitForSelector(selector, { timeout })
        return true;
    } catch (error) {
        return false;
    }
}

const visible = async (page: Page, selector: string, timeout: number = 3000): Promise<boolean> => {
    try {
        await page.waitForSelector(selector, { timeout, visible: true })
        return true;
    } catch (error) {
        return false;
    }
}

export default {
    exist,
    visible
}
