import login from "@lib/scenario/login";
import testsConfig from "@lib/config/tests";
import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import isElement from "@lib/extension/is-element";
import {createFolder, deletFolder} from "@lib/scenario/folder";
import {createTopic} from "@lib/scenario/topic";

const testId = 512;


test({id: testId, name: "Удаление папки с вложениями"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`)

        const email = "deletAtashFolder@gmail.com";
        const pass = "988ddFc";
        const sessionName = "folder session";
        const problem1 = "сущность первая";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/613/disk/16854`);

        await createFolder({ page, companyId: "613", parentId: "16854", folderId: "", folderName: ""});

        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1sj5vxz", { visible: true });
        await page.click(".css-1sj5vxz", { delay: 100 });

        console.log("малая кнопка создать");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 });

        console.log("кнопка сессия");
        await page.waitForTimeout(600);
        await page.click( ".css-slaycx>div>div:last-of-type");


        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-name", { visible: true });
        await page.type( "#meeting-name", sessionName, { delay: 50 });

        console.log("сохранить");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-submit" );
        await page.click( "#meeting-submit" );

        await createTopic({page, companyId: "613", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-y7p45q", { visible: true });
        await page.click(".css-y7p45q", { delay: 100 });

        console.log("перейти к стратсессии");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-m0rsqb", { visible: true });
        await page.click( ".css-m0rsqb", { delay: 100 })

        console.log("Начать");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click( ".css-1ybrnuv", { delay: 100 });

        console.log("Передать на заполнение ведущемуО");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1ybrnuv", { visible: true });
        await page.click( ".css-1ybrnuv", { delay: 100 });

        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-v987p4", { visible: true });
        await page.type( ".css-v987p4", problem1, { delay: 50 });

        console.log("+");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1rni2cx", { visible: true });
        await page.click( ".css-1rni2cx", { delay: 100 });

        console.log("Стрелка назад не grid");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0", { delay: 100 });

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });

        console.log("Диск в меню");
        await page.waitForTimeout(500);
        await page.waitForSelector( "#disk-link", { visible: true });
        await page.click( "#disk-link");

        await deletFolder({page, companyId: "613", parentId: "16854", Id: "", folderName: ""});

        console.log("Диск в меню");
        await page.waitForTimeout(500);
        await page.waitForSelector( "#calendar-link", { visible: true });
        await page.click( "#calendar-link");

        const isSuccess = !(await isElement.exist(page,".css-1ip69yp "));

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "элемент удален, не смогли удалить элемент",
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