
import { Errors } from "@Utils/error-handling";

export class Validator {

    private static validationMap: Map<any, Map<string, number[]>> = new Map();

    //todo add more validator maps
    static register(target: any, methodName: string, paramIndex: number): void {

        let paramMap: Map<string, number[]> = this.validationMap.get(target);

        if (!paramMap) {
            paramMap = new Map();
            this.validationMap.set(target, paramMap);
        }

        let paramIndexes: number[] = paramMap.get(methodName);

        if (!paramIndexes) {
            paramIndexes = [];
            paramMap.set(methodName, paramIndexes);
        }

        paramIndexes.push(paramIndex);
    }

    static performValueValidation(target: any, methodName: string, paramValues: any[]): string[] {
        const errMsgArr: string[] = [];

        const paramMap: Map<string, number[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexes: number[] = paramMap.get(methodName);

        if (!paramIndexes) {
            return errMsgArr;
        }

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            const msg = isValidValue(paramValue);

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

    static performIndexValidation(target: any, methodName: string, paramValues: any[]): string[] {
        const errMsgArr: string[] = [];

        const paramMap: Map<string, number[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexes: number[] = paramMap.get(methodName);

        if (!paramIndexes) {
            return errMsgArr;
        }

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            const msg = isValidIndex(paramValue);

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

    static performAllValidation(target: any, methodName: string, paramValues: any[]): string[] {

        const errMsgArr: string[] = [];

        const paramMap: Map<string, number[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexes: number[] = paramMap.get(methodName);

        if (!paramIndexes) {
            return errMsgArr;
        }

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            let msg: string = undefined;

            if (index === 0) {
                msg = isValidValue(paramValue);
            }

            if (index === 1) {
                msg = isValidIndex(paramValue);
            }

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

}

function isValidValue(value: any): string | null {
    if (value === null || value === undefined || Number(value) === NaN || Number(value) === Infinity || String(value) === "") {
        return Errors.Msg.InValidArg;
    }

    return null
}

function isValidIndex(index: number): string | null {
    if (!index && index !== 0) {
        return Errors.Msg.InValidArg;
    }

    if (!Number.isSafeInteger(index)) {
        return Errors.Msg.InValidIdx;
    }

    return null;
}

