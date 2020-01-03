import { Errors } from "@Utils/error-handling";

export function PositiveSaftInt(upperLimit?: number) {

    return (target: any, propertyName: string) => {

        let value = target[propertyName];

        const getter = () => value;

        const setter = (v: any) => {
            
            if (!Number.isSafeInteger(v)) {
                throw new Errors.InvalidArgument(Errors.Msg.NotSafeInteger)
            }

            value = v < 0 ? 0 : v;

            if (upperLimit && upperLimit >= 0) {
                value = value > upperLimit ? ~~upperLimit : value;// remove decimal
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

export function SafeInt(upperLimit?: number) {

    return (target: any, propertyName: string) => {

        let value = target[propertyName];

        const getter = () => value;

        const setter = (v: any) => {

            if (!Number.isSafeInteger(v)) {
                throw new Errors.InvalidArgument(Errors.Msg.NotSafeInteger)
            }

            value = v;

            if (upperLimit) {
                value = value > upperLimit ? ~~upperLimit : value;// remove decimal
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
