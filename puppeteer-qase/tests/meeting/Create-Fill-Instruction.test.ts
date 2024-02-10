import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createButtonSession, deleteMeeting} from "@lib/scenario/session";
import {createTopic} from "@lib/scenario/topic";

const testId = 546;

test({ id: testId, name: "Создание инструкции для заполнения." }, async ({ runId, page}) => {
    try {

        await page.goto(`${testsConfig.domain}/account/login`);

        const instruction = "Участники переходят по QR-коду или ссылке справа и авторизуются\n" +
            "Ведущий сессии нажимает кнопку \"Отправить на заполнение\" слева внизу\n" +
            "Участники пишут проблемы, стараясь смотреть с разных точек зрения. Например, проблемы клиентов, продукта или сотрудников. Проблемы лучше писать через существительные и указывать предполагаемые ограничения, которые мешают их решить\n" +
            "После того, как участники закончили писать, ведущий нажимает кнопку «Получить список Проблем»\n" +
            "Ведущий по советам участников нажимает на одинаковые проблемы и объединяет их в одну с помощью меню снизу\n" +
            "Затем перетаскивает элементы в соответствии с приоритетами и выбирает главный\n" +
            "Можно пропустить заполнение участниками";
        const email = "CreateAFillInstruction@gmail.com";
        const pass = "988ddFc";
        await page.waitForTimeout(500);
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/579/disk/16809`);

        await createButtonSession({ page,companyId: "579", parentId: "16809", meetingId: ""});

        await createTopic({ page, companyId: "579", meetingId: "", topicId: ""});

        console.log("выбрать сценарий");
        await page.waitForTimeout(500);
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

        console.log("Отправить на заполнение");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#generating-end-button", { visible: true });
        await page.click( "#generating-end-button", { delay: 100 });

        console.log("Запустить");
        await page.waitForTimeout(500);
        const Botn  = await page.$$(".css-m0rsqb");
        await Botn[2].click({ delay: 100 });


        console.log("клик на ссылку-для участников");
        await page.waitForTimeout(500);
        await page.waitForSelector("#custom-faq-link", { visible: true });
        await page.click( "#custom-faq-link", { delay: 100 });

        await page.waitForTimeout(500);
        await page.waitForSelector("#custom-faq-open-update-modal", { visible: true });
        await page.click("#custom-faq-open-update-modal", { delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector( "#custom-faq-update-textarea", { visible: true });
        await page.type( "#custom-faq-update-textarea", instruction, { delay: 50 });

        console.log("сохранить");
        await page.waitForTimeout(500);
        await page.waitForSelector("#custom-faq-update-submit", { visible: true });
        await page.click( "#custom-faq-update-submit", { delay: 100 });

        const isSuccess = !(await isElement.exist( page, ".css-6ggs9z e1mkl0j10"));

        console.log("Получить список проблем");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#generating-start-button", { visible: true });
        await page.click( "#generating-start-button", { delay: 100 });

        // console.log("close QR");
        // await page.waitForTimeout(500);
        // const buttonClose = await page.$$(".css-17ti31y");
        // await buttonClose[4].click( { delay: 50 });
        //
        // console.log("Запустить");
        // await page.waitForTimeout(500);
        // const buttonCl = await page.$$(".css-m0rsqb");
        // await buttonCl[2].click( { delay: 50 });
        //
        // console.log("клик на ссылку-для участников");
        // await page.waitForTimeout(500);
        // await page.waitForSelector("#custom-faq-link", { visible: true });
        // await page.click( "#custom-faq-link", { delay: 100 });

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

        await deleteMeeting({ page, companyId: "579", meetingId: ""});

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "форма для заполнения пуста",
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