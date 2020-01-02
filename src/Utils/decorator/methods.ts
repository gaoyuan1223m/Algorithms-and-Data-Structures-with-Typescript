import { Validator } from "./utils";

export function validate() {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {

        const originFn = descriptor.value.bind(target);

        descriptor.value = function (...args: any[]) {
            const errors = Validator.perform(target, key, args);

            if (errors.length !== 0) {
                const eStr = errors.reduce((p, c, i) => `err ${i - 1}: ${p}\n err ${i}: ${c}`);
                throw `${eStr}`;
            }

            return originFn(...args);
        }
    }
}