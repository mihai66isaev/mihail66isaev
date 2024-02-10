import {Browser, Page} from "puppeteer";

interface FnProps {
    runId: number;
    browser: Browser;
    page: Page;
}

type ITest = {
    props: { id: number; name: string };
    fn: (props: FnProps) => void;
};

export type IStorage = ITest[];

const storage: IStorage = [];

export const getStorage = (): IStorage => storage;

export const addToStorage = (item: ITest) => {
    storage.push(item)
}
