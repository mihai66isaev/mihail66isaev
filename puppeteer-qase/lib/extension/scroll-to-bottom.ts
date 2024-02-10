import { Page } from "puppeteer";

const scrollToBottom = async (page: Page): Promise<any> => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve(null);
                }
            }, 100);
        });
    });
}

export default scrollToBottom;
