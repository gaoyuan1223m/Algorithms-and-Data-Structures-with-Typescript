import { Validator } from "./utils"

export function ValidateParams(dataType: string = 'number') {
    return (target: Object, key: string, index: number) => {
        Validator.register(target, key, index, dataType);
    }
}
