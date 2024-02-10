import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import {clearCookies} from "@lib/extension";
import {type} from "os";


const testId = 114;

test({ id: testId, name: "Заполнение формы на лэндинге" }, async ({ runId,  page }) => {
    try {
        const name = "Михаил Исаев";
        const email = "mr89202769899@gmail.com";
        const phone = "+7 920 276 98 99";

        await clearCookies({ page });

        await page.goto(testsConfig.domain, { waitUntil: "domcontentloaded" });

        console.log("клик по стоимость:");
        await page.waitForTimeout(300);
        await page.waitForSelector(".menu__link.scroll-to", { visible: true });
        await page.click(".menu__link.scroll-to", { delay: 50 });

        console.log("Хочу сессию под ключ");
        await page.waitForTimeout(500);
        await page.waitForSelector(".price__item-title", { visible: true });
        await page.click(".price__item-title");

        console.log("Оставте заявку");
        await page.waitForTimeout(500);
        await page.waitForSelector(".go_form", { visible: true });
        await page.click(".go_form");

        console.log("вводим имя");
        await page.waitForTimeout(300);
        await page.waitForSelector(".consultation__input", { visible: true });
        await page.type(".consultation__input", name, {delay: 50});

        console.log("вводим email");
        await page.waitForTimeout(300);
        await page.waitForSelector('form.consultation__form > input:nth-child(2)', {visible:true});

        console.log("вводим телефон");
        await page.type('form.consultation__form > input:nth-child(2)', phone, { delay: 100 });

        console.log("вводим email");
        await page.waitForTimeout(300);
        await page.waitForSelector("form.consultation__form > input:nth-child(3)");
        await page.type("form.consultation__form > input:nth-child(3)", email, { delay: 100 });

        console.log("нажимаем Получить консультацию");
        await page.waitForTimeout(300);
        await page.waitForSelector("form.consultation__form > button:nth-of-type(1)", { visible: true });
        await page.click("form.consultation__form > button:nth-of-type(1)", { delay: 100 });

        const luckyMessage = await isElement.exist(page, ".title-back");
        await testResult({
            runId,
            testId,
            message: luckyMessage ? ResultCreateStatusEnum.PASSED : "Заявка успешо отправленна",
            status: luckyMessage ? ResultCreateStatusEnum.PASSED : ResultCreateStatusEnum.FAILED,
            steps: [
                {
                    status: luckyMessage ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED,
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