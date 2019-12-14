
import { ICollection } from "@Interface/common/ICollection";
import { ICompareFunc } from "@Utils/compare/comparison";
import { IArray, ILinkedList } from "@Interface/specific";

export interface ICollectionFactory {
    create<T>(capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): ICollection<T> | any
}


export interface IArrayFactory extends ICollectionFactory {
    createStaticArray<T>(capacity: number, ICompareFn?: ICompareFunc<T>): IArray<T>;
    createDynamicArray<T>(capacity: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IArray<T>;
}

export interface ILinkedListFactory extends ICollectionFactory {
    createSinglyLinkedList<T>(ICompareFn?: ICompareFunc<T>): ILinkedList<T>;
    createDoublyLinkedList<T>(ICompareFn?: ICompareFunc<T>): ILinkedList<T>;
    createCircularLinkedList<T>(ICompareFn?: ICompareFunc<T>): ILinkedList<T>;
    createSkipList<T>(ICompareFn?: ICompareFunc<T>): ILinkedList<T>;
}


