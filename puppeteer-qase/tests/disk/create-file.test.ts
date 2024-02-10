import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createFolder, deletFolder} from "@lib/scenario/folder";


const testId = 382;

test( { id: testId, name: "Создание папки на странице ceccии"}, async ({ runId , page }) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "creatFiletest@gmail.com";
        const pass = "988ddFc";
        await login({ page, email, pass });

        await page.waitForTimeout( 500 );
        await page.goto(`${testsConfig.domain}/company/209/disk/16128`);

        await page.waitForTimeout( 500 );
        await createFolder({ page, companyId: "209", parentId: "16128", folderId: "", folderName: "" });

        const isSuccess = await isElement.exist(page, ".css-xxdeq1" );

        await deletFolder({ page, companyId: "209", parentId: "16128", folderName: "", Id: "" });

        // const isSuccess = await isElement.exist(page, ".css-xxdeq1" );

        // const isSuccess = !(await isElement.exist( page, `data-meeting-id="${meetingId}`));
        // console.log(isSuccess ? "Сессия удалена" : "Не смогли удалить сессию");
        // return isSuccess;



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
});