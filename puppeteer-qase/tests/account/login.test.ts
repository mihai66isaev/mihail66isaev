import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import login from "@lib/scenario/login";
import testsConfig from "@lib/config/tests";

const testId = 1;

test({ id: testId, name: "Авторизация" }, async ({ runId, page }) => {
    try {

        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "OQaDevTest@mail.ru";
        const pass = "988ddFc";
        const isSuccess = await login({ page, email, pass });
        
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
                { status: ResultCreateStepsStatusEnum.FAILED, position: 1 }
            ],
        })
    }
});