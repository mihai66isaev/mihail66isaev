import {test, testResult} from "@lib/core/test";
import {ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src";
import testsConfig from "@lib/config/tests";
import isElement from "@lib/extension/is-element";
import login from "@lib/scenario/login";
import {addUserCompany} from "@lib/scenario/add-user-company";


 const testId = 485;

 test({id: testId, name: "оповещение при добавлении в группу"}, async ({runId, page}) => {
     try {
         await page.goto(`${testsConfig.domain}/account/login`);

         const email = "testAddNotification@nail.ru";
         const pass = "988ddFc";
         const addLogin = "OQA21Test@gmail.com";
         await login({ page, email, pass });

         await page.goto(`${testsConfig.domain}/app/company/737/disk/17040`);

         await page.waitForTimeout(500);
         await page.waitForSelector("#company-link", {visible: true})
         await page.click("#company-link", {delay: 50})

         console.log("Клик на компанию");
         await page.waitForTimeout(500);
         await page.waitForSelector(".e17pdjvy3", {visible: true});
         await page.click(".e17pdjvy3", {delay: 50});

         await addUserCompany({page, companyId: "737", userId: " "})

         // console.log("layout-menu")
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

         // console.log("layout-menu")
         await page.waitForTimeout(500)
         await page.waitForSelector("#layout-menu", { visible: true })
         await page.click("#layout-menu", {delay: 50})

         const isSuccess = await isElement.exist( page, ".css-1ybrnuv" );

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


         await testResult({
             runId,
             testId,
             message: isSuccess ? ResultCreateStatusEnum.PASSED : "элементы объеденины, не смогли объединить элементы",
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
