import { Validator } from "./utils"

export function ValidateParams() {
    return (target: Object, key: string, index: number) => {
        Validator.register(target, key, index);
    }
}
