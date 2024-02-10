import {clearCookies, isElement} from "@lib/extension";
import testsConfig from "@lib/config/tests";
import {Page} from "puppeteer";

interface LoginProps {
    page: Page;
    email: string;
    pass: string;
}

const login = async ({ page, email, pass }: LoginProps): Promise<boolean> => {
    try {
        await clearCookies({ page });
        await page.goto(`${testsConfig.domain}/account/login`, { waitUntil: "domcontentloaded" });

        console.log("Вводим email", email);
        await page.waitForTimeout(300);
        await page.waitForSelector("#email", { visible: true });
        await page.type("#email", email, { delay: 50 });

        console.log("Вводим пароль", pass);
        await page.waitForTimeout(300);
        await page.waitForSelector("#password", { visible: true });
        await page.type("#password", pass, { delay: 50 });

        console.log("Нажимаем войти", pass);
        await page.waitForTimeout(300);
        await page.waitForSelector("#submit", { visible: true });
        await page.click("#submit");

        const isSuccess = await isElement.exist(page, "#vertical-menu");
        console.log(isSuccess ? "Авторизация успешна" : "Не смогли авторизоваться");
        return isSuccess;

    } catch (e) {
        console.log("Не смогли залогиниться", e);
        return false;
    }
}

export default login;