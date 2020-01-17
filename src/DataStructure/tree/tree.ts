import { BinaryTreeNode } from "@Entity/concrete";
import { ITree, IArray, ILinkedList, IBinaryTreeNode } from "@Interface/specific";
import { ArrayTypes, ListTypes, TreeTypes, TreePrintOrder } from "@Utils/types";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";

/**
 * @BinarySearchTree
 * *搜索: 时间复杂度： Average-> O(lgn), WorstCase->O(n)*
 */
export class BinarySearchTree<T> implements ITree<T> {

    private _rootNode: IBinaryTreeNode<T>;
    private _size: number;

    get size(): number {
        return this._size;
    }

    get rootValue(): T {
        return this._rootNode.value
    }

    get maxValue(): T {
        return this._getNodeWithMaxValue().value;
    }

    get minValue(): T {
        return this._getNodeWithMinValue().value;
    }

    constructor() {
        this._size = 0;
    }

    append(value: T, compare: ICompareFunc<T> = valueTypeComparison): this {
        this._rootNode = this._insertByRecursion(this._rootNode, value, compare);
        return this;
    }

    appendRange(values: T[], compare: ICompareFunc<T> = valueTypeComparison): this {
        for (const value of values) {
            this._rootNode = this._insertByRecursion(this._rootNode, value, compare);
        }
        return this;
    }

    contains(value: T, compare: ICompareFunc<T> = valueTypeComparison): boolean {
        if (this._size === 0) return false;

        let pointer = this._rootNode;

        do {
            if (compare(pointer.value).isEqualTo(value)) return true;

            if (compare(pointer.value).isLessThan(value)) {
                pointer = pointer.right;
            } else {
                pointer = pointer.left;
            }
        } while (pointer.left || pointer.right);

        return compare(pointer.value).isEqualTo(value);
    }

    findPath(value: T, compare: ICompareFunc<T> = valueTypeComparison): number[] {
        let pathArr: number[] = [];
        let pointer = this._rootNode;
        if (!pointer) return [-1];

        do {
            if (compare(pointer.value).isEqualTo(value)) return pathArr;

            if (compare(pointer.value).isLessThan(value)) {
                pathArr.push(1);
                pointer = pointer.right;
            } else {
                pathArr.push(0);
                pointer = pointer.left;
            }
        } while (pointer.left || pointer.right)

        if (compare(pointer.value).isEqualTo(value)) {
            return pathArr;
        }

        return [-1];
    }

    byPath(...path: number[]): T {
        if (!path) return null;

        let pointer = this._rootNode;

        for (const n of path) {
            if (n !== 0 && n !== 1) continue;

            if (n) {
                if (!pointer.right) return null;
                pointer = pointer.right;
            } else {
                if (!pointer.left) return null;
                pointer = pointer.left;
            }
        }

        return pointer.value;
    }

    remove(value: T, compare: ICompareFunc<T> = valueTypeComparison): this {
        this._rootNode = this._removeByRecursion(this._rootNode, value, compare);
        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(order: TreePrintOrder): this {

        if(order === TreePrintOrder.PreOrder) return this._printPreOrder();

        if(order === TreePrintOrder.InOrder) return this._printInOrder();

        if(order === TreePrintOrder.PostOrder) return this._printPostOrder();

        throw new Errors.InvalidArgument(Errors.Msg.UnacceptablePrintOrder)
    }

    clear(): this {
        this._rootNode = undefined;
        this._size = 0;
        return this;
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

    forEach(callbackfn: (value: T, index: number, current: ITree<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }

    map<U>(callbackfn: (value: T, index: number, current: import("../../Interface/common").IList<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): import("../../Interface/common").IList<U> {
        throw new Error("Method not implemented.");
    }

    private _getNodeWithMaxValue(): IBinaryTreeNode<T> {
        return this._getMaxByRecursion(this._rootNode);
    }

    private _getNodeWithMinValue(): IBinaryTreeNode<T> {
        return this._getMinByRecursion(this._rootNode);
    }

    private _insertByRecursion(treeNode: IBinaryTreeNode<T>, value: T, compare: ICompareFunc<T>): IBinaryTreeNode<T> {
        if (!treeNode) {
            this._size += 1;
            return new BinaryTreeNode<T>(value);
        }

        if (compare(treeNode.value).isEqualTo(value)) return;

        if (compare(treeNode.value).isLessThan(value)) {
            treeNode.right = this._insertByRecursion(treeNode.right, value, compare);
        } else {
            treeNode.left = this._insertByRecursion(treeNode.left, value, compare);
        }

        return treeNode;
    }

    private _insertByIteraton(treeNode: IBinaryTreeNode<T>, node: T): IBinaryTreeNode<T> {
        return treeNode;
    }

    /// replace the deleted node (D_node) with the GetMax() of D_node.left;
    private _removeByRecursion(treeNode: IBinaryTreeNode<T>, value: T, compare: ICompareFunc<T>): IBinaryTreeNode<T> {
        if (!treeNode) return;

        if (compare(treeNode.value).isLessThan(value)) {
            treeNode.right = this._removeByRecursion(treeNode.right, value, compare);
        } else if (compare(treeNode.value).isLargerThan(value)) {
            treeNode.left = this._removeByRecursion(treeNode.left, value, compare);
        } else {
            if (!treeNode.left) {
                treeNode = treeNode.right;
            } else if (!treeNode.right) {
                treeNode = treeNode.left
            } else {
                treeNode.value = this._getMaxByRecursion(treeNode.left).value;
                treeNode.left = this._removeByRecursion(treeNode.left, treeNode.value, compare);
            }
        }

        return treeNode;
    }

    private _removeByIteration(treeNode: IBinaryTreeNode<T>, node: T): IBinaryTreeNode<T> {
        return treeNode;
    }

    private _findPathByRecursion(treeNode: IBinaryTreeNode<T>, node: T): number {
        return -1;
    }

    private _findPathByIteration(treeNode: IBinaryTreeNode<T>, node: T): number {
        return -1;
    }

    private _getMaxByRecursion(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {
        if (!treeNode.right) return treeNode;

        return this._getMaxByRecursion(treeNode.right);
    }

    private _getMaxByIteration(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {

        while (treeNode.right) {
            treeNode = treeNode.right;
        }
        return treeNode;
    }

    private _getMinByRecursion(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {
        if (!treeNode.left) return treeNode;

        return this._getMinByRecursion(treeNode.left);
    }

    private _getMinByIteration(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {

        while (treeNode.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }
    
    private _printPreOrder(): this {
        return this;
    }

    private _printInOrder(): this {
        return this;
    }

    private _printPostOrder(): this {
        return this;
    }

}

