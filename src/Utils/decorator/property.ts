import { Errors } from "@Utils/error-handling";

/**
 * @PropertyDecorator
 * @param upperLimit input value must be less than or equal to the Uppper Limit
 * @exception InvalidArgument
 */
export function PositiveSaftInt(upperLimit?: number) {
    return (target: any, propertyName: string) => {

        let value = target[propertyName] as number;

        const getter = () => value;

        const setter = (v: number) => {

            if (v < 0) {
                throw new Errors.InvalidArgument(`Input value ${Errors.Msg.NotPositiveInteger}`);
            }

            if (!Number.isSafeInteger(v)) {
                throw new Errors.InvalidArgument(`Input value ${Errors.Msg.NotSafeInteger}`);
            }

            if (upperLimit && upperLimit >= 0) {
                value = v > upperLimit ? ~~upperLimit : v;// remove decimal
            } else {
                value = v;
            }
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

    }
}
/**
 * @PropertyDecorator
 * @param upperLimit input value must be less than or equal to the Uppper Limit
 * @exception InvalidArgument
 */
export function SafeInt(upperLimit?: number) {
    return (target: any, propertyName: string) => {

        let value = target[propertyName] as number;

        const getter = () => value;

        const setter = (v: number) => {

            if (!Number.isSafeInteger(v)) {
                throw new Errors.InvalidArgument(Errors.Msg.NotSafeInteger)
            }

            if (upperLimit) {
                value = v > upperLimit ? ~~upperLimit : v;// remove decimal
            } else {
                value = v;
            }
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

    }
}

/**
 * @PropertyDecorator Required Values can NOT be NULL, Undefined, Empty String, or NaN
 * @exception InvalidArgument
 */
export function Required() {
    return (target: any, propertyName: string) => {

        let value = target[propertyName];

        const getter = () => value;

        const setter = (v: any) => {
            if (!v) {
                throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);
            }
            value = v;
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * @PropertyDecorator
 * @param upperLimit input value must be less than or equal to the Uppper Limit
 * @execption OutOfBoundary 
 */
export function Max(upperLimit: number) {
    return (target: any, propertyName: string) => {

        let value = target[propertyName] as number;

        const getter = () => value;

        const setter = (v: number) => {

            if (upperLimit > Number.MAX_SAFE_INTEGER) {
                throw new Errors.InvalidArgument(`The UpperLimit ${Errors.Msg.NotSafeNum}`);
            }

            if (v > Number.MAX_SAFE_INTEGER) {
                throw new Errors.InvalidArgument(`The new Value ${Errors.Msg.NotSafeNum}`);
            }

            value = v > upperLimit ? upperLimit : v;
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * @PropertyDecorator
 * @param lowerLimit input value must be larger than or equal to the Lower Limit
 * @exception InvalidArgument
 */
export function Min(lowerLimit: number) {
    return (target: any, propertyName: string) => {
        let value = target[propertyName] as number;

        const getter = () => value;

        const setter = (v: number) => {

            if (lowerLimit < Number.MIN_SAFE_INTEGER) {
                throw new Errors.InvalidArgument(`The LowerLimit ${Errors.Msg.NotSafeNum}`);
            }

            if (v < Number.MIN_SAFE_INTEGER) {
                throw new Errors.InvalidArgument(`The new Value ${Errors.Msg.NotSafeNum}`);
            }

            value = v > lowerLimit ? v : lowerLimit;
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * @PropertyDecorator
 * @param from input value must be larger than or equal to the Lower Limit
 * @param to input value must be less than or equal to the Upper Limit
 * @exception OutOfBoundary
 */
export function Between(from: number, to: number) {
    return (target: any, propertyName: string) => {
        let value = target[propertyName];

        const getter = () => value;
        const setter = (v: number) => {
            if (v < from) {
                throw new Errors.OutOfBoundary(Errors.Msg.BeyondLowerLimit);
            }

            if (v > to) {
                throw new Errors.OutOfBoundary(Errors.Msg.BeyondUppperLimit);
            }

            value = v;
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}
