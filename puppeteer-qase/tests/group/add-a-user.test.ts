import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {goToCompanyListByUrl} from "@lib/scenario/company";
import {addUserCompany} from "@lib/scenario/add-user-company";


const testId = 28;

test({ id: testId, name: "добавление участника в компанию"}, async ({ runId, page }) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "testAddUser@nail.ru";
        const pass = "988ddFc";
        // const addLogin = "OQA21test@gmail.com";
        await login({ page, email, pass });

        await page.goto( `${testsConfig.domain}/company/204/disk/16119`);

        await page.waitForTimeout(300);
        await goToCompanyListByUrl({ page, companyId: "204" });

        await page.waitForTimeout(300);
        const ellipsisButton = await page.$$(".css-vubbuv");
        await ellipsisButton[5].click({delay: 50});

        console.log("перейти");
        await page.waitForTimeout(500);
        const select = await page.$$( ".css-1cui616");
        await select[1].click(  { delay: 100 });

        await addUserCompany({ page, companyId: "204", userId: "" });

        const isSuccess = ! await isElement.exist( page, "addLogin");

        await page.waitForTimeout(300);
        const deletButton = await page.$$( ".css-vubbuv");
        await deletButton[7].click( { delay: 100 });

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

    }  catch (e) {
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