import testsConfig from "@lib/config/tests";
import {Page} from "puppeteer";
import {isElement} from "@lib/extension";

interface DeleteMeeting {
    page: Page;
    companyId: string;
    // folderId: string;
    meetingId: string;

}

export const  deleteMeeting = async ({ page, companyId,  meetingId }: DeleteMeeting) => {
    try {

        // console.log("Диск в меню");
        // await page.waitForTimeout(1000);
        // await page.waitForSelector( "#disk-link", { visible: true });
        // await page.click( "#disk-link");

        // console.log("Клик на троеточие");
        // await page.waitForTimeout(600);
        // await page.waitForSelector(".css-1j7qk7u", { visible: true });
        // await page.click(".css-1j7qk7u", {delay: 50});

        // console.log("кнопка удалить");
        // await page.waitForTimeout(600);
        // await page.click( ".e1e2egtx0.css-1ez20fy>div>div:last-of-type");

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


        await page.goto(`${testsConfig.domain}/company/${companyId}/disk/${meetingId}`);

        const isSuccess = !(await isElement.exist( page, `data-meeting-id="${meetingId}`));
        console.log(isSuccess ? "Сессия удалена" : "Не смогли удалить сессию");
        return isSuccess;

    } catch (e) {
        console.log("error in deleteMeeting", e);
        return false;
    }
}

interface CreateMeeting {
    page: Page;
    companyId: string;
    parentId: string;
    meetingId: string;
    diskId: string;
}

export const  createMeeting = async ({ page, companyId, parentId, meetingId }: CreateMeeting) => {
    try {

        const sessionName = "freeWork-test";

        await page.goto(`${testsConfig.domain}/company/${companyId}/disk/${parentId}`);

        console.log("малая кнопка создать");
        await page.waitForTimeout(500);
        await page.waitForSelector( ".css-1ol87a4", { visible: true });
        await page.click( ".css-1ol87a4", { delay: 100 });


        console.log("кнопка сессия");
        await page.waitForTimeout(600);
        await page.click( "#CreateSpeedDial-action-1-label");


        await page.waitForTimeout(300);
        await page.waitForSelector( "#update-session-name", { visible: true });
        await page.type( "#update-session-name", sessionName, { delay: 50 });

        console.log("сохранить");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-1pkb6fu" );
        await page.click( ".css-1pkb6fu" );

        const isSuccess = await isElement.exist( page, `data-meeting-id="${meetingId}`);
        console.log(isSuccess ? "Сессия создана" : "Не смогли coздать сессию");
        return isSuccess;
    } catch (e) {
        console.log("error in createMeeting", e);
        return false;
    }
}

interface CreateButtonSession {
    page: Page;
    companyId: string;
    parentId: string;
    meetingId: string;
}

export const createButtonSession = async ({ page, companyId, parentId }: CreateButtonSession) => {
    try {

        const meetingName = "first button";

        await page.goto(`${testsConfig.domain}/company/${companyId}/disk/${parentId}`);

        await page.waitForTimeout(400)
        await page.waitForSelector("#create-first-session-button" );
        await page.click("#create-first-session-button" );

        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-name", { visible: true });
        await page.type( "#meeting-name", meetingName, { delay: 50 });

        // клик сохранить
        await page.waitForTimeout(300);
        await page.waitForSelector( "#meeting-submit", { visible: true } );
        await page.click( "#meeting-submit" );

        const isSuccess = await isElement.exist( page, ".css-1br79ws");
        console.log(isSuccess ? "Сессия создана" : "Не смогли coздать сессию");
        return isSuccess;

    } catch (e) {
        console.log("error in createMeeting", e);
        return false;
    }
}

interface ExitTheFromGrid {
    page: Page;
    companyId: string;
    meetingId: string;
    topicId: string;
}

export const exitTheFromGrid = async ({ page, companyId, meetingId, topicId }: ExitTheFromGrid) => {
    try {
        await page.goto(`${testsConfig.domain}/company/${companyId}/meeting/${meetingId}/topic/${topicId}/generation/1`);

        console.log("Стрелка назад нa grid");
        await page.waitForTimeout(500);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0", { delay: 100 });

        console.log("Стрелка назад не дашборде");
        await page.waitForTimeout(400);
        await page.waitForSelector(".css-1g5egf0", { visible: true });
        await page.click(".css-1g5egf0",{ delay: 100 });

        const isSuccess = await isElement.exist( page, ".css-m0rsqb");
        console.log(isSuccess ? "Вышли из сессии" : "Не смогли покинуть сессию");
        return isSuccess;

    } catch (e) {
        console.log("error in createMeeting", e);
        return false;
    }
};
