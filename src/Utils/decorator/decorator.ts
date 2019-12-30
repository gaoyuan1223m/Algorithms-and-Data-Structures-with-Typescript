class Person1 {

    @Emoji()
    public greet: string;

    private _salary: number;


    @reduce()
    get salary() {
        return this._salary
    }

    @logTime()
    @parseFn(168)
    get(id: string, name: string, @typeInt() age: number): string {
        return `id: ${id}, name is: ${name} with ${age} years old`;
    }
}

function typeInt() {
    return (target: Object, key: string, index: number) {

        return ...
    }
}

function reduce() {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {

        return descriptor
    }
}

export function Emoji() {
    return (target: any, key: string) => {
        let val = target[key];

        const getter = () => {
            return val;
        };

        const setter = (value: any) => {
            val = `😂 ${value} 😂`;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

export function logTime(): Function {
    return (target: Object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {

        const originalFn = descriptor.value.bind(target);

        let i = 0;
        descriptor.value = function (...args: any[]) {
            let id = i++;
            console.time(`${key}_${id}`);
            const v = originalFn(...args);
            console.timeEnd(`${key}_${id}`);
            return v;
        }
        return descriptor;
    }
}

function parseFn(age: number): any {
    return (target: object, name: string, descriptor: PropertyDescriptor) => {
        // console.log(`$$$$$$$$$$$$`)
        // console.log(target);
        // console.log(name);
        // console.log(descriptor);
        const fn = descriptor.value;

        descriptor.value = function (...args: any[]) {
            // console.log(`@@@@@@@@@@`);
            // console.log(this);
            // console.log(args);
            // console.log(age);
            return fn.apply(this, [...args, age]);
        }

        return descriptor;
    }
}

const msg = new Person1().get("12", "Ryan");

console.log(`msg: ${msg}`)

//#region unnecessary decorators
// function logMethod(target: object, key: string, descriptor: PropertyDescriptor) {

//     // save a reference to the original method this way we keep the values currently in the
//     // descriptor and don't overwrite what another decorator might have done to the descriptor.
//     if (descriptor === undefined) {
//         descriptor = Object.getOwnPropertyDescriptor(target, key);
//     }
//     var originalMethod = descriptor.value;

//     //editing the descriptor/value parameter
//     descriptor.value = function () {
//         var args = [];
//         for (var _i = 0; _i < arguments.length; _i++) {
//             args[_i - 0] = arguments[_i];
//         }
//         var a = args.map(function (a) { return JSON.stringify(a); }).join();
//         // note usage of originalMethod here
//         var result = originalMethod.apply(this, args);
//         var r = JSON.stringify(result);
//         console.log(a);
//         console.log(r);
//         console.log("Call: " + key + "(" + a + ") => " + r);
//         return result;
//     };

//     // return edited descriptor as opposed to overwriting the descriptor
//     return descriptor;
// }
//#endregion


@ClassDecorator()
export class ClassExample {

    @FieldDecorater() private _field1: string;

    @PropertyDecorator()
    public get field1(): string {
        return this._field1
    }

    @MethodDecorator()
    public method1(): string {
        return this._field1;
    }

    public method2(@ParamsDecorator("param1") param1: string): string {
        return param1;
    }

}

function Component(config: IComponentConfig) {
    return (constructor: Function) => {

        return ...
    }
}

function memorization() {
    return (
        target: Object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {

        const originalFn = descriptor.value.bind(target);
        const dict: any = {};

        descriptor.value = function (...args: any[]) {
            let dictKey = args.toString();
            if (dict[dictKey]) return dict[dictKey];
            return dict[dictKey] = originalFn(...args);
        }

        return descriptor;
    }
}