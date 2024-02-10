import login from "@lib/scenario/login";
import testsConfig from "@lib/config/tests";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";
import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import isElement from "@lib/extension/is-element";

const testId = 536;

test( { id: testId, name: "Удаление объекта в grid"}, async ({runId, page}) => {
        try {
            await page.goto(`${testsConfig.domain}/account/login`);


            const problem1 = "сущность первая";
            const problem2 = "сущность вторая";
            // const problem3 = "сущность третья";
            const email = "deletEntity@mail.ru";
            const pass = "988ddFc";
            await login({page, email, pass});

            await page.goto(`${testsConfig.domain}/company/581/disk/16811`)

            await createButtonSession({page, companyId: "581", parentId: "16811", meetingId: ""});

            await createTopic({page, companyId: "581", meetingId: "", topicId: ""});

            console.log("выбрать сценарий");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-y7p45q", { visible: true });
            await page.click(".css-y7p45q", { delay: 100 });

            console.log("перейти к стратсессии");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-m0rsqb", { visible: true });
            await page.click( ".css-m0rsqb", { delay: 100 });

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
            // await page.click(".css-ax7ggk>div>div:first-of-type");
            // const buttonCss = await page.$$( ".css-1ymc8ta");
            // await buttonCss[0].click( { delay: 100 });
            await page.waitForSelector(".css-1ymc8ta", { visible: true });
            await page.click(".css-1ymc8ta", { delay: 100 });


            console.log("клик на проблему");
            await page.waitForTimeout(300);
            await page.waitForSelector( ".css-1gbhzto", { visible: true });
            await page.click( ".css-1gbhzto", { delay: 100 });

            console.log("клик на корзину");
            await page.waitForTimeout(600);
            await page.waitForSelector( ".css-c7h4ov", { visible: true });
            await page.click( ".css-c7h4ov", { delay: 100 });

            console.log("клик на удалить");
            await page.waitForTimeout(300);
            const delButton = await page.$$( ".css-m0rsqb");
            await delButton[0].click({ delay: 100 });

            const isSuccess = !(await isElement.exist( page, ".css-1gbhzto" ));

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

            await deleteMeeting({ page, companyId: "581", meetingId: ""});

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