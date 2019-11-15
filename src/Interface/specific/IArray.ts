import { IGenericCollection } from "../common/ICollection";

export interface IArray<T> extends IArrayLike<T>, IGenericCollection<T> {
    /**
     * *Get value by its index on the Array*
     * @param index: Index of value on the Array
     */
    get: (index: number) => T;

    /**
     * *Insert value by its index on the Array*
     * @param value: the value that needs to be inserted in the Array
     * @param index: [Optional] the position where the value is insert in the Array, if undefined, insert the value at the end
     */
    insert: (value: T, index?: number) => this;
    
    /**
     * *Update value by its index on the Array*
     * @param value: the value that needs to be updated in the Array
     * @param index: the position where the old value is located
     */
    update: (value: T, index: number) => this;
    
    /**
     * *Remove value by its index on the Array*
     * @param index: the position where the value needs to be removed from the Array
     */
    remove: (index: number) => this;

}

interface IArrayLike<T> {
    /**
     * @param size: the number of the elements in the Array
     */
    readonly size: number;

    /**
     * @param length: the pa
     */
    readonly length: number;

    /**
     * *index signature*
     */
    [n: number]: T;
}