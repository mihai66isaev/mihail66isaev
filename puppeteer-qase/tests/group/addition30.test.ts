import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
// import {addUserCompany} from "@lib/scenario/add-User-Companu";

const testId = 781;

test({id: testId, name: "Добавление 30 минут"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "addition30@mail.ru";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/app/company/1510/disk/18007`);

        console.log("Добавление 30 минут");
        await page.waitForTimeout(300);
        const dellButton = await page.$$(".css-vubbuv");
        await dellButton[2].click({delay: 50});

        console.log("Появилось предупреждение");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1j5wvj0", { visible: true});
        await page.click(".css-1j5wvj0")

        const isSuccess = await isElement.exist( page, ".MuiAlert-message.css-1xsto0d" );

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
})