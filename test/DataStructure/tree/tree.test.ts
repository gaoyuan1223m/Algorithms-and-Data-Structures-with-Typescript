import { BinarySearchTree } from "../../../src/DataStructure/tree/tree";
import { Number } from "../../../src/Entity/comparable-entity";


const BST = new BinarySearchTree<Number>();

/**
 * *          7        *
 *          /   \
 * *       5      9     *
 *        / \   /   \
 * *     4   6 8    11   *
 *      /         /    \
 * *   3         10     12 *   
 */
BST
    .insert(new Number(7))
    .insert(new Number(5))
    .insert(new Number(9))
    .insert(new Number(4))
    .insert(new Number(6))
    .insert(new Number(3))
    .insert(new Number(8))
    .insert(new Number(11))
    .insert(new Number(12))
    .insert(new Number(10));


console.log(`Leaf Node with Max Node:`)
console.log(BST.getMax());
console.log(`**************************************************`);

const root = BST.root;
console.log('Leaf Node: 3')
console.log(root.left.left.left);
console.log(`**************************************************`);

console.log('Leaf Node: 6')
console.log(root.left.right);
console.log(`**************************************************`);

console.log('Leaf Node: 3')
console.log(root.left.left.left);
console.log(`**************************************************`);

console.log(`Leaf Node: 12`);
console.log(root.right.right.right);
console.log(`**************************************************`);

console.log(`Leaf Node: 10`);
console.log(root.right.right.left);
console.log(`**************************************************`);

