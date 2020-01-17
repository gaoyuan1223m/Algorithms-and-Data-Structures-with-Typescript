export function notNull(target: any, propertyKey: string, parameterIndex: number) {
    console.log("param decorator notNull function invoked ");
    Validator.registerNotNull(target, propertyKey, parameterIndex);
}

export function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("method decorator validate function invoked ");
    let originalMethod = descriptor.value;
    //wrapping the original method
    descriptor.value = function (...args: any[]) {//wrapper function
        if (!Validator.performValidation(target, propertyKey, args)) {
            console.log("validation failed, method call aborted: " + propertyKey);
            return;
        }
        let result = originalMethod.apply(this, args);
        return result;
    }
}


export class Validator {
    private static notNullValidatorMap: Map<any, Map<string, number[]>> = new Map();

    //todo add more validator maps
    static registerNotNull(target: any, methodName: string, paramIndex: number): void {
        let paramMap: Map<string, number[]> = this.notNullValidatorMap.get(target);
        if (!paramMap) {
            paramMap = new Map();
            this.notNullValidatorMap.set(target, paramMap);
        }
        let paramIndexes: number[] = paramMap.get(methodName);
        if (!paramIndexes) {
            paramIndexes = [];
            paramMap.set(methodName, paramIndexes);
        }
        paramIndexes.push(paramIndex);
    }

    static performValidation(target: any, methodName: string, paramValues: any[]): boolean {
        let notNullMethodMap: Map<string, number[]> = this.notNullValidatorMap.get(target);
        if (!notNullMethodMap) {
            return true;
        }
        let paramIndexes: number[] = notNullMethodMap.get(methodName);
        if (!paramIndexes) {
            return true;
        }
        let hasErrors: boolean = false;
        for (const [index, paramValue] of paramValues.entries()) {
            if (paramIndexes.indexOf(index) != -1) {
                if (!paramValue) {
                    console.error("method param at index " + index + " cannot be null");
                    hasErrors = true;
                }
            }
        }
        return !hasErrors;
    }
}

export class Task {
    @validate
    run(@notNull name: string): void {
        console.log("running task, name: " + name);
    }
}

console.log("-- creating instance --");
let task: Task = new Task();
console.log("-- calling Task#run(null) --");
task.run(null);
console.log("----------------");
console.log("-- calling Task#run('test') --");
task.run("test");