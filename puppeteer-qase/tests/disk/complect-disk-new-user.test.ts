import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {goToCompanyListByUrl} from "@lib/scenario/company";
// import {addUserCompany} from "@lib/scenario/add-User-Companu";
import {deletFolder} from "@lib/scenario/folder";
// import {createMeeting} from "@lib/scenario/session";

const testId = 487;

test({id: testId, name: "Наличие папок и сессий на странице Сессии у нового пользователя"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}/app/account/login`);

        const sessionName = "folderSession-test";
        const email = "testDisk@gmail.com";
        const pass = "988ddFc";
        const addLogin = "OQA21Test@gmail.com";
        const folderName = "folder";
        await login({ page, email, pass });

        await page.goto(`${testsConfig.domain}/app/company/738/disk/17044`);

        console.log("малая кнопка создать");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb", { delay: 50 });

        console.log("кнопка папка");
        await page.waitForTimeout(600);
        await page.click( ".css-slaycx>div>div:first-of-type");

        console.log("вводим имя папки");
        await page.waitForTimeout(1000);
        await page.waitForSelector("#folder-name", {visible: true});
        await page.type( "#folder-name", folderName, {delay: 50});

        console.log("Сохранить");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#folder-update-submit", { visible: true });
        await page.click( "#folder-update-submit");

        console.log("Клик на папку");
        await page.waitForTimeout(500);
        await page.waitForSelector(".e6pp6l92", { visible: true });
        await page.click(".e6pp6l91", { delay: 50});

        // await createMeeting({page, companyId: "", diskId: "", meetingId: ""})
        console.log("малая кнопка создать");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-m0rsqb", { visible: true });
        await page.click(".css-m0rsqb", { delay: 50 });


        console.log("кнопка сессия");
        await page.waitForTimeout(600);
        await page.click( ".css-slaycx>div>div:last-of-type");

        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-name", { visible: true });
        await page.type( "#meeting-name", sessionName, { delay: 50 });

        console.log("сохранить");
        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-submit" );
        await page.click( "#meeting-submit" );

        await page.waitForTimeout(300);
        await goToCompanyListByUrl({ page, companyId: "738" });

        // console.log("клик на компанию");
        // await page.waitForTimeout(300);
        // await page.waitForSelector( ".css-1emibhp", { visible: true });
        // await page.click( ".css-1emibhp");
        //
        // await addUserCompany({ page, companyId: "738", userId: "" });

        console.log("layout-menu");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-17ti31y", { visible: true })
        await page.click(".css-17ti31y", {delay: 50})

        console.log("Клик на профиль");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-14w4z62")
        await page.click(".css-14w4z62", {delay: 50})

        console.log("сворачиваем меню");
        await page.waitForTimeout(500);
        const iconBtn = await page.$$(".css-17ti31y");
        await iconBtn[1].click();

        console.log("logout")
        await page.waitForTimeout(500)
        await page.waitForSelector("#logout", {visible: true})
        await page.click("#logout", {delay: 100})

        console.log("landing")
        await page.waitForTimeout(500)
        await page.waitForSelector(".e1uc3pr60", {visible: true})
        await page.click(".e1uc3pr60", {delay: 100})

        await page.goto(`${testsConfig.domain}`);

        await page.goto(`${testsConfig.domain}/account/login`);

        await page.waitForTimeout(500);
        await login({ page, email: addLogin, pass })

        console.log("layout-menu");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-17ti31y", { visible: true })
        await page.click(".css-17ti31y", {delay: 50})

        // console.log("Ссылка на компанию, уведомления");
        // await page.waitForTimeout(500);
        // await page.waitForSelector(".css-1ybrnuv", { visible: true });
        // await page.click(".css-1ybrnuv", { delay: 50 });

        // console.log("Cессии");
        // await page.waitForTimeout(500);
        // await page.waitForSelector(".css-1q4vxyr.e19701fu0", { visible: true });
        // await page.click(".css-1q4vxyr.e19701fu0", { delay: 50});

        console.log("сворачиваем меню");
        await page.waitForTimeout(500);
        const iconBootn = await page.$$(".css-17ti31y");
        await iconBootn[1].click();

        console.log("Клик на папку");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1sj5vxz.e6pp6l92", { visible: true });
        await page.click(".css-1sj5vxz.e6pp6l92", { delay: 50});

        const isSuccess = await isElement.exist( page, ".css-1ip69yp.e1iiio3t4" );

        console.log("Клик на папку");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-1sj5vxz.e6pp6l92", { visible: true });
        await page.click(".css-1sj5vxz.e6pp6l92", { delay: 50});

        await deletFolder({ page, companyId: "738", parentId: "17044", Id: "", folderName: ""});


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