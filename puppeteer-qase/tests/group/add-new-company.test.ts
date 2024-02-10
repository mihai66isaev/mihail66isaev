import {test, testResult} from "@lib/core/test";
import {ResultCreateStepsStatusEnum, ResultCreateStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {goToCompanyListByUrl} from "@lib/scenario/company";
import {createCompanyByUrl} from "@lib/scenario/company";
// import {Page} from "puppeteer";

const testId = 27;


test( { id: testId,  name: "Создание компании"}, async({ runId, page}) => {
    try {

        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "createDeletCompanytest@mail.ru";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/242/disk/16252`);

        await goToCompanyListByUrl({ page, companyId: "242" });

        await createCompanyByUrl( { page, companyId: "242", name: ""});

        const isSuccess = await isElement.exist( page, ".css-1auftbk");

        console.log("Клик на ...");
        await page.waitForTimeout(300);
        const ellipsis = await page.$$(".css-vubbuv");
        await ellipsis[6].click({delay: 50});

        console.log("удалить группу");
        await page.waitForTimeout(300);
        const delletButton = await page.$$(".css-1cui616");
        await delletButton[2].click({delay: 50});

        console.log("кнопка удалить");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-17e6m4v", { visible: true });
        await page.click( ".css-17e6m4v");


        await  testResult( {
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
    }catch (e) {
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