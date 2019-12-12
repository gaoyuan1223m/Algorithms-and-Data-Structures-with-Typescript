import { IArray, IArrayConstructor } from "@Interface/specific/IArray";
import { ICollection } from "@Interface/common/ICollection";
import { ICompareFunc, valueTypeComparison } from "@Utils/comparison";
import { ILinkedListConstructor, ILinkedList } from "@Interface/specific/ILinkedList";
import { IStackConstructor, IStack } from "@Interface/specific/IStack";

export interface ICollectionFactory {
    create<T>(ctor: any, capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): ICollection<T> | Object
}

export abstract class AbstractArrayFactoryConstructor implements ICollectionFactory {
    abstract create<T>(ctor: IArrayConstructor, capacity: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IArray<T>
}

export abstract class AbstractLinkedListFactoryConstructor implements ICollectionFactory {
    abstract create<T>(ctor: ILinkedListConstructor, capacity?: number, ICompareFn?: ICompareFunc<T>): ILinkedList<T>;
}

export abstract class AbstractStackFactory implements ICollectionFactory {
    abstract create<T>(ctor: IStackConstructor, capacity?: number, ICompareFn?: ICompareFunc<T>, incrementals?: number): IStack<T>;
}



export const ArrayFactory: AbstractArrayFactoryConstructor = class ArrayFactory {
    static create<T>(ctor: IArrayConstructor, capacity: number, ICompareFn: ICompareFunc<T> = valueTypeComparison, incrementals: number = 0): IArray<T> {
        return new ctor<T>(capacity, ICompareFn, incrementals)
    }
}

export const LinkedListFactory: AbstractLinkedListFactoryConstructor = class LinkedListFactory {
    static create<T>(ctor: ILinkedListConstructor, capacity: number = Infinity, ICompareFn: ICompareFunc<T> = valueTypeComparison): ILinkedList<T> {
        return new ctor(ICompareFn);
    }
}

export const StackFactory: AbstractStackFactory = class StackFactory {
    static create<T>(ctor: IStackConstructor, capacity?: number, ICompareFn: ICompareFunc = valueTypeComparison, incrementals: number = 0): IStack {
        return new ctor()
    }
}

