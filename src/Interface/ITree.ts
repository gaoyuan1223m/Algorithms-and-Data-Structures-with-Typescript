import { ICollection, IGenericCollection } from "./ICollection";

export interface ITree<T> extends IGenericCollection<T> {
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
    findPath(value: T): number[]
}