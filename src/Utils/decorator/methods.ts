import { Validator } from "./utils";
import { Err } from "@Utils/emphasize";

export function validate() {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {

        const originFn = descriptor.value.bind(target);

        descriptor.value = function (...args: any[]) {

            const errors = Validator.perform(target, key, args);

            if (errors.length === 0) return originFn(...args);

            if (errors.length === 1) throw Err(`err 0: ${errors[0]}`);

            throw Err(errors.reduce((p, c, i) => `err ${i - 1}: ${p}\n err ${i}: ${c}`));
        }
    }
}