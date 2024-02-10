import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import login from "@lib/scenario/login";
// import {json} from "express";
import isElement from "@lib/extension/is-element";
// import {addUserCompany} from "@lib/scenario/add-User-Companu";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 543;

interface test {
    meetingId: number;
    topicId: number;
}

test({id: testId, name: "таймер добавить минут"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "addminutes@mail.ru";
        const pass = "988ddFc";
        // const email2 = "OQA21newTest@gmail.com";

        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/634/disk/16896`);

        await createButtonSession({ page, companyId: "635", parentId: "16897", meetingId: ""});

        await createTopic({page, companyId: "635", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });

        console.log("перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        await page.waitForTimeout(300);
        await page.waitForSelector("#open-timer-button", { visible: true });
        await page.click("#open-timer-button", { delay: 50 });

        console.log("запустить таймер");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-89zue8", { visible: true });
        await page.click(".css-89zue8", { delay: 50 });

        console.log("добавить минуту");
        await page.waitForTimeout(10000);
        await page.waitForSelector(".css-1j6ax7h", { visible: true });
        await page.click(".css-1j6ax7h", { delay: 50 });

        console.log("остановить таймер");
        await page.waitForTimeout(5000);
        await page.waitForSelector(".css-89zue8", { visible: true });
        await page.click(".css-89zue8", { delay: 50 });

        const isSuccess = await isElement.exist(page, ".css-1b3r79x.eo7pf51");

        console.log("остановить и выключить");
        await page.waitForTimeout(5000);
        await page.waitForSelector("#timer-close", { visible: true });
        await page.click("#timer-close", { delay: 50 });

        console.log("выключить");
        await page.waitForTimeout(500);
        await page.waitForSelector("#close-time-submit", { visible: true });
        await page.click("#close-time-submit", { delay: 50 });

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });

        await page.waitForTimeout( 500);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");

        await deleteMeeting({page, companyId: "635", meetingId: ""})

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
})