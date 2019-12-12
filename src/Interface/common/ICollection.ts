import { ITransformable } from "./ITransformable";
import { ITraversable } from "./ITraversable";
import { SortMethods } from "@Algorithm/sort/sort-methods";
/**
 * *ICollection always refers to a group of element with identical properties and attributes.*
 * *Element can be appended on or removed from the ICollection.*
 * *ICollection also provides 'contains(value: T)'*
 * *Generally, IList can extends ICollection interface*
 */
export interface ICollection<T> extends ITransformable<T>, ITraversable<T> {

    /**
     * @param size: the number of elements on the Collection
     */
    readonly size: number;

    /**
     * *Add an element at the end of the Collection*
     * @param value: value of a single element
     */
    append(value: T): this;

    /**
     * *Return whether the current Collection contains the element*
     * @param value: value of the a single element
     */
    contains(value: T): boolean;

    /**
     * *Remove the element from the current Collection*,
     * *if the collection doesn't contain the element, no error will be thrown*
     * @param value: value of the a single element
     */
    remove(value: T): this;

    /**
     * *Sort curent Array Increaingly or Decreasingly*
     */
    sort(method?: SortMethods): this;

    /**
     * *Return whether the currect Collection is empty or not*
     */
    isEmpty(): boolean;

    /**
     * *Print all elements on the Collection*
     */
    print(): this;

    /**
     * *Clear all elements from the Collection*
     */
    clear(): this;

}