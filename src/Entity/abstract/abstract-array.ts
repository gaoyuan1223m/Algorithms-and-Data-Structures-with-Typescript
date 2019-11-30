import { IArray } from "@Interface/specific/IArray";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/data-types";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ITree } from "@Interface/specific/ITree";

export abstract class AbstractArray<T> implements IArray<T> {
    [n: number]: T;    
    
    length: number;

    size: number;

    abstract insertByIndex(value: T, index: number): this

    removeByIndex(index: number): this {
        throw new Error("Method not implemented.");
    }
    
    updateByIndex(value: T, index: number): this {
        throw new Error("Method not implemented.");
    }

    getByIndex(index: number): T {
        throw new Error("Method not implemented.");
    }

    indexOf(value: T): number {
        throw new Error("Method not implemented.");
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }

    append(value: T): this {
        throw new Error("Method not implemented.");
    }
    
    contains(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    remove(value: T): this {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }

    print(): this {
        throw new Error("Method not implemented.");
    }

    clear(): this {
        throw new Error("Method not implemented.");
    }

    toArray(arrayType: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }

    toList(listType: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    toTree(treeType: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    forEach(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: import("../../Interface/common/IList").IList<T>) => U, thisArg?: any): import("../../Interface/common/IList").IList<U> {
        throw new Error("Method not implemented.");
    }
   
}