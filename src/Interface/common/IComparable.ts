
export interface IComparable<T> {

    /**
     * *if EqualsTo, it returns 0, LessThan -1, and BiggerThan 1*
     * @param value value to compare with
     */
    compareWith(value: T): number;

}