import { IMapNode } from "@Interface/common";
import { ITreeMapNode } from "@Interface/specific";
import { TreeNodeColor } from "@Utils/types";
import { ICompareFunc } from "@Utils/compare";

export class MapNode<K, V> implements IMapNode<K, V> {
    readonly key: K;

    value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    toString(): string {
        return ` key: ${this.key}, value: ${this.value} `;
    }

    compareWith(obj: IMapNode<K, V>): number {
        return this.key === obj?.key ? 0 : this.key < obj?.key ? -1 : 1;
    }

}

export class TreeMapNode<K, V> implements ITreeMapNode<K, V> {

    constructor(
        public readonly key: K,
        public value: V,
        public parent: ITreeMapNode<K, V> = null,
        public color: TreeNodeColor = TreeNodeColor.Red,
        public left: ITreeMapNode<K, V> = null,
        public right: ITreeMapNode<K, V> = null
    ) { }

    isLeftChild(compare: ICompareFunc<K>): boolean {
        return compare(this.key).isEqualTo(this.parent?.left?.key);
    }

    isRightChild(compare: ICompareFunc<K>): boolean {
        return compare(this.key).isEqualTo(this.parent?.right?.key);
    }

    isLeaf(): boolean {
        return !this.left && !this.right;
    }

    isRed(): boolean {
        return this.color === TreeNodeColor.Red;
    }

    isBlack(): boolean {
        return this.color === TreeNodeColor.Black;
    }

    setRed(): void {
        this.color = TreeNodeColor.Red;
    }

    setBlack(): void {
        this.color = TreeNodeColor.Black;
    }

    getUncle(compare: ICompareFunc<K>): ITreeMapNode<K, V> {
        return this.parent.getSibling(compare);
    }

    getSibling(compare: ICompareFunc<K>): ITreeMapNode<K, V> {
        if (!this.parent) return null;

        if (this.isLeftChild(compare)) {
            return this.parent.right
        }

        return this.parent.left
    }

}