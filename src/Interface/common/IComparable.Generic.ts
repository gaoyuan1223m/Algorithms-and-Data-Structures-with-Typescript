
export interface IComparable<T> {

    /**
     * *return whether two values are identical or not*
     * @param value: value you want to compare with
     */
    isEqualTo(value: T): boolean;

    /**
     * *return whether the value of the current instance is less than the input value*
     * @param value: value you want to compare with
     */
    isLessThan(value: T): boolean;

    /**
     * *return whether the value of the current instance is greater than the input value*
     * @param value: value you want to compare with
     */
    isGreaterThan(value: T): boolean;

}