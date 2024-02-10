import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createMeeting, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 555;

test( {id: testId, name: "Частичная оценка сущности в гриде"}, async({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "partialScore@mail.ru";
        const pass = "988ddFc";
        const problem1 = "сущность первая";
        const problem2 = "сущность вторая";
        // const meetingName = "submit completion";
        // const topicName = "completion work";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/app/company/736/disk/17039`);

        await page.waitForTimeout(500);
        await createMeeting({page, companyId: "736", parentId: "17039", meetingId: "", diskId: ""});

        console.log("Клик на ...");
        await page.waitForTimeout(300);
        const ellipsisButton = await page.$$(".css-vubbuv");
        await ellipsisButton[5].click({delay: 50});

        console.log("перейти");
        await page.waitForTimeout(500);
        const select = await page.$$( ".css-1cui616");
        await select[0].click(  { delay: 100 });

        await createTopic({ page, companyId: "736", meetingId: "", topicId: ""})

        await page.waitForTimeout(300);
        await page.waitForSelector(".css-ozsfgf", {visible: true});
        await page.click(".css-ozsfgf", {delay: 50});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1o6wogo", {visible: true});
        await page.click(".css-1o6wogo",{ delay: 100 });

        // await page.goto(`${testsConfig}/app/company/736/session/19008/topic/3100`)

        console.log("перейти к стратсессии");
        await page.waitForTimeout(600);
        await page.waitForSelector( ".css-1j5wvj0", { visible: true });
        await page.click( ".css-1j5wvj0", { delay: 50 });

        console.log("начать");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1kum99i", { visible: true});
        await page.click(".css-1kum99i", { delay: 50 });

        console.log("Копировать урл");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-17ti31y", { visible: true });
        await page.click(".css-17ti31y", { delay: 100 });

        // await page.goto(`${testsConfig.domain}/app/company//disk//topic//personal/`);

        console.log("передать на заполнение ведущему");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click(".css-1ybrnuv", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-v987p4", { visible: true });
        await page.type( ".css-v987p4", problem1, { delay: 50 });

        console.log("+");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1rni2cx", { visible: true });
        await page.click( ".css-1rni2cx", { delay: 100 });

        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-v987p4", { visible: true });
        await page.type( ".css-v987p4", problem2, { delay: 50 });

        console.log("+");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1rni2cx", { visible: true });
        await page.click( ".css-1rni2cx", { delay: 100 });

        console.log("клик на проблему");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-10fv31d", { visible: true });
        await page.click( ".css-10fv31d", { delay: 100 });

        console.log("Добавить в группу");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1ymc8ta", { visible: true });
        await page.click(".css-1ymc8ta", { delay: 100 });


        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-10fv31d", { visible: true });
        await page.click( ".css-10fv31d", { delay: 100 });

        console.log("Добавить в группу");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1ymc8ta", { visible: true });
        await page.click(".css-1ymc8ta", { delay: 100 });

        console.log("Оценить");
        await page.waitForTimeout(500);
        await page.waitForSelector("#priority-voting-end-button", { visible: true });
        await page.click("#priority-voting-end-button", { delay: 50 });

        await page.waitForTimeout(500);
        const btmstart = await page.$$(".css-m0rsqb");
        await btmstart[3].click({ delay: 100 });

        const isSuccess = await isElement.exist( page, "#personal-cancel-button" );

        await page.waitForTimeout(500);
        await page.waitForSelector("#priority-voting-start-button", { visible: true });
        await page.click("#priority-voting-start-button", { delay: 50 });

        console.log("Стрелка назад не grid");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0", { delay: 100 });

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });

        await page.waitForTimeout( 500);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");


        await deleteMeeting({ page, companyId: "736", meetingId: ""});

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