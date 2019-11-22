
export interface IComparable<T> {

    /**
     * *if EqualsTo, it returns 0, LessThan returns -1, and BiggerThan returns 1*
     * @param value: value you want to compare with
     */
    compareWith(value: T): number;

}