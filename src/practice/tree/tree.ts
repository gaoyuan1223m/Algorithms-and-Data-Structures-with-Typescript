/**
 * @BinarySearchTree
 */

class TreeNode<T> {
    private _value: T;
    private _left: TreeNode<T>;
    private _right: TreeNode<T>;

    get value() {
        return this._value;   
    }

    get left() {
        return this._left;   
    }

    get right() {
        return this._right;
    }

    public setValue(value: T) {
        this._value = value;
        return this;
    }

    public setLeft(left: TreeNode<T>) {
        this._left = left;
        return this;
    }

    public setRight(right: TreeNode<T>) {
        this._right = right;
        return this;
    }

    public build() {

    }
}

class BinarySearchTree<T> {

    private _root: TreeNode<T>;

    public insert(value: T): TreeNode<T> {
        return this._root;
    }

    public remove(value: T): TreeNode<T> {
        return this._root;
    }

    public getMax(): TreeNode<T> {
        return this._root;
    }

}

const left = new TreeNode<string>().setValue('left');
const right = new TreeNode<string>().setValue('right');
const root = new TreeNode<string>().setValue('root').setRight(right).setLeft(left);

// console.log(root.value);
// console.log(root.left.value);
// console.log(root.left);
// console.log(root.right.value)
// console.log(root.right);

