import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 405;

test( { id: testId, name: "Отправить на заполнение"}, async ({ runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "submitCompletion@mail.ru";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/company/318/disk/16385`);

        await createButtonSession({ page, companyId: "318", parentId: "16385", meetingId: "" });

        await createTopic({ page, companyId: "318", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });

        console.log("Перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        console.log("Начать");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click( ".css-1ybrnuv", { delay: 100 });

        console.log("Отправить на заполнение");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#generating-end-button", { visible: true });
        await page.click( "#generating-end-button", { delay: 100 });

        console.log("Запустить");
        await page.waitForTimeout(300);
        const startBtm = await page.$$(".css-m0rsqb");
        await startBtm[2].click();
        // await page.waitForSelector(".css-m0rsqb", { visible: true });
        // await page.click(".css-m0rsqb", { delay: 50 });

        const isSuccess = await isElement.exist( page, "#generating-start-button" );

        console.log("Получить список проблем");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#generating-start-button", { visible: true });
        await page.click( "#generating-start-button", { delay: 100 });

        console.log("Стрелка назад в зоне с инструкциями");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0", { delay: 100});

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });


        await page.waitForTimeout( 500);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");

        await deleteMeeting({ page, companyId: "318", meetingId: ""});

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