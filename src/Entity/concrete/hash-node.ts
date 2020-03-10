import { SinglyListNode, RedBlackTreeNode } from "@Entity/concrete";
import {
    IHashListNode, IHashListNodeConstructor,
    IHashTreeNode, IHashTreeNodeConstructor
} from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";

/**
 * SLLHashNode refers to Singly Linked List Hash Node
 */
class SLLHashNode<K, V> extends SinglyListNode<V> {

    constructor(
        public hash: number = 0,
        public key: K = null,
        public value: V = null,
        public next: IHashListNode<K, V> = null
    ) {
        super(value, next);
    }
}
/**
 * RBTHashNode refers to Red Black Tree Hash Node
 */
class RBTHashNode<K, V> extends RedBlackTreeNode<V> {

    constructor(
        public hash: number = 0,
        public key: K = null,
        public value: V = null,
        public parent: IHashTreeNode<K, V> = null,
        public color: TreeNodeColor = TreeNodeColor.Red,
        public left: IHashTreeNode<K, V> = null,
        public right: IHashTreeNode<K, V> = null
    ) {
        super(value, parent, color, left, right);
    }
}

export const ListHashNode: IHashListNodeConstructor = SLLHashNode;
export const TreeHashNode: IHashTreeNodeConstructor = RBTHashNode;