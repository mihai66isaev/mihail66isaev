// import testsConfig from "@lib/config/tests";
import {Page} from "puppeteer";
import {isElement} from "@lib/extension";

interface CreteTopic {
    page: Page;
    companyId: string;
    meetingId: string;
    topicId: string;
}

export const createTopic = async ({ page, topicId }: CreteTopic) => {
    try {
        const topicName = "submit on click";

        console.log("название темы");
        await page.waitForTimeout(300);
        await page.waitForSelector( ".css-b52kj1", { visible: true });
        await page.type( ".css-b52kj1", topicName, { delay: 100 });

        // console.log("клик по пустому месту чтобы сохранить");
        // await page.waitForTimeout(300);
        // await page.waitForSelector( ".css-1e4r9pz", { visible: true });
        // await page.click( ".css-1e4r9pz", { delay: 100 });

        console.log("Клик на '+'");
        await page.waitForTimeout(300);
        const ellipsisButton = await page.$$(".css-vubbuv");
        await ellipsisButton[7].click({delay: 50});

        const isSuccess = !(await isElement.exist( page, `data-rbd-droppable-id="${topicId}`));
        console.log(isSuccess ? "Тема создана" : "Не смогли создать тему");
        return isSuccess;
    } catch (e) {
        console.log("error in createTopic", e);
        return false;
    }
}