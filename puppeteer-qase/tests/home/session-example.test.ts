import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import {clearCookies} from "@lib/extension";
// import {type} from "os";

const testId = 560;

test({id: testId, name: "Пример сессии" }, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}`)

        await clearCookies({ page });

        await page.goto(testsConfig.domain, { waitUntil: "domcontentloaded" });

        console.log("пример сесии");
        await page.waitForTimeout(300);
        const link = await page.$$(".menu__link.scroll-to");
        await link[1].click({ delay: 50 });

        // console.log("клик по стрелке");
        // await page.waitForTimeout(300);
        // await page.waitForSelector(".button-slider", { visible: true });
        // await page.click(".button-slider", { delay: 50 });
        //
        // console.log("клик по стрелке");
        // await page.waitForTimeout(300);
        // await page.waitForSelector(".button-slider", { visible: true });
        // await page.click(".button-slider", { delay: 50 });


        const isSuccess = await isElement.exist( page, ".swiper-slide-active" );

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