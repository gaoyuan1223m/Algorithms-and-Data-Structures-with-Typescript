
export interface IGroup {
    /**
     * @param size: the number of elements on the Group
     */
    readonly size: number;

    /**
     * *Return whether the currect Group is empty or not*
     */
    isEmpty(): boolean;

    /**
     * *Print all elements on the Group*
     */
    print(): this;

    /**
     * *Clear all elements from the Group*
     */
    clear(): this;

}