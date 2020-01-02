
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

    static perform(target: any, methodName: string, paramValues: any[]): string[] {

        const errMsgArr: string[] = [];

        const paramMap: Map<string, number[]> = this.validationMap.get(target);

        if (!paramMap) {
            return null;
        }

        let paramIndexes: number[] = paramMap.get(methodName);

        if (!paramIndexes) {
            return null;
        }

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            if(index === 0) {
                const msg = isValidValue(paramValue);
                msg && errMsgArr.push(msg);
            }

            if(index === 1) {
                const msg = isValidIndex(paramValue);
                msg && errMsgArr.push(msg);
            }            
        }

        return errMsgArr
    }

}

function isValidValue(value: any): string | null {
    if(value === null ||  value === undefined || Number(value) === NaN || Number(value) === Infinity || String(value) === "") {
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