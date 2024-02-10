import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import {isElement} from "@lib/extension";
import login from "@lib/scenario/login";
import {createMeeting, deleteMeeting} from "@lib/scenario/session";
import {addUserCompany} from "@lib/scenario/add-user-company";

const testId = 88;

test( {id: testId, name: "Добавление нового пользователя в совещание"}, async ({runId, page}) => {
    try {

        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "addUserNewtest@mail.ru";
        const pass = "988ddFC";
        // const meetingName = "add user new";
        // const addLogin = "OQA21testDev@gmail.com";
        await login( { page, email, pass });


        await page.goto(`${testsConfig.domain}/company/215/disk/16145`)

        await createMeeting({ page, companyId: "215", parentId: "16145", meetingId: "", diskId: ""});

        await page.waitForTimeout( 500);
        await page.waitForSelector("#company-link", { visible: true });
        await page.click( "#company-link", { delay: 100 });

        // console.log("клик удалить");
        // await page.waitForTimeout(500);
        // const MuiButtonBasetBtm = await page.$$(".css-1ln4c4v");
        // await MuiButtonBaseBtm[0].click({ delay: 100 });

        console.log("клик на компанию");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1emibhp", { visible: true });
        await page.click(".css-1emibhp", { delay: 100 });

        // MuiTypography-root MuiTypography-body1 css-1ln4c4v

        // console.log("клик на компанию");
        // const companyId = 215;
        // await page.waitForTimeout(500);
        // await page.waitForSelector( `[data-id="${companyId}"]`, { visible: true });
        // await page.click( `[data-id="${companyId}"]`);

        await addUserCompany({ page, companyId: "215", userId: ""});

        await page.waitForTimeout(500);
        await page.waitForSelector("#disk-link", { visible: true });
        await page.click( "#disk-link");

        console.log("клик на сессию в диске");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1en7n8s", { visible: true });
        await page.click( ".css-1en7n8s");

        console.log("сслыка добавить участника в сессию");
        await page.waitForTimeout( 1000);
        await page.waitForSelector(".css-1br79ws",{ visible: true});
        await page.click( ".css-1br79ws");

        console.log("клик на 2 поле с новым участником");
        await page.waitForTimeout(600);
        await page.waitForSelector(".css-111gbiu", { visible: true });
        await page.click(".css-111gbiu");

        console.log("клик сохранить");
        await page.waitForTimeout(600);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb");


        console.log("сслыка добавить участника в сессию");
        await page.waitForTimeout( 1000);
        await page.waitForSelector(".css-1br79ws",{ visible: true});
        await page.click( ".css-1br79ws");


        console.log("проверяет наличие второго элемента в списке");
        const isSuccess = !(await isElement.exist( page, ".css-111gbiu"));

        console.log("клик сохранить");
        await page.waitForTimeout(600);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb");

        await page.waitForTimeout(300);
        await page.waitForSelector( "#company-link", { visible: true });
        await page.click( "#company-link");

        console.log("клик на компанию");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1emibhp", { visible: true });
        await page.click(".css-1emibhp", { delay: 100 });

        console.log("удалить участника в группе");
        await page.waitForTimeout(300);
        await page.click( "[data-id='317'] button.delete-button");
        // const dellBtm  = await page.$$(".delete-button");
        // await dellBtm[1].click();

        await deleteMeeting( { page, companyId: "215", meetingId: ""});


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
})