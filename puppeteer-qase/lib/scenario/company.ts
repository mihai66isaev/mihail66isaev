import testsConfig from "@lib/config/tests";
import {Page} from "puppeteer";
import {isElement} from "@lib/extension";

interface GoToCompanyListParamsByUrl {
    page: Page;
    companyId: string;
}

export const goToCompanyListByUrl = async ({ page, companyId }: GoToCompanyListParamsByUrl) => {
    try {
        await page.goto(`${testsConfig.domain}/company/${companyId}/group`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);
        return true;
    } catch (e) {
        console.log("error in goToCompanyListByUrl", e);
        return false;
    }
}




interface CreateCompanyByUrlParams {
    page: Page;
    companyId: string;
    name: string;
}

export const createCompanyByUrl = async ({ page, companyId, name }: CreateCompanyByUrlParams) => {
    try {

        const companyName = "company test";
        // const name = "company test";

        await page.goto(`${testsConfig.domain}/company/${companyId}/group`, { waitUntil: "domcontentloaded"});
        await page.waitForTimeout(500);

        console.log("клик создать");
        await page.waitForTimeout(1000);
        await page.waitForSelector( ".css-tlk6in", { visible: true });
        await page.click( ".css-tlk6in");

        console.log("вводим название");
        await page.waitForTimeout(500);
        await page.waitForSelector( "[name=name]", { visible: true });
        await page.type( "[name=name]", companyName, { delay: 100 });

        console.log("клик создать в модальном окне");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1pkb6fu", { visible: true });
        await page.click(".css-1pkb6fu", { delay: 100 });

        await page.goto(`${testsConfig.domain}/company/${companyId}/group`)

        const isSuccess = await isElement.exist( page, `[data-id="${name}]`);
        console.log(isSuccess ? "Компания создана" : "Не смогли создать компанию");
        return isSuccess;

    } catch (e) {
        console.log("error in createCompanyByUrl", e);
        return false;
    }
}


