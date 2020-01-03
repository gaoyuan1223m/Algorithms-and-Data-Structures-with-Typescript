
import { ICollection } from "@Interface/common";
import { IArray, ILinkedList } from "@Interface/specific";

export interface ICollectionFactory {
    create<T>(capacity?: number, incrementals?: number): ICollection<T> | any
}


export interface IArrayFactory extends ICollectionFactory {
    createStaticArray<T>(capacity: number): IArray<T>;
    createDynamicArray<T>(capacity: number, incrementals?: number): IArray<T>;
}

export interface ILinkedListFactory extends ICollectionFactory {
    createSinglyLinkedList<T>(): ILinkedList<T>;
    createDoublyLinkedList<T>(): ILinkedList<T>;
    createCircularLinkedList<T>(): ILinkedList<T>;
    createSkipList<T>(): ILinkedList<T>;
}


