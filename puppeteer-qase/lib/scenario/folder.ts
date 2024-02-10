import testsConfig from "@lib/config/tests";
import {Page} from "puppeteer";
import {isElement} from "@lib/extension";
// import browser from "@lib/core/browser";

interface CreateFolder {
    page: Page;
    companyId: string;
    folderId: string;
    folderName: string;
    parentId: string;
}

export const  createFolder = async ({ page, companyId,  parentId, folderId }: CreateFolder) => {
    try {

        const folderName = "session test";

        await page.goto(`${testsConfig.domain}/company/${companyId}/disk/${parentId}`);

        console.log("малая кнопка создать");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1ol87a4", { visible: true });
        await page.click( ".css-1ol87a4");


        console.log("кнопка папка");
        await page.waitForTimeout(600);
        await page.click( ".css-1y3ebld");
        // await page.click( ".css-slaycx>div>div:first-of-type");

        console.log("вводим имя папки");
        await page.waitForTimeout(1000);
        await page.waitForSelector("#update-folder-name", {visible: true});
        await page.type( "#update-folder-name", folderName, {delay: 50});

        console.log("Сохранить");
        await page.waitForTimeout(600);
        await page.waitForSelector( ".css-1pkb6fu", { visible: true });
        await page.click( ".css-1pkb6fu");

        const isSuccess = ! await isElement.exist( page, `data="${folderId}`);
        console.log(isSuccess ? "Папка создана" : "Не смогли coздать папку");
        return isSuccess;


    } catch (e) {
        console.log("error in createFolder", e);
        return false;
    }
}

interface DeletFolder {
    page: Page;
    companyId: string;
    Id: string;
    folderName: string;
    parentId: string;
}

export const deletFolder = async ({ page, companyId, parentId, Id }: DeletFolder ) => {
    try {
        await page.goto(`${testsConfig.domain}/company/${companyId}/disk/${parentId}`);

        console.log("Клик на ...");
        await page.waitForTimeout(300);
        const ellipsis = await page.$$(".css-vubbuv");
        await ellipsis[5].click({delay: 50});

        await page.waitForTimeout(300);
        const deletbut = await page.$$(".css-1cui616");
        await deletbut[2].click();

        // console.log("выбирает 2 кнопку");
        // await page.waitForTimeout(600);
        // await page.click( ".css-r8u8y9>div:last-of-type");

        console.log("Удалить");
        await page.waitForTimeout(300);
        await page.waitForSelector(".css-17e6m4v", { visible: true });
        await page.click( ".css-17e6m4v", { delay: 100 });

        const isSuccess =  ! await isElement.exist!( page, `data="${Id}`);
        console.log(isSuccess ? "Папка удалена" : "Не смогли удалить папку");
        return isSuccess;

    } catch (e) {
        console.log("error in deletFolder", e);
        return false;
    }
}