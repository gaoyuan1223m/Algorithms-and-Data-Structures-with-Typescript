import { Validator } from "./utils";
import { Err } from "@Utils/emphasize";

export function Validation(type?: string) {
    
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {

        const originFn = descriptor.value.bind(target);

        descriptor.value = function (...args: any[]) {

            let errors: string[]; 
            
            switch (type) {
                case 'index':
                    errors = Validator.performIndexValidation(target, key, args);
                    break;
            
                case 'value':
                    errors = Validator.performValueValidation(target, key, args);

                default:
                    errors = Validator.performAllValidation(target, key, args);
                    break;
            }

            if (errors.length === 0) return originFn(...args);

            let msg: string = '';

            for (const [i, err] of errors.entries()) {
                msg += `err ${i}: ${err}\n`;
            }

            throw Err(msg);
        }
    }
}