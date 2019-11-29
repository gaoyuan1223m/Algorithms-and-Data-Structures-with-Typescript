import { IComparable } from "@Interface/common/IComparable";
import { IObject } from "@Interface/common/IObject";
import { Comparison } from "@Utils/comparison";


export class Avenger implements IComparable<Avenger>, IObject {

    readonly id: string;
    readonly name: string;
    readonly age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    };

    compareWith(value: Avenger): number {
        if (this.name === value.name && this.age === value.age) return Comparison.EQUALS_TO;

        return this.age < value.age ? Comparison.LESS_THAN : Comparison.BIGGER_THAN;
    }

    toString = (): string => `${this.name} with ${this.age} year${this.age > 1 ? 's' : ''} old`;

}