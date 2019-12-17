class Person {

    @ParseFn(2333)
    get(id: string, @ParseParam() name: string, age?: number) {
        return `id: ${id}, name is ${name} with ${age} years old`;
    }
}

function ParseFn(age: number) {
    return (target: object, key: string, descriptpor: PropertyDescriptor) => {

        const fn = descriptpor.value;

        descriptpor.value = function (...args: Array<any>) {
            return fn.apply(this, [...args, age])
        }

        return descriptpor;
    }
}


function ParseParam() {
    return (target: object, propertyName: string, index: number) => {
        console.log(target);
        console.log(propertyName, index);    
    }
}

const p = new Person();

const r = p.get(`d34`, `Ryan`);

console.log(r);