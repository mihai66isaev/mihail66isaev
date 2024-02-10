import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 19;

test( { id: testId, name: "Дашборд"}, async ({ runId , page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "opendashboardtest@gmail.com";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.goto( `${testsConfig.domain}/company/202/disk/16117`);

        await page.waitForTimeout(500);
        await createButtonSession( { page, companyId: "202", parentId: "16117", meetingId: "" });

        await createTopic({ page, companyId: "202", meetingId: "", topicId: ""});

        console.log("клик по  сценарию");
        await page.waitForTimeout(3000);
        await page.waitForSelector(".css-y7p45q", { visible: true });
        await page.click( ".css-y7p45q");

        console.log("клик по кнопке перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb");

        const isSuccess = await isElement.exist( page, ".css-3dk89a" );

        console.log("Стрелка назад на дашборде");
        await page.waitForTimeout(600);
        await page.waitForSelector(".css-1g5egf0", {visible: true});
        await page.click( ".css-1g5egf0");

        await deleteMeeting({ page, companyId: "202", meetingId: ""});


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