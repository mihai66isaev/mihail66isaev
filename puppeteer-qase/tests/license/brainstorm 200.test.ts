import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import login from "@lib/scenario/login";
import isElement from "@lib/extension/is-element";

const testId = 755;

test({ id: testId, name: "Лицензия 200" }, async({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "breinshtorm200@mail.ru";
        const pass = "988ddFc";
        await login({ page, email, pass });

        console.log("Клик на профиль");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1lqtwm5", {visible: true});
        await page.click(".css-1lqtwm5", {delay: 50});

        console.log("клик на стрелку раскрывающий список");
        await page.waitForTimeout(300);
        const arrowButton = await page.$$(".css-ijxauv");
        await arrowButton[1].click({delay: 50});

        console.log("мозгоштурм 200");
        await page.waitForTimeout(300);
        const brainstopm = await page.$$(".css-1cui616");
        await brainstopm[2].click({delay: 50});

        // await page.waitForTimeout(300);
        // await page.waitForSelector(".css-1cui616", { visible: true});
        // await page.click( ".css-1cui616", {delay: 50});


        const isSuccess = await isElement.exist( page, ".css-u9e1hm" );

        await testResult({
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

    }catch (e) {
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