import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
// import {createCompanyByUrl} from "@lib/scenario/company";
import {createMeeting, deleteMeeting} from "@lib/scenario/session";

const testId = 32;

test( { id: testId, name: "Редактирование сессии"}, async ({ runId , page}) => {

try {
    await page.goto(`${testsConfig.domain}/account/login`);

    const email = "renameMeetingTest@mail.ru";
    const pass = "988ddFc";
    const meetingRedactor = ": redactor";
    await login({ page, email, pass });

    await page.goto( `${testsConfig.domain}/company/206/disk/16121`);

    await createMeeting({ page, companyId: "206", parentId: "16121", meetingId: "", diskId: "" });

    console.log("кнопка троеточие");
    await page.waitForTimeout(300);
    await page.waitForSelector(".css-1j7qk7u", { visible: true });
    await page.click( ".css-1j7qk7u", {delay: 100});

    // console.log("выбирает 2 кнопку");
    await page.waitForTimeout(300);
    const redactorButton = await page.$$(".css-1cui616");
    await redactorButton[1].click({delay: 50});

    console.log("редактирует");
    await page.waitForTimeout(1000);
    await page.waitForSelector( "#update-session-name", { visible: true });
    await page.type( "#update-session-name", meetingRedactor, { delay: 50 });

    await page.waitForTimeout(1000);
    await page.waitForSelector( ".css-1pkb6fu", { visible: true });
    await page.click( ".css-1pkb6fu");

    const isSuccess = await isElement.exist( page, ".css-xxdeq1" );

    await deleteMeeting( { page, companyId: "206", meetingId: "", });

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