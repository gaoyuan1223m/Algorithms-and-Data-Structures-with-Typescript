import { ICollection, INode } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";


export interface ITree<T> extends ICollection<T> {

    /**
     * The value of the Root Node.
     */
    readonly rootValue: T; // O(1)

    /**
     * The maximum value on the Tree. 
     */
    readonly maxValue: T; // Best O(1), Average O(log(n)), Worst O(n)

    /**
     * The minimum value on the Tree. 
     */
    readonly minValue: T; //Best O(1), Average O(log(n)), Worst O(n)

    /**
     * Find a path from the root to the specific tree node. Going to the left returns 0, while going to the right returns 1
     * **
     * *          7            *
     * *        /   \
     * *      5      9        *
     * *     / \   /   \
     * *    4   6 8    11     *
     * *    /         /    \
     * *  3         10     12 *   
     * if we're going to find 10 on the tree, it will return [1 1 0];
     * if we're going to find 15 on the tree, it will return [-1];
     * @param value the value of Tree Node that needs to search 
     */
    findPath(value: T, compare?: ICompareFunc<T>): number[];

    /**
     * Insert a number of element (T[]) on the Tree 
     * @param values [Necessary]
     * @param compare [Optional]
     */
    appendRange(values: T[], compare?: ICompareFunc<T>): this;

    /**
     * *Return an element by the given path.*
     * **0** means going left, while **1** referst to going right, and other numbers will be ignored.
     * @param path an Number Array that only comprises of 0 and 1
     */
    byPath(path: number[]): T
}

export interface IBinaryTreeNode<T> extends INode<T> {

    left: IBinaryTreeNode<T>;
    
    right: IBinaryTreeNode<T>;
}

export interface IBinaryTreeNodeConstructor {
    new <T>(value: T, left?: IBinaryTreeNode<T>, right?: IBinaryTreeNode<T>): IBinaryTreeNode<T>;
}