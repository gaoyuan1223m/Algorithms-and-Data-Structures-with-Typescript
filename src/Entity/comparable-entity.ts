import { IComparable } from "../Interface/IComparable";

export class Number implements IComparable<Number> {    
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    isEqualTo(value: Number): boolean {
        return this._value === value.value;
    }
    
    isLessThan(value: Number): boolean {
        return this._value < value.value;
    }

    isGreaterThan(value: Number): boolean {
        return this._value > value.value;
    }
    
}