import {Page} from "puppeteer";

interface ClearCookieProps {
    page: Page;
}

const clearCookies = async ({ page }: ClearCookieProps) => {
    try {
        const client = await page.target().createCDPSession();
        await client.send("Network.clearBrowserCookies");
        console.log("cookies is cleared");
        return true;
    } catch (e) {
        console.log("Не удалось почистить куки");
        return false;
    }
}

export default clearCookies;
