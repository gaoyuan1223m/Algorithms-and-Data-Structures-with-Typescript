
import {
    IBinaryTreeNodeConstructor,
    IBinaryTreeNode,
    IAVLTreeNodeConstructor,
    IAVLTreeNode,
    IRedBlackTreeNodeConstructor,
    IRedBlackTreeNode
} from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";
import { ICompareFunc } from "@Utils/compare";

class BSTNode<T> implements IBinaryTreeNode<T> {

    constructor(
        public value: T,
        public parent: IBinaryTreeNode<T> = null,
        public left: IBinaryTreeNode<T> = null,
        public right: IBinaryTreeNode<T> = null
    ) { }

    isLeftChild(compare: ICompareFunc<T>): boolean {
        return compare(this.value).isEqualTo(this.parent?.left?.value);
    }

    isRightChild(compare: ICompareFunc<T>): boolean {
        return compare(this.value).isEqualTo(this.parent?.right?.value);
    }

    isLeaf(): boolean {
        return !this.left && !this.right;
    }

}

class AVLNode<T> extends BSTNode<T> implements IAVLTreeNode<T> {

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

class RBTNode<T> extends BSTNode<T> implements IRedBlackTreeNode<T> {

    setRed(): void {
        this.color = TreeNodeColor.Red;
    }

    setBlack(): void {
        this.color = TreeNodeColor.Black;
    }

    getUncle(compare: ICompareFunc<T>): IRedBlackTreeNode<T> {
        return this.parent.getSibling(compare);
    }

    getSibling(compare: ICompareFunc<T>): IRedBlackTreeNode<T> {
        if (!this.parent) return null;

        if (this.isLeftChild(compare)) {
            return this.parent.right as IRedBlackTreeNode<T>;
        }

        return this.parent.left as IRedBlackTreeNode<T>;
    }

    isRed(): boolean {
        return this.color === TreeNodeColor.Red;
    }

    isBlack(): boolean {
        return this.color === TreeNodeColor.Black;
    }

    constructor(
        public value: T,
        public parent: IRedBlackTreeNode<T> = null,
        public color: TreeNodeColor = TreeNodeColor.Red,
        public left: IRedBlackTreeNode<T> = null,
        public right: IRedBlackTreeNode<T> = null
    ) {
        super(value, parent, left, right);
    }

}

export const BinaryTreeNode: IBinaryTreeNodeConstructor = BSTNode;
export const AVLTreeNode: IAVLTreeNodeConstructor = AVLNode;
export const RedBlackTreeNode: IRedBlackTreeNodeConstructor = RBTNode;
