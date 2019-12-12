import { ILinkedList } from "@Interface/specific/ILinkedList";
import { IArray } from "@Interface/specific/IArray";
import { ITree } from "@Interface/specific/ITree";
import { ICompareFunc, valueTypeComparison } from "@Utils/comparison";
import { TreeTypes, ListTypes, ArrayTypes } from "@Utils/data-types";
import { AbstractSinglyLinkedList } from "@Entity/abstract/abstract-singly-linked-list";

export class SimpleSinglyLinkedList<T> extends AbstractSinglyLinkedList<T> {

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

    constructor(
        protected compare: ICompareFunc<T> = valueTypeComparison
    ) {
        super(compare)
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
        throw new Error("Method not implemented.");
    }

}

export class CircularSinglyLinkedList<T> extends AbstractSinglyLinkedList<T> {

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
    constructor(
        protected compare: ICompareFunc<T> = valueTypeComparison
    ) {
        super(compare)
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


// function createSinglyListNode<T>(ctor: ISinglyListNodeConstructor<T>, value: T = null, next: ISinglyListNode<T> = null) {
//     return new ctor(value, next);
// }


// interface ISinglyListNode<T> {
//     value: T;
//     next: ISinglyListNode<T>;
// }

// interface ISinglyListNodeConstructor<T> {
//     new(value: T, next: ISinglyListNode<T>): ISinglyListNode<T>
// }

// No Sentry Linked List
// if (this._headSentry) {
//     this._tailSentry.next = newNode;
//     this._tailSentry = newNode
// } else {
//     this._headSentry = newNode;
//     this._tailSentry = this._headSentry;
// }
