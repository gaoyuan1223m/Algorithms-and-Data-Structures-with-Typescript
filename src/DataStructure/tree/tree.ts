import { BinaryTreeNode } from "@Entity/concrete";
import { ITree, IArray, ILinkedList, IBinaryTreeNode } from "@Interface/specific";
import { ArrayTypes, ListTypes, TreeTypes, TreePrintOrder } from "@Utils/types";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";

/**
 * @BinarySearchTree
 * *搜索: 时间复杂度： Average-> O(lgn), WorstCase->O(n)*
 */
export class BinarySearchTree<T> implements ITree<T> {

    private _rootNode: IBinaryTreeNode<T>;
    private _size: number;

    private _printStr: string;

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

    constructor(private compare: ICompareFunc<T> = valueTypeComparison) {
        this._size = 0;
    }

    append(value: T): this {
        this._rootNode = this._insertByRecursion(this._rootNode, value);
        return this;
    }

    appendRange(...values: T[]): this {
        for (const value of values) {
            this._rootNode = this._insertByRecursion(this._rootNode, value);
        }
        return this;
    }

    contains(value: T): boolean {
        if (this._size === 0) return false;

        let pointer = this._rootNode;

        do {
            if (this.compare(pointer.value).isEqualTo(value)) return true;

            if (this.compare(pointer.value).isLessThan(value)) {
                pointer = pointer.right;
            } else {
                pointer = pointer.left;
            }
        } while (pointer.left || pointer.right);

        return this.compare(pointer.value).isEqualTo(value);
    }

    findPath(value: T): number[] {
        let pathArr: number[] = [];
        let pointer = this._rootNode;
        if (!pointer) return [-1];

        do {
            if (this.compare(pointer.value).isEqualTo(value)) return pathArr;

            if (this.compare(pointer.value).isLessThan(value)) {
                pathArr.push(1);
                pointer = pointer.right;
            } else {
                pathArr.push(0);
                pointer = pointer.left;
            }
        } while (pointer.left || pointer.right)

        if (this.compare(pointer.value).isEqualTo(value)) {
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

    remove(value: T): this {
        this._rootNode = this._removeByRecursion(this._rootNode, value);
        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(order: TreePrintOrder): this {
        //root -> left -> right
        if (order === TreePrintOrder.PreOrder) {
            this._printStr = "";
            this._printPreOrder(this._rootNode);
            Console.OK(`[ ${this._printStr}]`);
            return this;
        }
        //left -> root -> right
        if (order === TreePrintOrder.InOrder) {
            this._printStr = "";
            this._printInOrder(this._rootNode);
            Console.Warn(`[ ${this._printStr}]`);
            return this;
        }
        // left -> right -> root
        if (order === TreePrintOrder.PostOrder) {
            this._printStr = "";
            this._printPostOrder(this._rootNode);
            Console.Err(`[ ${this._printStr}]`);
            return this;
        }

        if (order === TreePrintOrder.LevelOrder) {
            this._printStr = "";
            this._printLevelOrder(this._rootNode);
            Console.Err(`[${this._printStr}]`);
            return this;
        }

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

    map<U>(callbackfn: (value: T, index: number, current: ITree<T>) => U, ICompareFunc?: ICompareFunc<U>, thisArg?: any): ITree<U> {
        throw new Error("Method not implemented.");
    }

    private _getNodeWithMaxValue(): IBinaryTreeNode<T> {
        return this._getMaxByRecursion(this._rootNode);
    }

    private _getNodeWithMinValue(): IBinaryTreeNode<T> {
        return this._getMinByRecursion(this._rootNode);
    }

    private _insertByRecursion(treeNode: IBinaryTreeNode<T>, value: T): IBinaryTreeNode<T> {
        if (!treeNode) {
            this._size += 1;
            return new BinaryTreeNode<T>(value);
        }

        if (this.compare(treeNode.value).isEqualTo(value)) return;

        if (this.compare(treeNode.value).isLessThan(value)) {
            treeNode.right = this._insertByRecursion(treeNode.right, value);
        } else {
            treeNode.left = this._insertByRecursion(treeNode.left, value);
        }

        return treeNode;
    }

    private _insertByIteraton(treeNode: IBinaryTreeNode<T>, node: T): IBinaryTreeNode<T> {
        return treeNode;
    }

    /// replace the deleted node (D_node) with the GetMax() of D_node.left;
    private _removeByRecursion(treeNode: IBinaryTreeNode<T>, value: T): IBinaryTreeNode<T> {
        if (!treeNode) return;

        if (this.compare(treeNode.value).isLessThan(value)) {
            treeNode.right = this._removeByRecursion(treeNode.right, value);
        } else if (this.compare(treeNode.value).isLargerThan(value)) {
            treeNode.left = this._removeByRecursion(treeNode.left, value);
        } else {
            if (!treeNode.left) {
                treeNode = treeNode.right;
            } else if (!treeNode.right) {
                treeNode = treeNode.left
            } else {
                treeNode.value = this._getMaxByRecursion(treeNode.left).value;
                treeNode.left = this._removeByRecursion(treeNode.left, treeNode.value);
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

    private _printPreOrder(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printStr += `${treeNode.value.toString()}, `;

        this._printPreOrder(treeNode.left);

        this._printPreOrder(treeNode.right);
    }

    private _printInOrder(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printInOrder(treeNode.left);

        this._printStr += `${treeNode.value.toString()}, `;

        this._printInOrder(treeNode.right);
    }

    private _printPostOrder(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printPostOrder(treeNode.left);

        this._printPostOrder(treeNode.right);

        this._printStr += `${treeNode.value.toString()}, `;
    }

    private _printLevelOrder(treeNode: IBinaryTreeNode<T>): void {

    }

}

