import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import {test, testResult} from "@lib/core/test";
import login from "@lib/scenario/login";
import isElement from "@lib/extension/is-element";
import testsConfig from "@lib/config/tests";
import {createCompanyByUrl} from "@lib/scenario/company";

const testId = 93;

test( {id: testId,  name: "Удалить группу" }, async({ runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "deletGroup@mail.ru";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/610/disk/16851`);

        await page.waitForTimeout(300);
        await page.waitForSelector("#company-link", { visible: true });
        await page.click("#company-link", { delay: 50 });

        await createCompanyByUrl({ page, companyId: "610", name: "" });

        console.log("клик по последней компании")
        await page.waitForTimeout(300);
        await page.click(".css-1s2bkyk>div:last-of-type", { delay: 100 });

        console.log("Удалить группу");
        await page.waitForTimeout(300);
        const deletButton = await page.$$(".css-1uf772j");
        await deletButton[1].click({ delay: 50 });

        await page.waitForTimeout(300);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb", { delay: 50 });

        const isSuccess = await isElement.exist(page, ".css-6mk4mh" );

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

// try {
//     await page.goto(`${testsConfig.domain}/account/login`);
//
//     const email = "deletGroup@mail.ru";
//     const pass = "988ddFc";
//
//     await login({ page, email, pass });
//
//     const isSuccess = await isElement.exist(page, "#create-first-session-button" );
//
//     await testResult( {
//         runId,
//         testId,
//         message: isSuccess ? ResultCreateStatusEnum.PASSED : "expected isSuccess true, but got false",
//         status: isSuccess ? ResultCreateStatusEnum.PASSED : ResultCreateStatusEnum.FAILED,
//         steps: [
//             {
//                 status: isSuccess ? ResultCreateStepsStatusEnum.PASSED : ResultCreateStepsStatusEnum.FAILED,
//                 position: 1
//             }
//         ],
//     })
// } catch (e) {
//     await testResult({
//         runId,
//         testId,
//         message: JSON.stringify(e.message),
//         status: ResultCreateStatusEnum.FAILED,
//         steps: [
//             { status: ResultCreateStepsStatusEnum.FAILED, position: 1 }
//         ],
//     })
// }