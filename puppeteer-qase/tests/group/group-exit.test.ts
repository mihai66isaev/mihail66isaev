import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";


const testId = 515;

test({id: testId, name: "Удаление себя из чужой группы"}, async ({runId, page}) => {
    try {
        await page.goto(`${testsConfig.domain}`);

        await page.goto(`${testsConfig.domain}/account/login`);

        const email = "OQA21Test@gmail.com";
        const pass = "988ddFc";
        const email2 = "312test@gmail.com";
        await login({ page, email, pass });

        await page.goto( `${testsConfig.domain}/company/733/disk/17034`);

        await page.waitForTimeout(500);
        await page.waitForSelector("#company-link", {visible: true})
        await page.click("#company-link", {delay: 50})

        console.log("Клик на компанию");
        await page.waitForTimeout(500);
        await page.waitForSelector(".e17pdjvy3", {visible: true});
        await page.click(".e17pdjvy3", {delay: 50});


        console.log('Ссылка добавить участников')
        await page.waitForTimeout(500)
        await page.waitForSelector(".e55y8gb0", {visible: true})
        await page.click(".e55y8gb0", {delay: 50})


        console.log("Вводим email", email);
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-v987p4", {visible: true})
        await page.type(".css-v987p4", email2)

        console.log("Выбрать участника")
        await page.waitForTimeout(500)
        await page.waitForSelector(".emtl8hr6", {visible:true})
        await page.click(".emtl8hr6", {delay: 50})

        // console.log("Клик сохранить");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-m0rsqb", {visible: true})
        await page.click(".css-m0rsqb", {delay: 50})

        console.log("layout-menu");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-12zjz69.e1bzp2qv0")
        await page.click(".css-12zjz69.e1bzp2qv0", {delay: 50})

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
        await login({ page, email: email2, pass })

        // console.log("layout-menu");
        await page.waitForTimeout(500)
        await page.waitForSelector("#layout-menu", { visible: true })
        await page.click("#layout-menu", {delay: 50})

        // клик на компанию в оповещении
        await page.waitForTimeout(500)
        await page.waitForSelector( ".css-1ybrnuv", { visible: true })
        await page.click(".css-1ybrnuv", { delay: 100 })

        console.log("Покинуть компанию")
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-1uf772j", { visible: true })
        await page.click(".css-1uf772j", { delay: 100 })

        console.log("Покинуть")
        await page.waitForTimeout(500)
        await page.waitForSelector( ".css-m0rsqb", { visible: true })
        await page.click(".css-m0rsqb", { delay: 100 })

        // console.log("layout-menu")
        await page.waitForTimeout(500)
        await page.waitForSelector("#layout-menu", { visible: true })
        await page.click("#layout-menu", {delay: 50})

        console.log("Клик на профиль");
        await page.waitForTimeout(500)
        await page.waitForSelector(".css-14w4z62")
        await page.click(".css-14w4z62", {delay: 50})

        console.log("сворачиваем меню");
        await page.waitForTimeout(500);
        const iconBootn = await page.$$(".css-17ti31y");
        await iconBootn[1].click();

        const isSuccess = await isElement.exist( page, "#logout" );

        console.log("logout")
        await page.waitForTimeout(500)
        await page.waitForSelector("#logout", {visible: true})
        await page.click("#logout", {delay: 100})



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