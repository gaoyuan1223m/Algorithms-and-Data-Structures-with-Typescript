import { ICollection } from "@Interface/common/ICollection.Generic";


export interface IArray<T> extends IArrayLike<T>, ICollection<T> {
    
    /**
     * *Insert value by its index on the Array*
     * @param value: the value that needs to be inserted in the Array
     * @param index: [Optional] the position where the value is insert in the Array, if undefined, insert the value at the end
     */
    insertByIndex: (value: T, index: number) => this;
    
    /**
     * *Update value by its index on the Array*
     * @param value: the value that needs to be updated in the Array
     * @param index: the position where the old value is located
     */
    updateByIndex: (value: T, index: number) => this;
    
    /**
     * *Remove value by its index on the Array*
     * @param index: the position where the value needs to be removed from the Array
     */
    removeByIndex: (index: number) => this;

}

interface IArrayLike<T> {
    /**
     * @param size: the number of the elements in the Array
     */
    readonly size: number;

    /**
     * @param length: a number one higher than the index of the latest element in an array.
     */
    readonly length: number;

    /**
     * *index signature*
     */
    [n: number]: T;
}

interface IArrayConstructor<T> {
    new <T>(capacity: number): IArray<T>;
}