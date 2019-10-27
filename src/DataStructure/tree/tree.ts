import { IComparable } from "../../Interface/IComparable";

/**
 * @BinarySearchTree
 */

class TreeNode<T> {

    public node: T;
    public left: TreeNode<T>;
    public right: TreeNode<T>;

    constructor(node: T) {
        this.node = node;
    }

}

/**
 * *搜索时间复杂度： Average-> O(lgn), WorstCase->O(n)*
 */
export class BinarySearchTree<T extends IComparable> {

    private _root: TreeNode<T>;

    get root(): TreeNode<T> {
        return this._root;
    }

    insert(node: T): this {        
        this._root = this._insertByRecursion(this._root, node);
        return this;
    }

    private _insertByRecursion(treeNode: TreeNode<T>, node: T): TreeNode<T> {
        if(!treeNode) {
            return new TreeNode<T>(node);
        }

        if(treeNode.node.isEqualTo(node)) return;

        if(treeNode.node.isLessThan(node.value)) {
            treeNode.right = this._insertByRecursion(treeNode.right, node);
        } else {
            treeNode.left = this._insertByRecursion(treeNode.left, node);
        }

        return treeNode;
    }

    private _insertByIteraton() {

    }

    contains(value: T): boolean {
        
        return false;
    }

    findPath(value: T): number[] {
        return []
    }

    remove(value: T): this {
        
        return this;
    }

    getMax(): TreeNode<T> {
        return this._getMaxByRecursion(this._root);
    }

    private _getMaxByRecursion(treeNode: TreeNode<T>): TreeNode<T> {
        if(!treeNode.right) return treeNode;

        return this._getMaxByRecursion(treeNode.right);
    }

    private _getMaxByIteration(treeNode: TreeNode<T>): TreeNode<T> {

        while(treeNode.right){
            treeNode = treeNode.right;
        }
        return treeNode;
    }

    getMin(): TreeNode<T> {
        return this._getMinByRecursion(this._root);
    }

    private _getMinByRecursion(treeNode: TreeNode<T>): TreeNode<T> {
        if(!treeNode.left) return treeNode;

        return this._getMaxByRecursion(treeNode.left);
    }

    private _getMinByIteration(treeNode: TreeNode<T>): TreeNode<T> {

        while(treeNode.left){
            treeNode = treeNode.left;
        }
        return treeNode;
    }    

}

