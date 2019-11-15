import { IComparable } from "../Interface/common/IComparable";

export class Number implements IComparable {
    
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    isEqualTo(num: number): boolean {
        return this._value === num;
    }
    
    isLessThan(num: number): boolean {
        return this._value < num;
    }

    isGreaterThan(num: number): boolean {
        return this._value > num;
    }

}