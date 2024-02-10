import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
// import {clearCookies} from "@lib/extension";
import login from "@lib/scenario/login";

const testId = 256;

test({id: testId, name: "Регистрация"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "OQA21testDev@gmail.com";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/371/disk/16461`);



        await page.waitForTimeout(300);
        await page.waitForSelector("#layout-menu", { visible: true });
        await page.click("#layout-menu");

        console.log("профиль");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-14w4z62");
        await page.click(".css-14w4z62", { delay: 100 });

        console.log("сворачиваем меню");
        await page.waitForTimeout(500);
        const iconBtn = await page.$$(".css-17ti31y");
        await iconBtn[1].click();

        console.log(".кнопка change-theme");
        await page.waitForTimeout(300);
        await page.waitForSelector("#change-theme", { visible: true });
        await page.click("#change-theme");

        const isSuccess = await isElement.exist( page, ".css-1iuejx8");

        // кнопка
        await page.waitForTimeout(300);
        await page.waitForSelector("#change-theme", { visible: true });
        await page.click("#change-theme");


        await  testResult( {
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "expected isSuccess true, but got false",
            status: isSuccess ? ResultCreateStatusEnum.PASSED : ResultCreateStatusEnum.FAILED,
            steps: [
                {
                    status: isSuccess ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED,
                    position: 1
                }
            ],
        })
    } catch (e) {
        await testResult({
            runId,
            testId,
            message: JSON.stringify(e.message),
            status: ResultCreateStatusEnum.FAILED,
            steps: [
                {status: ResultCreateStepsStatusEnum.FAILED, position: 1}
            ],
        })
    }
});