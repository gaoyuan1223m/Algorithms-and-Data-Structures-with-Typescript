import { IArray, ILinkedList, ITree } from "@Interface/specific";
import { AbstractDoublyLinkedList, AbstractSinglyLinkedList } from "@Entity/abstract";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { IFactory } from "@Interface/common";
import { Errors } from "@Utils/error-handling";


export class Factory implements IFactory {

    create<T>(type: ListTypes): ILinkedList<T> {
        if (type === ListTypes.Singly) return new SimpleSinglyLinkedList();

        if (type === ListTypes.Doubly) return new SimpleDoublyLinkedList();

        if (type === ListTypes.Circular) return new CircularSinglyLinkedList();

        throw new Errors.InvalidDataType(Errors.Msg.InvalidDataType);
    }

}

class SimpleSinglyLinkedList<T> extends AbstractSinglyLinkedList<T> {

    constructor() {
        super();
    }

    toArray(arrayType?: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }

    toTree(treeType?: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }

    toList(listType?: ListTypes): ILinkedList<T> {
        return this;
    }

    /**
     *                                               HeadNode Pointer    
     *                                                      |
     *                                                      |
     *                                                      V
     *                                          index:      0           1                  n-2          n-1
     * HeadSentry: ListNode(value:null, next: NODE_0) --> NODE_0 --> NODE_1 --> ... --> NODE_n-2 --> NODE_n-1 --> TailSentry: ListNode(value：null, next: null)
     *                                          index:     -n         -n+1                 -2           -1          
     *                                                                                                   ^                                                                                       
     *                                                                                                   |
     *                                                                                                   |
     *                                                                                            TailNode Pointer 
     */
}

class SimpleDoublyLinkedList<T> extends AbstractDoublyLinkedList<T> {

    constructor() {
        super();
    }

    toArray(arrayType?: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }

    toList(listType?: ListTypes): ILinkedList<T> {
        return this;
    }

    toTree(treeType?: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

}

class CircularSinglyLinkedList<T> extends AbstractSinglyLinkedList<T> {

    /**
     *                                               HeadNode Pointer    
     *                                                      |
     *                                                      |
     *                                                      V
     *                                          index:      0           1                  n-2          n-1
     * HeadSentry: ListNode(value:null, next: NODE_0) --> NODE_0 --> NODE_1 --> ... --> NODE_n-2 --> NODE_n-1 --> TailSentry: ListNode(value：null, next: null)
     *      ^                                    index:     -n         -n+1                 -2           -1             |
     *      |                                                                                             ^             |                                                                          
     *      |                                                                                             |             |
     *      |                                                                                             |             |
     *      |                                                                                     TailNode Pointer      |
     *      |___________________________________________________________________________________________________________|
     *
     */
    constructor() {
        super()
        this._tailSentry.next = this._headSentry;
    }

    reverse(): this {
        throw new Error("Method not implemented.");
    }

    toArray(arrayType?: ArrayTypes): IArray<T> {
        throw new Error("Method not implemented.");
    }

    toList(listType?: ListTypes): ILinkedList<T> {
        throw new Error("Method not implemented.");
    }

    toTree(treeType?: TreeTypes): ITree<T> {
        throw new Error("Method not implemented.");
    }

}

export const LinkedListFactory = new Factory();