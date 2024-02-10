import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 500;

test({id: testId, name: "Редактирование сущностей в гриде"}, async ({ page, runId }) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);
        const problem1 = "сущность первая";
        const problem2 = "сущность вторая";
        const redactor = "Редакция: ";
         const email = "editionElemGrid@gmail.com";
         const pass = "988ddFc";
         await login({ email, pass, page });

         await page.goto(`${testsConfig.domain}/company/594/disk/16830`);

         await createButtonSession({page, companyId: "594", parentId: "16830", meetingId: ""});

         await createTopic({page, companyId: "594", meetingId: "", topicId: ""});

        console.log("клик по  сценарию");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-y7p45q", { visible: true });
        await page.click( ".css-y7p45q");

        console.log("клик по кнопке перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb");

        console.log("Начать");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click( ".css-1ybrnuv", { delay: 100 });

        console.log("Передать на заполнение ведущемуО");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click( ".css-1ybrnuv", { delay: 100 });

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

        console.log("клик на проблему");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1kfmno7", { visible: true });
        await page.click( ".css-1kfmno7", { delay: 50});

        console.log("клик на проблему");
        await page.waitForSelector( ".css-1kfmno7", { visible: true });
        await page.click( ".css-1kfmno7", { delay: 50});

        console.log("редактировать");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-18wjyms>div", { visible: true });
        await page.type(  ".css-18wjyms>div", redactor, { delay: 50});

        console.log("onclick");
        await page.waitForTimeout(3000);
        await page.waitForSelector(".grid-drop-zone", { visible: true });
        await page.click( ".grid-drop-zone");

        const isSuccess = await isElement.exist( page, ".css-cw3l7y " );

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


        await deleteMeeting({ page, companyId: "594", meetingId: ""});

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "элементы объеденины, не смогли объединить элементы",
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