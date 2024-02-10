import login from "@lib/scenario/login";
import testsConfig from "@lib/config/tests";
import { createMeeting, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";
import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import isElement from "@lib/extension/is-element";



const testId = 539;

test  ({ id: testId, name: "Таймер"}, async ({ runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);
        const email = "timer@mail.ru";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/622/disk/16878`);

        await createMeeting({page, companyId: "622", meetingId: "", diskId: "", parentId: "16878"});

        await createTopic({page, companyId: "622", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });

        console.log("перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        console.log("open timer");
        await page.waitForTimeout(300);
        await page.waitForSelector("#open-timer-button", { visible: true });
        await page.click("#open-timer-button", { delay: 50 });

        console.log("run timer");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-89zue8", { visible: true });
        await page.click(".css-89zue8", { delay: 50 });


        await page.waitForTimeout(10000);
        const isSuccess = await isElement.exist( page, "#timer-seconds");

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });

        await page.waitForTimeout( 500);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");

        await deleteMeeting({page, companyId: "622", meetingId: ""});

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
        await testResult( {
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