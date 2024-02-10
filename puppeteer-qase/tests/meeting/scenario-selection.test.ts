import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 523;

test( {id: testId, name: "Bыбор сценария"}, async ({ runId, page}) => {

    try {

        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "OQscenario@mail.ru";
        const pass = "988ddFc";
        // const meetingName = "test dev";
        // const topicName = "selection scenario";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/company/190/disk/16099`);

        await createButtonSession({ page, companyId: "190", parentId: "16099", meetingId: ""});

        await createTopic({ page, companyId: "190", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        const scenario = await page.$$( ".css-ztv5i3");
        await scenario[2].click();

        const isSuccess = await isElement.exist(page, "#note-field" );

        await page.waitForTimeout(600);
        await page.waitForSelector(".css-1ln4c4v", { visible: true });
        await page.click(".css-1ln4c4v");

        await deleteMeeting( { page, companyId: "190", meetingId: ""});

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