import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import login from "@lib/scenario/login";
import {isElement} from "@lib/extension";
import {createCompanyByUrl} from "@lib/scenario/company";
import {addUserCompany} from "@lib/scenario/add-user-company";
// import browser from "@lib/core/browser";
// import isElement from "@lib/extension/is-element";


const testId = 355;

test( {id: testId, name: "список участников у нового пользователя"}, async({ runId, page }) => {
    try {
        await page.goto(`${testsConfig.domain}/account/login`)

        const email = "listUserNew@mail.ru";
        const pass = "988ddFc";
        // const newCompanu = "new";
        // const email2 = "OQA21test@gmail.com";
        await login( { page, email, pass });

        await page.goto( `${testsConfig.domain}/company/337/disk/16421`);

        await createCompanyByUrl({ page, companyId: "337", name: ""});

        console.log("клик на компанию 2");
        await page.waitForTimeout(500);
        const newCompany =  await  page.$$( ".css-1emibhp");
        await newCompany[1].click({ delay: 100 });

        await addUserCompany({ page, companyId: "337", userId: "" });

        await page.waitForTimeout( 500);
        await page.waitForSelector("#disk-link", { visible: true });
        await page.click( "#disk-link", { delay: 100 });

        await page.waitForTimeout( 500);
        await page.waitForSelector("#company-link", { visible: true });
        await page.click( "#company-link", { delay: 100 });


        console.log("клик на компанию 2");
        await page.waitForTimeout(500);
        const neoCompany =  await  page.$$( ".css-1emibhp");
        await neoCompany[1].click({ delay: 100 });

        console.log("клиk на ссылку |добавить участников|");
        await page.waitForTimeout(1000);
        await page.waitForSelector( ".css-1br79ws", { visible: true });
        await page.click( ".css-1br79ws");

        const isSuccess = await isElement.exist( page, ".css-111gbiu");

        console.log("Отмена");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1uf772j", { visible: true });
        await page.click( ".css-1uf772j");

        await page.waitForTimeout( 500);
        await page.waitForSelector("#disk-link", { visible: true });
        await page.click( "#disk-link", { delay: 100 });

        await page.waitForTimeout( 500);
        await page.waitForSelector("#company-link", { visible: true });
        await page.click( "#company-link", { delay: 100 });

        console.log("клик на компанию 2");
        await page.waitForTimeout(500);
        const neuCompany =  await  page.$$( ".css-1emibhp");
        await neuCompany[1].click({ delay: 100 });

        console.log("клик на корзину 2");
        await page.waitForTimeout(500);
        const basketBtn =  await page.$$( ".delete-button");
        await basketBtn[1].click({ delay: 100 });

        console.log("удалить группу");
        await page.waitForTimeout(500);
        const buttonDell = await page.$$( ".css-1uf772j");
        await buttonDell[1].click({ delay: 100});

        console.log("клик удалить в модальном окне");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".delete-group-submit", { visible: true });
        await page.click( ".delete-group-submit");

        await testResult({
            runId,
            testId,
            message: isSuccess ? ResultCreateStatusEnum.PASSED : "Список участников пуст",
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


