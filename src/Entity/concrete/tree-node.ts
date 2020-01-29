
import {
    IBinarySearchTreeNodeConstructor,
    IBinarySearchTreeNode,
    IRedBlackTreeNodeConstructor,
    IRedBlackTreeNode,
    IAVLTreeNodeConstructor,
    IAVLTreeNode
} from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";

export const BinaryTreeNode: IBinarySearchTreeNodeConstructor = class BinaryTreeNode<T> implements IBinarySearchTreeNode<T> {

    value: T;
    left: IBinarySearchTreeNode<T>;
    right: IBinarySearchTreeNode<T>;

    constructor(
        value: T,
        left: IBinarySearchTreeNode<T> = null,
        right: IBinarySearchTreeNode<T> = null
    ) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export const AVLTreeNode: IAVLTreeNodeConstructor = class AVLTreeNode<T> implements IAVLTreeNode<T> {
    height: number;
    value: T;
    left: IAVLTreeNode<T>;
    right: IAVLTreeNode<T>;

    constructor(
        value: T,
        left: IAVLTreeNode<T> = null,
        right: IAVLTreeNode<T> = null,
        height: number = 0
    ) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = height;
    }

    getBalanceFactor(): number {
        return (this.left?.height || 0) - (this.right?.height || 0);
    }

}

export const RedBlackTreeNode: IRedBlackTreeNodeConstructor = class RedBlackTreeNode<T> implements IRedBlackTreeNode<T> {
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
