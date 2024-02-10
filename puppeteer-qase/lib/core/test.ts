import {ResultCreate, ResultCreateStatusEnum, ResultCreateStepsStatusEnum} from "qaseio/dist/src/model";
import {QaseApi} from "qaseio";
import qaseConfig from "@lib/config/qase";
import { addToStorage } from "@lib/core/storage";
import {Browser, Page} from "puppeteer";

const qase = new QaseApi(qaseConfig.AUTH_KEY);

interface TestProps {
    id: number;
    name: string;
}

interface TestResultProps {
    runId: number;
    testId: number;
    status: ResultCreateStatusEnum;
    message: string;
    steps?: { position: number; status: ResultCreateStepsStatusEnum; }[]
}

interface FnProps {
    runId: number;
    browser: Browser;
    page: Page;
}

export const testResult = async (props: TestResultProps) => {
    //создаем результат прохождения теста
    try {
        const testResultParams: ResultCreate = {
            case_id: props.testId,
            status: props.status,
            comment: props.message,
            steps: props.steps
        };
        console.log("Finish Test", testResultParams);
        return await qase.results.createResult(qaseConfig.PROJECT, props.runId, testResultParams);
    } catch (e) {
        console.log("Could not create Test result", e);
    }
}

export const test = (props: TestProps, fn: (props: FnProps) => void) => {
    addToStorage({ props, fn });
}
