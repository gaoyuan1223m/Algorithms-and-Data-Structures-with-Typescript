
export interface IComparable<T> {

    /**
     * *if EqualsTo, it returns 0, LessThan -1, and BiggerThan 1*
     * @param obj obj to compare with
     */
    compareWith(obj: T): number;

}