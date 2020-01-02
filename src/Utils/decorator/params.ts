import { Validator } from "./utils"

export function validateValue() {
    return (target: Object, key: string, index: number) => {
        Validator.register(target, key, index);
    }
}

export function validateIndex() {
    return (target: Object, key: string, index: number) => {
        Validator.register(target, key, index);
    }
}