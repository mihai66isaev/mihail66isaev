import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {createFolder, deletFolder} from "@lib/scenario/folder";
import {createMeeting} from "@lib/scenario/session";

const testId = 477;

test( { id: testId, name: "создание сессии в папке"}, async ({ runId , page}) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`);

        // const Name = "freeWork-test";
        const email = "createInFolderTest@mail.ru";
        const pass = "988ddFc";
        await login({page, email, pass});

        await page.goto(`${testsConfig.domain}/company/228/disk/16173`);

        await createFolder({ page, companyId: "228", parentId: "16173", folderId: "", folderName: "" });
        await page.waitForTimeout(600);

        console.log("клик по папке");
        console.log("Клик на ...");
        await page.waitForTimeout(300);
        const ellipsisButton = await page.$$(".css-vubbuv");
        await ellipsisButton[5].click({delay: 50});

        console.log("перейти");
        await page.waitForTimeout(500);
        const select = await page.$$( ".css-1cui616");
        await select[0].click(  { delay: 100 });

        await page.goto(`${testsConfig.domain}/company/228/disk/`);

        // console.log("Клик на ...");
        // await page.waitForTimeout(300);
        // const ellipsis = await page.$$(".css-vubbuv");
        // await ellipsis[5].click({delay: 50});

        await createMeeting({ page, companyId: "228", parentId: "16173", meetingId: "", diskId: ""});
        await page.waitForTimeout(300);

        console.log("проверяем наличие сессии");
        const isSuccess = await isElement.exist( page, "css-w1tfmd");

        // await deleteMeeting({page, companyId: "228", meetingId: ""});
        // await page.waitForTimeout(300);

        console.log("кнопка троеточие");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1j7qk7u", { visible: true });
        await page.click( ".css-1j7qk7u", {delay: 100});



        console.log("клик удалить");
        await page.waitForTimeout(300);
        const delletButton = await page.$$(".css-1cui616");
        await delletButton[2].click({delay: 50});

        console.log("кнопка удалить");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-17e6m4v", { visible: true });
        await page.click( ".css-17e6m4v");

        await deletFolder({page, companyId: "228", parentId: "16173", folderName: "", Id: ""});
        await page.waitForTimeout(300);

        await testResult( {
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