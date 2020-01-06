import { BinaryTreeNode } from "@Entity/concrete";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";

/**
 * @BinarySearchTree
 * *搜索: 时间复杂度： Average-> O(lgn), WorstCase->O(n)*
 */
export class BinarySearchTree<T> {

    private _rootNode: BinaryTreeNode<T>;
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

    insert(value: T, compare: ICompareFunc<T> = valueTypeComparison): this {
        this._rootNode = this._insertByRecursion(this._rootNode, value, compare);
        return this;
    }

    insertRange(values: T[], compare: ICompareFunc<T> = valueTypeComparison): this {
        for (const value of values) {
            this._rootNode = this._insertByRecursion(this._rootNode, value, compare);
        }
        return this;
    }

    contains(value: T, compare: ICompareFunc<T> = valueTypeComparison): boolean {
        if(this._size === 0) return false;

        let pointer = this._rootNode;

        if (!pointer) return false;

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
            if (compare(pointer.value).isLessThan(value)) {
                pathArr.push(1);
                pointer = pointer.right;
            } else if (compare(pointer.value).isLargerThan(value)) {
                pathArr.push(0);
                pointer = pointer.left;
            } else {
                return pathArr;
            }
        } while (pointer.left || pointer.right)

        if (compare(pointer.value).isEqualTo(value)) {
            return pathArr;
        }

        return [-1];
    }

    remove(value: T, compare: ICompareFunc<T> = valueTypeComparison): this {
        this._rootNode = this._removeByRecursion(this._rootNode, value, compare);
        return this;
    }

    private _getNodeWithMaxValue(): BinaryTreeNode<T> {
        return this._getMaxByRecursion(this._rootNode);
    }

    private _getNodeWithMinValue(): BinaryTreeNode<T> {
        return this._getMinByRecursion(this._rootNode);
    }

    private _insertByRecursion(treeNode: BinaryTreeNode<T>, value: T, compare: ICompareFunc<T>): BinaryTreeNode<T> {
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

    private _insertByIteraton(treeNode: BinaryTreeNode<T>, node: T): BinaryTreeNode<T> {
        return treeNode;
    }

    /// replace the deleted node (D_node) with the GetMax() of D_node.left;
    private _removeByRecursion(treeNode: BinaryTreeNode<T>, value: T, compare: ICompareFunc<T>): BinaryTreeNode<T> {
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

    private _removeByIteration(treeNode: BinaryTreeNode<T>, node: T): BinaryTreeNode<T> {
        return treeNode;
    }

    private _findPathByRecursion(treeNode: BinaryTreeNode<T>, node: T): number {
        return -1;
    }

    private _findPathByIteration(treeNode: BinaryTreeNode<T>, node: T): number {
        return -1;
    }

    private _getMaxByRecursion(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode.right) return treeNode;

        return this._getMaxByRecursion(treeNode.right);
    }

    private _getMaxByIteration(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {

        while (treeNode.right) {
            treeNode = treeNode.right;
        }
        return treeNode;
    }

    private _getMinByRecursion(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode.left) return treeNode;

        return this._getMinByRecursion(treeNode.left);
    }

    private _getMinByIteration(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {

        while (treeNode.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }

}

