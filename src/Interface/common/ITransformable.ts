import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/data-types";
import { IArray } from "@Interface/specific/IArray";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ITree } from "@Interface/specific/ITree";

export interface ITransformable<T> {

    /**
     * *Transform current collection to a specific Array, Dynamic or Static,
     * *and invalid elements, including null, undefined, NaN, Infinity,  will be removed.*
     * @param arrayType: Dynamic Array or Static Array
     */
    toArray(arrayType?: ArrayTypes): IArray<T>;

    /**
     * *Transform current collection to a specific Linked List, Singly, Doubly, Circular or Skip,
     * *and invalid elements, including null, undefined, NaN, Infinity,  will be removed.*
     * @param listType: Singly, Doubly, Circular or Skip List 
     */
    toList(listType?: ListTypes): ILinkedList<T>;

    /**
     * *Transform current collection to a specific Tree, BST, AVL, or Red/Black,
     * *and invalid elements, including null, undefined, NaN, Infinity,  will be removed.*
     * @param treeType: BST, AVL or Red/Back Tree 
     */
    toTree(treeType?: TreeTypes): ITree<T>;
    
}