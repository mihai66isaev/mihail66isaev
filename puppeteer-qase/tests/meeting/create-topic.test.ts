import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession,  deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 4;

test({ id: testId, name:  "Создание темы в сессии"},  async ({ runId , page })  => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "createTopicTest@mail.ru";
        const pass = "988ddFc";
        await page.waitForTimeout(500);
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/company/496/disk/16687`);

        await createButtonSession( { page, companyId: "496", parentId: "16687", meetingId: "" });

        await createTopic({ page, companyId: "496", meetingId: "", topicId: ""});

        console.log("проверка наличия темы");
        const isSuccess = await isElement.exist(page, ".css-y7p45q.e17ppo8j2" );

        await deleteMeeting({ page, companyId: "496",  meetingId: ""});

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "не смогли создать тему",
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