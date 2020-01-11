import { ITraversable, ITransformable } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";
import { PrintOrder } from "@Utils/types";

export interface ICollectionBase<T> {

    /**
    * @return {number} the number of current elements on the Collection
    */
    readonly size: number;

    /**
     * *Return True if no elements on the Collection, else False*. 
     */
    isEmpty(): boolean;

    /**
     * *Print all elements on the Collection*
     */
    print(order?: PrintOrder): this;

    /**
     * *Clear all elements from the Collection*
     */
    clear(): this;
}

export interface ICollection<T> extends ICollectionBase<T>, ITransformable<T>, ITraversable<T> {

    /**
     * *Add an element at the end of the Collection.
     * Invalid values, including null, undefined and NAN, will be ignored and no exceptions will be thrown.*
     * @param value element to add
     * @param compare funtion used to compare elements
     */
    append(value: T, compare?: ICompareFunc<T>): this;

    /**
     * *Return True if the element is on the Collection, else False. 
     * It will return false if passing invalid values, such as null, undefined, NAN.
     * @param value element to search
     */
    contains(value: T, compare?: ICompareFunc<T>): boolean;

    /**
     * *Remove the element from the current Collection. 
     * If the collection doesn't contain the element, or invalid values, null, undefined, NAN included, are given,  
     * it will ignore it and no exceptions will be thrown*
     * @param value element to remove
     */
    remove(value: T, compare?: ICompareFunc<T>): this;

}