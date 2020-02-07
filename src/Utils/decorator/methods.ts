import { Validator } from "./utils";
import { inRed } from "@Utils/emphasize";
import { Errors } from "@Utils/error-handling";

export function Validation(type?: string) {

    return (target: Object, key: string, descriptor: PropertyDescriptor) => {

        const originFn = descriptor.value;

        /**
         * in case: if Class a1 is derived from Class A,
         * this Method Decorator is applied both for methods in Class a1 and Class A,
         * Be careful to use: const originFn = descriptor.value.bind(target), 
         * since target should be Object(a1) rather than Obejct(A)
         * instead, use const originFn = descriptor.value, and then use return originFn.apply(this, args)
         */

        descriptor.value = function (...args: any[]) {

            let errors: string[];

            switch (type) {
                case 'index':
                    errors = Validator.performIndexValidation(target, key, args);
                    break;

                case 'value':
                    errors = Validator.performValueValidation(target, key, args);
                    break;

                default:
                    errors = Validator.performAllValidation(target, key, args);
                    break;
            }

            if (errors.length === 0) {
                return originFn.apply(this, args);
            }

            let msg: string = '';

            for (const [i, err] of errors.entries()) {
                msg += `err ${i}: ${err}\n`;
            }

            throw inRed(msg);
        }
    }
}

export function override() {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {

        if (typeof target.__proto__[key] !== 'function') {
            throw inRed(Errors.Msg.OverrideError);
        }

        const originFn = descriptor.value;

        descriptor.value = function (...args: any[]) {
            return originFn.call(this, ...args);
        }
    }
}
/**
 * 1. increase readebility
 * 2. check parent class has the method of the same name
 */