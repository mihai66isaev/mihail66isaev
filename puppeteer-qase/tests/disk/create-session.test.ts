import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createMeeting, deleteMeeting} from "@lib/scenario/session";


const testId = 384;

test( { id: testId, name: "Создание сессии" }, async ({ runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "QACreateSesion@gmail.com";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/company/189/disk/16098`);

        await page.waitForTimeout( 500 );
        await createMeeting({ page, companyId: "189", parentId: "16098", meetingId: "", diskId: ""});

        // console.log("Диск в меню");
        // await page.waitForTimeout(500);
        // await page.waitForSelector( "#disk-link", { visible: true });
        // await page.click( "#disk-link");

        console.log("проверка наличия сессии");
        const isSuccess = await isElement.exist(page, ".css-xxdeq1" );


        await deleteMeeting( { page, meetingId: "", companyId: "189"});

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
            ],
        })
    }
});