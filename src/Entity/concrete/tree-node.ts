export class BinaryTreeNode<T> {

    value: T;
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;

    constructor(value: T, left: BinaryTreeNode<T> = null, right: BinaryTreeNode<T> = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}