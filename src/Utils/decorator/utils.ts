
import { Errors } from "@Utils/error-handling";
import { getElemType, TYPES } from "@Utils/types";

interface IdxWithType {
    idx: number;
    type: string
}

export class Validator {

    private static validationMap: Map<any, Map<string, IdxWithType[]>> = new Map();

    //todo add more validator maps
    static register(target: any, methodName: string, paramIndex: number, type: string): void {

        let paramMap: Map<string, IdxWithType[]> = this.validationMap.get(target);

        if (!paramMap) {
            paramMap = new Map();
            this.validationMap.set(target, paramMap);
        }

        let paramIndexes: IdxWithType[] = paramMap.get(methodName);

        if (!paramIndexes) {
            paramIndexes = [];
            paramMap.set(methodName, paramIndexes);
        }

        paramIndexes.push({ idx: paramIndex, type });
    }

    static performValueValidation(target: any, methodName: string, paramValues: any[]): string[] {
        const errMsgArr: string[] = [];

        const paramMap: Map<string, IdxWithType[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexesWithTypes: IdxWithType[] = paramMap.get(methodName);

        if (!paramIndexesWithTypes) {
            return errMsgArr;
        }

        let paramIndexes = paramIndexesWithTypes.map(i => i.idx);

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            const msg = isValidValue(paramValue, paramIndexesWithTypes[index].type);

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

    static performIndexValidation(target: any, methodName: string, paramValues: any[]): string[] {
        const errMsgArr: string[] = [];

        const paramMap: Map<string, IdxWithType[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexesWithTypes: IdxWithType[] = paramMap.get(methodName);

        if (!paramIndexesWithTypes) {
            return errMsgArr;
        }

        let paramIndexes = paramIndexesWithTypes.map(i => i.idx);

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            const msg = isValidIndex(paramValue);

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

    static performAllValidation(target: any, methodName: string, paramValues: any[]): string[] {

        const errMsgArr: string[] = [];

        const paramMap: Map<string, IdxWithType[]> = this.validationMap.get(target);

        if (!paramMap) {
            return errMsgArr;
        }

        const paramIndexesWithTypes: IdxWithType[] = paramMap.get(methodName);

        if (!paramIndexesWithTypes) {
            return errMsgArr;
        }

        let paramIndexes = paramIndexesWithTypes.map(i => i.idx);

        for (const [index, paramValue] of paramValues.entries()) {

            if (!paramIndexes.includes(index)) continue;

            let msg: string = undefined;

            if (index === 0) {
                msg = isValidValue(paramValue, paramIndexesWithTypes[index].type);
            }

            if (index === 1) {
                msg = isValidIndex(paramValue);
            }

            msg && errMsgArr.push(`${msg} (at params-index "${index}" in method "${methodName}")`);
        }

        return errMsgArr
    }

}

function isValidValue(value: any, type: string): string | null {

    if (value == null){
        return Errors.Msg.InvalidArg;
    }

    const valueType = getElemType(value);

    if (valueType !== type.toLowerCase()){
         return `Expect "${type}" but found "${valueType}"`;
    }

    switch (valueType) {
        case TYPES.NUMBER:
            return isNaN(value) || !isFinite(value) ? Errors.Msg.InvalidArg : null;

        case TYPES.STRING:
            return value === "" ? Errors.Msg.InvalidArg : null;
    }

    return null;
}

function isValidIndex(index: number): string | null {

    if(getElemType(index) !== TYPES.NUMBER) {
        return `Index ${Errors.Msg.NotANumber}`;
    }

    if (!index || !isFinite(index)) {
        return Errors.Msg.InvalidArg;
    }

    if (!Number.isSafeInteger(index)) {
        return Errors.Msg.InvalidIdx;
    }

    return null;
}

