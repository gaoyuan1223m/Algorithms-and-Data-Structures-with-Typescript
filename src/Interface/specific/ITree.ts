import { ICollection, INode } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";
import { TreeNodeColor } from "@Utils/types";


export interface ITree<T> extends ICollection<T> {

    /**
     * @return {T} root value in the Tree
     */
    readonly rootValue: T; // O(1)

    /**
     * @return {T} the maximum value in the Tree
     */
    readonly maxValue: T; // Best O(1), Average O(log(n)), Worst O(n)

    /**
     * @return {T} the minimum value in the Tree
     */
    readonly minValue: T; //Best O(1), Average O(log(n)), Worst O(n)

    /**
     * Find a path from the root to the specific tree node. Going to the left returns 0, while going to the right returns 1
     * **
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
     * @param value the value of Tree Node that needs to search 
     * @param compare control elements to search on the Tree
     */
    findPath(value: T): number[];

    /**
     * Insert a number of element (T[]) on the Tree 
     * @param values elements to add
     * @param compare control elements to add on the Tree
     */
    appendRange(...values: T[]): this;

    /**
     * *Return an element by the given path.*
     * **0** means going left, while **1** referst to going right, and other numbers will be ignored.
     * @param path a Number Array that only comprises of 0 and 1
     */
    byPath(...path: number[]): T
}

export interface IBinaryTreeNode<T> extends INode<T> {
    left: IBinaryTreeNode<T>;
    right: IBinaryTreeNode<T>;
}

export interface IRedBlackTreeNode<T> extends INode<T> {
    color: TreeNodeColor;
    left: IRedBlackTreeNode<T>;
    right: IRedBlackTreeNode<T>;
    parent: IRedBlackTreeNode<T>
}


export interface IBinaryTreeNodeConstructor {
    new <T>(value: T, left?: IBinaryTreeNode<T>, right?: IBinaryTreeNode<T>): IBinaryTreeNode<T>;
}

export interface IRedBlackNodeConstructor {
    new <T>(
        value: T,
        left?: IRedBlackTreeNode<T>,
        right?: IRedBlackTreeNode<T>,
        parent?: IRedBlackTreeNode<T>,
        color?: TreeNodeColor
    ): IRedBlackTreeNode<T>
}