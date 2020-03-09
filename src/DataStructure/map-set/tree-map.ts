
import { IMap, ITreeMapNode } from "@Interface/specific";
import { Errors } from "@Utils/error-handling";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { TreeMapNode } from "@Entity/concrete/map-node";
import { StackFactory } from "@DataStructure/stack-queue";
import { Console } from "@Utils/emphasize";

export class TreeMap<K, V> implements IMap<K, V> {

    private _rootNode: ITreeMapNode<K, V>;
    private _size: number;

    get size(): number {
        return this._size;
    };

    constructor(private compare: ICompareFunc<K> = valueTypeComparison) {
        this.__init__();
    }

    del(key: K): V {
        if (!this._isValidKey(key)) throw new Errors.InvalidArgument(Errors.Msg.InvalidDictKey);

        return this._removeByIteration(key);
    }

    get(key: K): V {
        if (!this._isValidKey(key)) throw new Errors.InvalidArgument(Errors.Msg.InvalidDictKey);

        return this._getTreeMapNodeByKey(key)?.pointer.value || null;
    }

    has(key: K): boolean {
        if (!this._isValidKey(key)) throw new Errors.InvalidArgument(Errors.Msg.InvalidDictKey);

        return !!this._getTreeMapNodeByKey(key);
    }

    set(key: K, value: V): this {
        if (!this._isValidKey(key)) throw new Errors.InvalidArgument(Errors.Msg.InvalidArg);

        return this._insertByIteraton(key, value);
    }

    forEach(callbackfn: (key: K, value: V, IMap: IMap<K, V>) => void, thisArg: any = this): void {
        if(!this._rootNode) return;

        let pointer = this._rootNode;        

        if (!pointer) return;

        const stack = StackFactory.create<ITreeMapNode<K, V>>();

        while (!stack.isEmpty() || pointer) {
            if (pointer) {
                stack.push(pointer);
                pointer = pointer.left;
            } else {
                pointer = stack.pop();
                callbackfn(pointer.key, pointer.value, this);
                pointer = pointer.right;
            }
        }
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    print(): this {
        Console.OK(`${this._printInOrder(this._rootNode)}`);
        return this;
    }

    clear(): this {
        return this.__init__();
    }

    private _insertByIteraton(key: K, value: V): this {
        if (!this._rootNode) {
            this._rootNode = new TreeMapNode<K, V>(key, value);
            this._size += 1;
            return this._afterAddTreeNode(this._rootNode);
        }

        let currentPointer = this._rootNode;
        let parentPointer: ITreeMapNode<K, V>;
        do {
            if (this.compare(key).isEqualTo(currentPointer.key)) {
                currentPointer.value = value;
                return this;
            }

            parentPointer = currentPointer;

            if (this.compare(key).isLargerThan(currentPointer.key)) {
                currentPointer = currentPointer.right;
            } else {
                currentPointer = currentPointer.left;
            }

        } while (currentPointer)

        const newNode = new TreeMapNode<K, V>(key, value, parentPointer);

        if (this.compare(key).isLargerThan(parentPointer.key)) {
            parentPointer.right = newNode;
        } else {
            parentPointer.left = newNode;
        }
        this._size += 1;
        return this._afterAddTreeNode(newNode);
    }

    private _removeByIteration(key: K): V {

        const node = this._getTreeMapNodeByKey(key);
        if (!node) return null;

        let { pointer: delNode } = node;
        let { value } = delNode;

        if (delNode.isLeaf()) {
            this._afterRemoveTreeNode(this._removeNodeWithZeroDegree(delNode));
        } else if (!delNode.left || !delNode.right) {
            this._afterRemoveTreeNode(this._removeNodeWithOneDegree(delNode));
        } else {
            this._afterRemoveTreeNode(this._removeNodeWithTwoDegree(delNode));
        }

        return value;
    }

    private _afterAddTreeNode(treeNode: ITreeMapNode<K, V>): this {
        let child = treeNode;
        let parent = child.parent;

        if (!parent) {
            child.setBlack();
            return this;
        }

        if (parent.isBlack()) {
            return this;
        }

        let uncle = child.getUncle(this.compare);

        let grand = parent.parent;

        if (uncle?.isRed()) {
            parent.setBlack();
            uncle.setBlack();
            grand.setRed();
            return this._afterAddTreeNode(grand);
        };

        if (parent.isLeftChild(this.compare)) {
            if (child.isLeftChild(this.compare)) {
                // LL
                this._recolorize(grand, parent);
                this._rotateToRight(grand, parent);
            } else {
                // LR
                this._recolorize(grand, child);
                this._rotateToLeft(parent, child);
                this._rotateToRight(grand, child);
            }
        } else {
            if (child.isLeftChild(this.compare)) {
                // RL
                this._recolorize(grand, child);
                this._rotateToRight(parent, child);
                this._rotateToLeft(grand, child);
            } else {
                // RR
                this._recolorize(grand, parent);
                this._rotateToLeft(grand, parent);
            }
        }
        return this;
    }

    private _afterRemoveTreeNode(treeNode: ITreeMapNode<K, V>): void {
        if (treeNode.isRed()) {
            treeNode.setBlack();
            return;
        }

        let parent = treeNode.parent;

        if (!parent) {
            return;
        }

        let isLeft = parent.left == null;
        let sibling = isLeft ? parent.right : parent.left;

        if (isLeft) {
            if (sibling.isRed()) {
                this._recolorize(parent, sibling);
                this._rotateToLeft(parent, sibling);
                sibling = parent.right;
            }
            // to confirm if sibing has a child, borrow one to the hole
            let siblingLeftChild = sibling.left;
            let siblingRightChild = sibling.right;
            let isSiblingLeftChildBlack = !siblingLeftChild || siblingLeftChild.isBlack();
            let isSiblingRightChildBlack = !siblingRightChild || siblingRightChild.isBlack();

            //sibling does NOT have red children
            if (isSiblingLeftChildBlack && isSiblingRightChildBlack) {
                let isParentBlack = parent.isBlack();
                parent.setBlack();
                sibling.setRed();
                if (isParentBlack) {
                    return this._afterRemoveTreeNode(parent);
                }
            } else {
                if (isSiblingRightChildBlack) {
                    this._rotateToRight(sibling, siblingLeftChild);
                    sibling = parent.right;
                }

                parent.isBlack() ? sibling.setBlack() : sibling.setRed();
                siblingRightChild = sibling.right;
                siblingRightChild.setBlack();
                parent.setBlack();
                this._rotateToLeft(parent, sibling);
            }
        } else { // delNode used to be right child
            if (sibling.isRed()) {
                this._recolorize(parent, sibling);
                this._rotateToRight(parent, sibling);
                sibling = parent.left;
            }
            // to confirm if sibing has a child, borrow one to the hole
            let siblingLeftChild = sibling.left;
            let siblingRightChild = sibling.right;
            let isSiblingLeftChildBlack = !siblingLeftChild || siblingLeftChild.isBlack();
            let isSiblingRightChildBlack = !siblingRightChild || siblingRightChild.isBlack();

            //sibling does NOT have red children
            if (isSiblingLeftChildBlack && isSiblingRightChildBlack) {
                let isParentBlack = parent.isBlack();
                parent.setBlack();
                sibling.setRed();
                if (isParentBlack) {
                    return this._afterRemoveTreeNode(parent);
                }
            } else {
                if (isSiblingLeftChildBlack) {
                    this._rotateToLeft(sibling, siblingRightChild);
                    sibling = parent.left;
                }

                parent.isBlack() ? sibling.setBlack() : sibling.setRed();
                siblingLeftChild = sibling.left;
                siblingLeftChild.setBlack();
                parent.setBlack();
                this._rotateToRight(parent, sibling);
            }
        }
    }

    private _rotateToLeft(parent: ITreeMapNode<K, V>, child: ITreeMapNode<K, V>): void {
        if (child.left) {
            child.left.parent = parent;
        }
        parent.right = child.left;

        if (!parent.parent) {
            this._rootNode = child;
            child.parent = null;
        } else if (parent.isLeftChild(this.compare)) {
            child.parent = parent.parent;
            parent.parent.left = child;
        } else {
            child.parent = parent.parent;
            parent.parent.right = child;
        }

        parent.parent = child;
        child.left = parent;
    }

    private _rotateToRight(parent: ITreeMapNode<K, V>, child: ITreeMapNode<K, V>): void {
        if (child.right) {
            child.right.parent = parent;
        }
        parent.left = child.right;

        if (!parent.parent) {
            this._rootNode = child;
            child.parent = null;
        } else if (parent.isLeftChild(this.compare)) {
            child.parent = parent.parent;
            parent.parent.left = child;
        } else {
            child.parent = parent.parent;
            parent.parent.right = child;
        }

        parent.parent = child;
        child.right = parent;
    }

    private _recolorize(parent: ITreeMapNode<K, V>, child: ITreeMapNode<K, V>): void {
        parent.setRed();
        child.setBlack();
    }

    private _removeNodeWithZeroDegree(treeNode: ITreeMapNode<K, V>): ITreeMapNode<K, V> {
        const parent = treeNode.parent;

        if (!parent) {
            this.__init__();
            return treeNode; // it's root node
        }

        if (treeNode.isLeftChild(this.compare)) {
            parent.left = null;
        } else {
            parent.right = null;
        }

        this._size -= 1;
        return treeNode;
    }

    private _removeNodeWithOneDegree(treeNode: ITreeMapNode<K, V>): ITreeMapNode<K, V> {
        const grandparent = treeNode.parent;

        if (!grandparent) {
            this._rootNode = treeNode.left || treeNode.right;
            this._rootNode.parent = null;
            this._size -= 1;
            return treeNode;
        }

        const child = treeNode.left || treeNode.right; // 
        child.parent = grandparent;

        if (treeNode.isLeftChild(this.compare)) {
            grandparent.left = child;
        } else {
            grandparent.right = child;
        }

        this._size -= 1;
        return child;
    }

    private _removeNodeWithTwoDegree(treeNode: ITreeMapNode<K, V>): ITreeMapNode<K, V> {
        // 2-degree node should have a predecessor node
        const predecessor = this._getPredecessorNode(treeNode);

        treeNode.value = predecessor.value;
        treeNode.key = predecessor.key;

        if (predecessor.isLeaf()) {
            return this._removeNodeWithZeroDegree(predecessor)
        }

        return this._removeNodeWithOneDegree(predecessor);
    }

    private _getPredecessorNode(treeNode: ITreeMapNode<K, V>): ITreeMapNode<K, V> {
        if (!treeNode) return null;

        if (treeNode.left) return this._getMaxByIteration(treeNode.left);

        while (treeNode.isLeftChild(this.compare)) {
            treeNode = treeNode.parent;
        }

        return treeNode.parent;
    }

    private _getMaxByIteration(treeNode: ITreeMapNode<K, V>): ITreeMapNode<K, V> {

        while (treeNode?.right) {
            treeNode = treeNode.right;
        }
        return treeNode;
    }

    private _getTreeMapNodeByKey(key: K): { pointer: ITreeMapNode<K, V>, path: number[] } {
        if (!this._rootNode) return null;

        let pointer = this._rootNode;
        let path: number[] = [];
        do {
            if (this.compare(key).isLargerThan(pointer?.key)) {
                pointer = pointer.right;
                path.push(1);
            } else if (this.compare(key).isLessThan(pointer?.key)) {
                pointer = pointer.left;
                path.push(0);
            }

            if (this.compare(key).isEqualTo(pointer?.key)) return { pointer, path };

        } while (pointer?.left || pointer?.right)

        return null;
    }

    private _printInOrder(treeNode: ITreeMapNode<K, V>): string {
        let pointer = treeNode;
        let str = "";

        if (!pointer) return;

        const stack = StackFactory.create<ITreeMapNode<K, V>>();

        while (!stack.isEmpty() || pointer) {
            if (pointer) {
                stack.push(pointer);
                pointer = pointer.left;
            } else {
                pointer = stack.pop();
                str += `${pointer.key} \t--> \t${pointer.value};\n`;
                pointer = pointer.right;
            }
        }
        return str;
    }

    private __init__(): this {
        this._rootNode = undefined;
        this._size = 0;
        return this;
    }

    private _isValidKey(key: K) {
        return key !== undefined
            && key !== null
            && Number(key) !== Infinity
            && String(key) !== "";
    }

}