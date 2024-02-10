import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import {test, testResult} from "@lib/core/test";
import isElement from "@lib/extension/is-element";
import testsConfig from "@lib/config/tests";
import login from "@lib/scenario/login";

const testId = 514;

test({id: testId, name: "Удаление дефолтной группы"}, async ({page, runId}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "deletdefault@gmail.com";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/614/disk/16866`);

        await page.waitForTimeout(500);
        await page.waitForSelector("#company-link", { visible: true });
        await page.click("#company-link", { delay: 50 });

        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1emibhp", { visible: true });
        await page.click(".css-1emibhp", { delay: 50 });

        await page.waitForTimeout(300);
        const deletbutton = await page.$$(".css-1uf772j");
        await deletbutton[1].click();

        await page.waitForTimeout(300);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb", { delay: 100 });

        const isSuccess = await isElement.exist(page, ".css-6mk4mh" );
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
    } catch (e) {
        await testResult({
            runId,
            testId,
            message: JSON.stringify(e.message),
            status: ResultCreateStatusEnum.FAILED,
            steps: [
                {status: ResultCreateStepsStatusEnum.FAILED, position: 1}
            ]
        })

    }
})