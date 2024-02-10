import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 494;

interface test {
    meetingId: number;
    topicId: number;
}

test({ id: testId, name: "возврат на тему - выделена"}, async ({ runId, page }) => {
    try {
        await page.goto(`${testsConfig.domain}`);

        const email = "highlightedTest@mail.ru";
        const pass = "988ddFc";
        // const meetingName = "submit completion";
        // const topicName2 = "completion" + +(new Date());
        await login({ page, email, pass });
        const topicName2 = "completion";

        await page.goto(`${testsConfig.domain}/company/554/disk/16755`);

        await createButtonSession({ page, companyId: "554", parentId: "16755", meetingId: ""});

        await createTopic({ page, companyId: "554", meetingId: "", topicId: "" });

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });

        console.log("перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        console.log("стрелка назад в dashboard");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click( ".css-1g5egf0", { delay: 100 });

        console.log("название темы");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-v987p4", { visible: true });
        await page.type( ".css-v987p4", topicName2, { delay: 100 });

        console.log("клик по пустому месту чтобы сохранить");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".root", { visible: true });
        await page.click( ".root", { delay: 100 });


        await page.waitForTimeout(500);
        await page.waitForSelector(".css-v987p4", { visible: true });
        await page.click(".css-v987p4", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector(".css-krolpv", { visible: true });
        await page.click(".css-krolpv", { delay: 50 });

        await page.waitForTimeout(300);
        // await page.waitForSelector( "nav.css-x7km8j.ew1rjge1", { visible: true });
        await page.click( "nav.css-x7km8j", { delay: 100 });

        // await page.waitForTimeout(300);
        // await page.click( "[data-rbd-draggable-id='848'] input.css-aahqkw.ew1rjge0");

        // console.log("клик на последнюю тему");
        // const items = document.querySelectorAll('nav')
        // const firstItem = items[1]
        // console.log(firstItem.dataset)
        // await page.waitForTimeout(500);
        // // const firstItem = await page.$$( ".css-x7km8j.ew1rjge1");
        // await firstItem[1].click(  { delay: 100 });

        // const elInput = document.querySelectorAll('nav')[1].value;
        // await elInput[1].click({ delay: 50});
        // const items = document.querySelectorAll('nav')
        // const firstItem = items[1]
        // await firstItem.click()

        // console.log(firstItem.dataset)



        console.log("выбрать сценарий");
        await page.waitForTimeout(600);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });


        console.log("перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        console.log("стрелка назад в dashboard");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click( ".css-1g5egf0", { delay: 100 });

        // await page.goto(`${testsConfig.domain}/company/554/meeting/${meetingId}/topic/${topicId}?orderNum=1`);

        const isSuccess = await isElement.exist(page, ".css-2yyo0b ew1rjge1");

        console.log("Диск в меню");
        await page.waitForTimeout(1000);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");

        await deleteMeeting({ page, companyId: "554", meetingId: ""});

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