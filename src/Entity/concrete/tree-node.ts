export class TreeNode<T> {

    value: T;
    left: TreeNode<T>;
    right: TreeNode<T>;

    constructor(value: T, left: TreeNode<T>, right: TreeNode<T>) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}