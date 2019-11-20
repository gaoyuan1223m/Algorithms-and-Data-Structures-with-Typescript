import { IComparable } from "@Interface/common/IComparable.Generic";

export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

export function objectEquals<T extends IComparable<T>>(a: T, b: T): Comparison {
    if (a.isEqualTo(b)) {
        return Comparison.EQUALS_TO;
    }

    return a.isLessThan(b) ? Comparison.LESS_THAN : Comparison.BIGGER_THAN;
}

export const NOT_EXISTED = -1;

export enum Comparison {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS_TO = 0
}

export interface IEntityComparison {
    compareSimple<T>(a: T, b: T): Comparison;
    compareObject<T extends IComparable<T>>(a: T, b: T): Comparison
}

export function isEqual(result: Comparison): boolean {
    return result === Comparison.EQUALS_TO;
}

export function isLarger(result: Comparison): boolean {
    return result === Comparison.BIGGER_THAN;
}

export function isLess(result: Comparison): boolean {
    return result === Comparison.LESS_THAN;
}

export class EntityComparison implements IEntityComparison {

    public compareSimple<T>(a: T, b: T): Comparison {
        if (a === b) {
            return Comparison.EQUALS_TO;
        }
        return a < b ? Comparison.LESS_THAN : Comparison.BIGGER_THAN;
    }

    public compareObject<T extends IComparable<T>>(a: T, b: T): Comparison {
        if (a.isEqualTo(b)) {
            return Comparison.EQUALS_TO;
        }

        return a.isLessThan(b) ? Comparison.LESS_THAN : Comparison.BIGGER_THAN;
    }

}
