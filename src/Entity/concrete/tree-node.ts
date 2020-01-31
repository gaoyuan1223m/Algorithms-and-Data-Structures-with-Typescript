
import {
    IBinaryTreeNodeConstructor,
    IBinaryTreeNode,
    IRedBlackTreeNodeConstructor,
    IRedBlackTreeNode,
    IAVLTreeNodeConstructor,
    IAVLTreeNode
} from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";

export const BinaryTreeNode: IBinaryTreeNodeConstructor = class BinaryTreeNode<T> implements IBinaryTreeNode<T> {

    constructor(
        public value: T,
        public parent: IBinaryTreeNode<T> = null,
        public left: IBinaryTreeNode<T> = null,
        public right: IBinaryTreeNode<T> = null
    ) { }
}

export const AVLTreeNode: IAVLTreeNodeConstructor = class AVLTreeNode<T> extends BinaryTreeNode<T> implements IAVLTreeNode<T> {

    get balanceFactor(): number {
        return (this.left?.height || 0) - (this.right?.height || 0);
    }

    get isBalanced(): boolean {
        return Math.abs(this.balanceFactor) <= 1;
    }

    updateHeight(): void {
        this.height = 1 + Math.max(this.left?.height || 0, this.right?.height || 0);
    }

    constructor(
        public value: T,
        public parent: IAVLTreeNode<T> = null,
        public left: IAVLTreeNode<T> = null,
        public right: IAVLTreeNode<T> = null,
        public height: number = 1
    ) {
        super(value, parent, left, right);
    }

}

export const RedBlackTreeNode: IRedBlackTreeNodeConstructor = class RedBlackTreeNode<T> extends AVLTreeNode<T> implements IRedBlackTreeNode<T> {

    constructor(
        public value: T,
        public parent: IRedBlackTreeNode<T> = null,
        public left: IRedBlackTreeNode<T> = null,
        public right: IRedBlackTreeNode<T> = null,
        public color: TreeNodeColor = TreeNodeColor.Red,
        public height: number = 1
    ) {
        super(value, parent, left, right, height);
    }

}
