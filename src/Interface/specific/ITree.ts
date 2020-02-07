import { ICollection, INode } from "@Interface/common";
import { TreeNodeColor } from "@Utils/types";
import { ICompareFunc } from "@Utils/compare";


export interface ITree<T> extends ICollection<T> {

    /**
     * @return {T} root value in the Tree
     */
    readonly rootValue: T; // O(1)

    /**
     * @return {number} height of the ROOT tree node
     */
    readonly height: number;

    /**
     * @return {T} the maximum value in the Tree
     */
    readonly maxValue: T; // Best O(1), Average O(log(n)), Worst O(n)

    /**
     * @return {T} the minimum value in the Tree
     */
    readonly minValue: T; //Best O(1), Average O(log(n)), Worst O(n)

    /**
     * *Find a path from the root to the specific tree node.*
     * *The returned path is an array that only comprises of 0 or 1,*
     * *where 0 means going to the Left, while 1 refers to going to the Right*
     * @param value the value of Tree Node that needs to search 
     */
    findPath(value: T): number[];

    /**
     * Insert a number of element (T[]) on the Tree 
     * @param values elements to add
     */
    appendRange(...values: T[]): this;

    /**
     * *Return depth of the element specified*
     * @param value element to search
     */
    getDepth(value: T): number;

    /**
     * *Return an element by the given path.*
     * **0** means going left, while **1** referst to going right, and other numbers will be ignored.
     * @param path a Number Array that only comprises of 0 and 1
     */
    byPath(...path: number[]): T;

    /**
     * *Return TRUE if it's a COMPLETE Binary Tree, else FALSE*
     */
    isComplete(): boolean;


    /**
     * *
     * *          7            
     * *        /   \
     * *      5      9        
     * *     / \   /   \
     * *    4   6 8    11     
     * *    /         /    \
     * *  3         10     12 
     * if we're going to find 7 (root) in the tree, it will return []
     * if we're going to find 10 on the tree, it will return [1 1 0];
     * if we're going to find 15 on the tree, it will return [-1];
     */
}

export interface ITreeConstructor {
    new <T>(compare: ICompareFunc<T>): ITree<T>
}

export interface IBinaryTreeNode<T> extends INode<T> {
    left: IBinaryTreeNode<T>;
    right: IBinaryTreeNode<T>;
    parent: IBinaryTreeNode<T>;

    isLeftChild(compare: ICompareFunc<T>): boolean;
    isRightChild(compare: ICompareFunc<T>): boolean;

    isLeaf(): boolean;
}

export interface IAVLTreeNode<T> extends IBinaryTreeNode<T> {
    height: number;

    readonly isBalanced: boolean;
    readonly balanceFactor: number;

    updateHeight(): void;
}

export interface IRedBlackTreeNode<T> extends IAVLTreeNode<T> {
    color: TreeNodeColor;

    isRed(): boolean;
    isBlack(): boolean;

    setRed(): void;
    setBlack(): void;

    isLeftChild(compare: ICompareFunc<T>): boolean;
    isRightChild(compare: ICompareFunc<T>): boolean;

    getUncle(compare: ICompareFunc<T>): IRedBlackTreeNode<T>
    getSibling(compare: ICompareFunc<T>): IRedBlackTreeNode<T>;
}


export interface IBinaryTreeNodeConstructor {
    new <T>(value: T, parent?: IBinaryTreeNode<T>, left?: IBinaryTreeNode<T>, right?: IBinaryTreeNode<T>): IBinaryTreeNode<T>;
}

export interface IAVLTreeNodeConstructor {
    new <T>(value: T, parent?: IAVLTreeNode<T>, left?: IAVLTreeNode<T>, right?: IAVLTreeNode<T>, height?: number): IAVLTreeNode<T>
}

export interface IRedBlackTreeNodeConstructor {
    new <T>(value: T, parent?: IRedBlackTreeNode<T>, color?: TreeNodeColor, left?: IRedBlackTreeNode<T>, right?: IRedBlackTreeNode<T>): IRedBlackTreeNode<T>
}

