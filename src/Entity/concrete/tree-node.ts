
import { IBinaryTreeNodeConstructor, IBinaryTreeNode } from "@Interface/specific";

export const BinaryTreeNode: IBinaryTreeNodeConstructor = class BinaryTreeNode<T> implements IBinaryTreeNode<T> {

    value: T;

    left: IBinaryTreeNode<T>;

    right: IBinaryTreeNode<T>;

    constructor(value: T, left: BinaryTreeNode<T> = null, right: BinaryTreeNode<T> = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
