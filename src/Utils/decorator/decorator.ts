class Example {

    @time()
    @parseFn(168)
    get(id: string, name: string, age: number = 25): string {
        return `id: ${id}, name is: ${name} with ${age} years old`;
    }

    @time()
    @memorization()
    fib(n: number): number {
        if (n <= 1) return n;

        return this.fib(n - 1) + this.fib(n - 2);
    }
}

export function time(): Function {
    return (
        target: Object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {

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

/**30964.015ms without memorization */
export function memorization(): Function {
    return (
        target: Object,
        key: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        
        const originalFn = descriptor.value.bind(target);
        const dict = new Map<string, any>();

        descriptor.value = function (...args: any[]) {
            let dictKey = args.toString();
            if (dict.has(dictKey)) return dict.get(dictKey);

            let dictVal = originalFn(...args);
            dict.set(dictKey, dictVal);
            return dictVal
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

const example1 = new Example();

// const msg = example1.get("12", "Ryan");

const fibNum = example1.fib(22);

// console.log(`msg: ${msg}`);

console.log(`fib_num: ${fibNum}`);


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

