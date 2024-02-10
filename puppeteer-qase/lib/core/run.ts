import {QaseApi} from "qaseio";
import qaseConfig from "@lib/config/qase";

const qase = new QaseApi(qaseConfig.AUTH_KEY);

interface CreateRunProps {
    testIds: number[]
}

interface FinishRunProps {
    runId: number;
}

export const createRun = async (props: CreateRunProps): Promise<number> => {
    try {
        const createRunRes = await qase.runs.createRun(qaseConfig.PROJECT, {
            cases: props.testIds,
            description: "Run from autotests",
            tags: ["autotest"],
            title: "Run from autotests",
            include_all_cases: false,
            is_autotest: true,
        });

        const runId = createRunRes?.data?.result?.id;
        console.log("Create run", runId);
        return runId;
    } catch (e) {
        console.log("Create Run Error", e);
        return null;
    }
}

export const finishRun = async (props: FinishRunProps) => {
    try {
        const runRes = await qase.runs.getRun(qaseConfig.PROJECT, props.runId);

        if (runRes?.data?.result?.status !== 1) {
            const completeRunRes = await qase.runs.completeRun(qaseConfig.PROJECT, props.runId);
            console.log("Finish run", completeRunRes?.data);
            return completeRunRes;
        }
    } catch (e) {
        console.log("Finish Run Error", e);
        return null;
    }
}
