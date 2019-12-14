import { BinarySearchTree } from "@DataStructure/tree/tree";
import { Console } from "@Utils/emphasiz/high-light";


const BST = new BinarySearchTree<Number>();

/**
 * *          7            *
 *          /   \
 * *       5      9        *
 *        / \   /   \
 * *     4   6 8    11     *
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


Console.Err(`Leaf Node with Max Node`);
console.log(BST.getMax());
console.log(`**************************************************`);

Console.Err(`The Path of 12 should be: [1 1 1]`);
console.log(BST.findPath(new Number(12)));
console.log(`**************************************************`);

Console.Err(`Remove value 7`);
BST.remove(new Number(7));
const root = BST.root;

Console.Err('Leaf Node: 3')
console.log(root.left.left.left);
console.log(`**************************************************`);

Console.Err('Leaf Node: [undefined], used to be 6')
console.log(root.left.right);
console.log(`**************************************************`);

Console.Warn('Leaf Node: 3')
console.log(root.left.left.left);
console.log(`**************************************************`);

Console.Err('Leaf Node: 8')
console.log(root.right.left);
console.log(`**************************************************`);

Console.Err(`Leaf Node: 12`);
console.log(root.right.right.right);
console.log(`**************************************************`);

Console.Err(`Leaf Node: 10`);
console.log(root.right.right.left);
console.log(`**************************************************`);

