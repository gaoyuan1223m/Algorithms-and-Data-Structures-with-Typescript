import { BinaryTreeNode, AVLTreeNode } from "@Entity/concrete";
import { ITree, IArray, ILinkedList, IBinaryTreeNode, IAVLTreeNode, ITreeConstructor } from "@Interface/specific";
import { ArrayTypes, ListTypes, TreeTypes, TreePrintOrder } from "@Utils/types";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { Errors } from "@Utils/error-handling";
import { Console } from "@Utils/emphasize";
import { Queue, StackFactory } from "@DataStructure/stack-queue";

export const BinarySearchTree: ITreeConstructor = class BST<T> implements ITree<T> {

    protected _rootNode: IBinaryTreeNode<T>;
    protected _size: number;
    private _printStr: string;


    get size(): number {
        return this._size;
    }

    get height(): number {
        // return this._getHeightOfTreeNodeByRecursion(this._rootNode);
        return this._getHeightOfTreeNodeByIteration(this._rootNode);
    }

    get rootValue(): T {
        return this._rootNode?.value || null;
    }

    get maxValue(): T {
        return this._getNodeWithMaxValue()?.value || null;
    }

    get minValue(): T {
        return this._getNodeWithMinValue()?.value || null;
    }

    constructor(protected compare: ICompareFunc<T> = valueTypeComparison) {
        this.__init__();
    }

    append(value: T): this {
        if (!this._isValidValue(value)) return this;

        return this._insertByIteraton(value);
        // this._rootNode = this._insertByRecursion(this._rootNode, value);
        // return this;
    }

    appendRange(...values: T[]): this {
        if (!values) return this;

        // for (const value of values) {
        //     if (!this._isValidValue(value)) continue;
        //     this._rootNode = this._insertByRecursion(this._rootNode, value);
        // }
        // return this;
        values.forEach(val => { this.append(val) });
        return this;
    }

    getDepth(value: T): number {
        const path = this.findPath(value);

        if (!path) return -1;

        return path?.length;
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
        if (!pointer) return null;

        do {
            if (this.compare(pointer.value).isEqualTo(value)) return pathArr;

            if (this.compare(pointer.value).isLessThan(value)) {
                pathArr.push(1);
                pointer = pointer.right;
            } else {
                pathArr.push(0);
                pointer = pointer.left;
            }
        } while (pointer?.left || pointer?.right)

        if (this.compare(pointer.value).isEqualTo(value)) {
            return pathArr;
        }

        return null;
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

    isComplete(): boolean {
        if (!this._rootNode) return false;

        let isLeaf = false;
        const queue = new Queue<IBinaryTreeNode<T>>();
        queue.enqueue(this._rootNode);

        while (!queue.isEmpty()) {
            let node = queue.dequeue();
            let { left, right } = node;

            /**
             * 1 - if no left but right, it isn't
             * 2 - if leaf node but left or right is available, it isn't
             */
            if ((!left && right) || (isLeaf && (left || right))) return false;

            left && queue.enqueue(left);
            right && queue.enqueue(right);

            // if right is NULL, next node must be LEAF node
            if (!right) isLeaf = true;
        }

        return true;
    }

    remove(value: T): this {
        this._rootNode = this._removeByRecursion(this._rootNode, value);
        return this;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(order: TreePrintOrder, isByRecursion: boolean = true): this {
        //root -> left -> right
        if (order === TreePrintOrder.PreOrder) {
            this._printStr = "";

            if (isByRecursion) {
                this._printPreOrderByRecursion(this._rootNode);
                Console.OK(`PreOder Printing by Recursion: [ ${this._printStr}]`);
            } else {
                this._printPreOrderByIteration(this._rootNode);
                Console.OK(`PreOder Printing by Iteration: [ ${this._printStr}]`);
            }

            return this;
        }

        //left -> root -> right
        if (order === TreePrintOrder.InOrder) {
            this._printStr = "";

            if (isByRecursion) {
                this._printInOrderByRecursion(this._rootNode);
                Console.Warn(`InOrder Printing by Recursion: [ ${this._printStr}]`);
            } else {
                this._printInOrderByIteration(this._rootNode);
                Console.Warn(`InOrder Printing by Iteration: [ ${this._printStr}]`);
            }

            return this;
        }

        // left -> right -> root
        if (order === TreePrintOrder.PostOrder) {
            this._printStr = "";
            if (isByRecursion) {
                this._printPostOrderByRecursion(this._rootNode);
                Console.Err(`PostOrder Printing by Recursion: [ ${this._printStr}]`);
            } else {
                this._printPostOrderByIteration(this._rootNode);
                Console.Err(`PostOrder Printing by Iteration: [ ${this._printStr}]`);
            }
            return this;
        }

        if (order === TreePrintOrder.LevelOrder) {
            this._printStr = "";
            this._printLevelOrder(this._rootNode);
            Console.Warn(`Level-order printing by Iteration: [${this._printStr}]`);
            return this;
        }

        throw new Errors.InvalidArgument(Errors.Msg.UnacceptablePrintOrder)
    }

    clear(): this {
        return this.__init__();
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
        return this._getMaxByIteration(this._rootNode);
        // return this._getMaxByRecursion(this._rootNode);
    }

    private _getNodeWithMinValue(): IBinaryTreeNode<T> {
        return this._getMinByIteration(this._rootNode);
        // return this._getMinByRecursion(this._rootNode);
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

    protected _insertByIteraton(value: T): this {
        if (!this._rootNode) {
            this._rootNode = this._createTreeNode(value)
            this._size += 1;
            return this._getReadyForRotation(this._rootNode);
        }

        let currentPointer = this._rootNode;
        let parentPointer: IBinaryTreeNode<T>
        do {
            if (this.compare(value).isEqualTo(currentPointer.value)) {
                currentPointer.value = value;
                return this;
            }

            parentPointer = currentPointer;

            if (this.compare(value).isLargerThan(currentPointer.value)) {
                currentPointer = currentPointer.right;
            } else {
                currentPointer = currentPointer.left;
            }

        } while (currentPointer)

        const newNode = this._createTreeNode(value, parentPointer);

        if (this.compare(value).isLargerThan(parentPointer.value)) {
            parentPointer.right = newNode;
        } else {
            parentPointer.left = newNode;
        }
        this._size += 1;
        return this._getReadyForRotation(newNode);
    }

    //@override
    protected _getReadyForRotation(treeNode: IBinaryTreeNode<T>): this {
        return this;
    }

    //@override
    protected _createTreeNode(value: T, parent: IBinaryTreeNode<T> = null): IBinaryTreeNode<T> {
        return new BinaryTreeNode<T>(value, parent);
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
                this._size -= 1;
            } else if (!treeNode.right) {
                treeNode = treeNode.left;
                this._size -= 1;
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
        if (!treeNode?.right) return treeNode;

        return this._getMaxByRecursion(treeNode.right);
    }

    private _getMaxByIteration(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {

        while (treeNode?.right) {
            treeNode = treeNode.right;
        }
        return treeNode;
    }

    private _getMinByRecursion(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {
        if (!treeNode?.left) return treeNode;

        return this._getMinByRecursion(treeNode.left);
    }

    private _getMinByIteration(treeNode: IBinaryTreeNode<T>): IBinaryTreeNode<T> {

        while (treeNode?.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }

    private _printPreOrderByRecursion(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printStr += `${treeNode.value.toString()}, `;

        this._printPreOrderByRecursion(treeNode.left);

        this._printPreOrderByRecursion(treeNode.right);
    }

    private _printPreOrderByIteration(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        const stack = StackFactory.create<IBinaryTreeNode<T>>();

        stack.push(treeNode);

        while (!stack.isEmpty()) {
            const node = stack.pop();
            this._printStr += `${node.value.toString()}, `;

            node.right && stack.push(node.right);
            node.left && stack.push(node.left);
        }
    }

    private _printInOrderByRecursion(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printInOrderByRecursion(treeNode.left);

        this._printStr += `${treeNode.value.toString()}, `;

        this._printInOrderByRecursion(treeNode.right);
    }

    private _printInOrderByIteration(treeNode: IBinaryTreeNode<T>): void {
        let pointer = treeNode;

        if (!pointer) return;

        const stack = StackFactory.create<IBinaryTreeNode<T>>();

        while (!stack.isEmpty() || pointer) {
            if (pointer) {
                stack.push(pointer);
                pointer = pointer.left;
            } else {
                pointer = stack.pop();
                this._printStr += `${pointer.value.toString()}, `;
                pointer = pointer.right;
            }
        }
    }

    private _printPostOrderByRecursion(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        this._printPostOrderByRecursion(treeNode.left);

        this._printPostOrderByRecursion(treeNode.right);

        this._printStr += `${treeNode.value.toString()}, `;
    }

    private _printPostOrderByIteration(treeNode: IBinaryTreeNode<T>): void {

    }

    private _getHeightOfTreeNodeByRecursion(treeNode: IBinaryTreeNode<T>): number {
        if (!treeNode) return 0;

        return 1 + Math.max(this._getHeightOfTreeNodeByRecursion(treeNode.left), this._getHeightOfTreeNodeByRecursion(treeNode.right));
    }

    private _getHeightOfTreeNodeByIteration(treeNode: IBinaryTreeNode<T>): number {
        if (!treeNode) return 0;

        let height = 0;
        let levelSize = 1;

        const queue = new Queue<IBinaryTreeNode<T>>();
        queue.enqueue(treeNode);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            levelSize -= 1;

            node.left && queue.enqueue(node.left);
            node.right && queue.enqueue(node.right);

            // levelsize === 0, it's going to move to next level;
            if (levelSize != 0) continue;

            levelSize = queue.size;
            height += 1;
        }
        return height;
    }

    private _printLevelOrder(treeNode: IBinaryTreeNode<T>): void {
        if (!treeNode) return;

        const queue = new Queue<IBinaryTreeNode<T>>();
        queue.enqueue(treeNode);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            this._printStr += `${node.value.toString()}, `;

            node.left && queue.enqueue(node.left);
            node.right && queue.enqueue(node.right);
        }
    }

    private __init__(): this {
        this._rootNode = undefined;
        this._size = 0;
        return this;
    }

    protected _isValidValue(value: T) {
        return value !== undefined
            && value !== null
            && Number(value) !== NaN
            && Number(value) !== Infinity
            && String(value) !== ""
    }

}

export const BinaryAVLTree: ITreeConstructor = class AVL<T> extends BinarySearchTree<T> {

    protected _rootNode: IAVLTreeNode<T>;

    get height(): number {
        return this._rootNode?.height || 0;
    }


    constructor(protected compare: ICompareFunc<T> = valueTypeComparison) {
        super(compare)
    }

    // override
    protected _getReadyForRotation(treeNode: IAVLTreeNode<T>): this {
        let pointer = treeNode;

        while (pointer = pointer.parent as IAVLTreeNode<T>) {
            if (pointer.isBalanced) {
                pointer.updateHeight();
            } else {
                return this._rebalanceTree(pointer);
            }
        }
        return this;
    }

    //@override
    protected _createTreeNode(value: T, parent: IAVLTreeNode<T> = null): IAVLTreeNode<T> {
        return new AVLTreeNode<T>(value, parent);
    }

    protected _rebalanceTree(treeNode: IAVLTreeNode<T>): this {
        let grandParentNode = treeNode;
        let parentNode: IAVLTreeNode<T>, childNode: IAVLTreeNode<T>;

        if (treeNode.balanceFactor > 0) {
            parentNode = grandParentNode.left as IAVLTreeNode<T>// L

            if (parentNode.balanceFactor > 0) {
                childNode = parentNode.left as IAVLTreeNode<T>;
                // LL -> rotate to right (grandParentNode)
                this._rotateToRight(grandParentNode, parentNode);
            } else {
                childNode = parentNode.right as IAVLTreeNode<T>;
                // LR
                this._rotateToLeft(parentNode, childNode);
                this._rotateToRight(grandParentNode, childNode);
            }
        } else {
            parentNode = grandParentNode.right as IAVLTreeNode<T>; // R

            if (parentNode.balanceFactor > 0) {
                childNode = parentNode.left as IAVLTreeNode<T>;
                //RL
                this._rotateToRight(parentNode, childNode);
                this._rotateToLeft(grandParentNode, childNode);
            } else {
                childNode = parentNode.right as IAVLTreeNode<T>;
                // RR
                this._rotateToLeft(grandParentNode, parentNode);
            }
        }
        return this;
    }

    protected _rotateToLeft(parentNode: IAVLTreeNode<T>, childNode: IAVLTreeNode<T>): void {
        if (childNode.left) {
            childNode.left.parent = parentNode;
        }
        parentNode.right = childNode.left;

        if (!parentNode.parent) {
            this._rootNode = childNode;
            childNode.parent = null;
        } else if (this.compare(parentNode.parent.left?.value).isEqualTo(parentNode.value)) {
            childNode.parent = parentNode.parent;
            parentNode.parent.left = childNode;
        } else {
            childNode.parent = parentNode.parent;
            parentNode.parent.right = childNode;
        }

        parentNode.parent = childNode;
        childNode.left = parentNode;

        parentNode.updateHeight();
        childNode.updateHeight();
    }

    protected _rotateToRight(parentNode: IAVLTreeNode<T>, childNode: IAVLTreeNode<T>): void {
        if (childNode.right) {
            childNode.right.parent = parentNode;
        }
        parentNode.left = childNode.right;

        if (!parentNode.parent) {
            this._rootNode = childNode;
            childNode.parent = null;
        } else if (this.compare(parentNode.parent.left?.value).isEqualTo(parentNode.value)) {
            childNode.parent = parentNode.parent;
            parentNode.parent.left = childNode;
        } else {
            childNode.parent = parentNode.parent;
            parentNode.parent.right = childNode;
        }

        parentNode.parent = childNode;
        childNode.right = parentNode;

        parentNode.updateHeight();
        childNode.updateHeight();
    }

}

export const BinaryRedBlackTree: ITreeConstructor = class RBT<T> extends BinaryAVLTree<T> {
    
}
/**
 * @BinarySearchTree
 * *搜索: 时间复杂度： Average-> O(lgn), WorstCase->O(n)*
 */

/**
 * @AVL_Tree
 * *时间复杂度：O(lgn)*
 */

