import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import {clearCookies} from "@lib/extension";

const testId = 2;

const generateEmail = () => {
    return "reg" + +(new Date()) + "@test.com";
}

test({id: testId, name: "Регистрация"}, async ({runId, page}) => {
    try {
        const email = generateEmail();
        const pass = "123";

        await clearCookies({ page });

        await page.goto(`${testsConfig.domain}/account/login`);

        //вводим email
        await page.waitForTimeout(300);
        await page.waitForSelector("#email", {visible: true});
        await page.type("#email", email, {delay: 50});

        //вводим пароль
        await page.waitForTimeout(500);
        await page.waitForSelector("#pass", {visible: true});
        await page.type("#pass", pass, {delay: 50})

        await page.waitForTimeout(500);
        await page.waitForSelector( "#submit", { visible: true });
        await page.click("#submit", { delay: 100 });

        await page.waitForTimeout(500);
        await page.goto(`${testsConfig.domain}/account/set-name`);

        console.log("вводим имя");
        await page.waitForTimeout(300);
        await page.waitForSelector("#name", {visible: true});
        await page.type("#name", "register test", {delay: 50});

        console.log("нажимаем войти");
        await page.waitForTimeout(300);
        await page.waitForSelector("#submit", { visible: true });
        await page.click("#submit");

        const isRegister = await isElement.exist(page, "#layout-menu");

        await testResult({
            runId,
            testId,
            message: isRegister ? ResultCreateStatusEnum.PASSED : "не прошли регистрацию",
            status: isRegister ? ResultCreateStatusEnum.PASSED : ResultCreateStatusEnum.FAILED,
            steps: [
                {
                    status: isRegister ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED,
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
                { status: ResultCreateStepsStatusEnum.FAILED, position: 1 }
            ],
        })
    }
});