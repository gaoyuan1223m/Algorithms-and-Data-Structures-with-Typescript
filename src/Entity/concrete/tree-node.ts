
import { IBinaryTreeNodeConstructor, IBinaryTreeNode, IRedBlackNodeConstructor, IRedBlackTreeNode } from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";

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

export const RedBlackTreeNode: IRedBlackNodeConstructor = class RedBlackTreeNode<T> implements IRedBlackTreeNode<T> {
    color: TreeNodeColor;
    left: IRedBlackTreeNode<T>;
    right: IRedBlackTreeNode<T>;
    parent: IRedBlackTreeNode<T>;
    value: T;

    constructor(
        value: T,
        left: IRedBlackTreeNode<T> = null,
        right: IRedBlackTreeNode<T> = null,
        parent: IRedBlackTreeNode<T> = null,
        color: TreeNodeColor = TreeNodeColor.Red 
    ) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.color = color
    }

}
