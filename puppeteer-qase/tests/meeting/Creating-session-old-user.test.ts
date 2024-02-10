import testsConfig from "@lib/config/tests";
import login from "@lib/scenario/login";
import {createMeeting} from "@lib/scenario/session";
import isElement from "@lib/extension/is-element";
import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";


const testId = 459;

test( { id: testId, name: "Создание Сессии у старого(old) пользователя"}, async ({runId, page}) =>  {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "OQA312Test@mail.ru";
        const pass = "988ddFc";
        await login({email, pass, page});

        await page.goto(`${testsConfig.domain}/company/524/disk/16717`);

        await createMeeting({ page, companyId: "524", parentId: "16717", meetingId: "", diskId: ""});


        const isSuccess = await isElement.exist( page, ".css-1br79ws" );

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "Сессия создана, не смогли создать сессию",
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
})