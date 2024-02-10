import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, createMeeting, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 9;

test( { id: testId, name: "Заметки в сессии"}, async ({ runId , page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "notestest@mail.com";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.goto( `${testsConfig.domain}/company/203/disk/16118`);

        await createButtonSession({ page, companyId: "203", parentId: "16118", meetingId: "" });

        await createTopic({ page, companyId: "203", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        const scenario = await page.$$( ".css-y7p45q");
        await scenario[2].click();

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-field", { visible: true });
        await page.type( "#note-field", "заметка № 1", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-submit", { visible: true });
        await page.click( "#note-submit");

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-field", { visible: true });
        await page.type( "#note-field", "заметка № 3", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-submit", { visible: true });
        await page.click( "#note-submit");

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-field", { visible: true });
        await page.type( "#note-field", "заметка № 2", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector( "#note-submit", { visible: true });
        await page.click( "#note-submit");

        const isSuccess = await isElement.exist( page, ".css-m51mr9" );

        // console.log("Корзина: Удалить тему")
        // await page.waitForTimeout( 500);
        // const iconBut = page.$$(".css-17ti31y");
        // await iconBut[3].clic( { delay: 100});

        await page.waitForTimeout(600);
        await page.waitForSelector("#disk-link", { visible: true });
        await page.click("#disk-link");

        await deleteMeeting({ page, companyId: "203", meetingId: "" });

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