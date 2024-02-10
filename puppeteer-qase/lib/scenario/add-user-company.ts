import {Page} from "puppeteer";
import {isElement} from "@lib/extension";

interface AddUserCompany {
    page: Page;
    companyId: string;
    userId: string;
}

export const addUserCompany = async ({ page, userId }: AddUserCompany) => {
        try {
            const addLogin = "OQA21Test@gmail.com";

            console.log("клик на ссылку добавить участников");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-1uzgcop", { visible: true });
            await page.click( ".css-1uzgcop");


            console.log("внести login");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-162edyi", { visible: true });
            await page.type( ".css-162edyi", addLogin, { delay: 50 });


            console.log("выбрать поле с участником");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-hbfnf2", { visible: true });
            await page.click( ".css-hbfnf2");


            console.log("сохранить");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-1pkb6fu", { visible: true });
            await page.click( ".css-1pkb6fu", { delay: 100 });

            const isSuccess = !(await isElement.exist( page, `data-id="${userId}`));
            console.log(isSuccess ? "Пользователь добавлен" : "Не смогли добавить пользователя");
            return isSuccess;

        } catch (e) {
            console.log("error in addUserCompany", e);
            return false;
        }
    }
