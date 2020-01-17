import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { IArray, ILinkedList, ITree } from "@Interface/specific";
import { ICompareFunc } from "@Utils/compare";

export interface ITransformable<T> {

    /**
     * *Transform current collection to a specific Array, Dynamic or Static.*
     * @param arrayType Dynamic Array or Static Array
     */
    toArray(arrayType: ArrayTypes): IArray<T>;

    /**
     * *Transform current collection to a specific Linked List, Singly, Doubly, Circular or Skip.*
     * @param listType Singly, Doubly, Circular or Skip List 
     */
    toList(listType: ListTypes): ILinkedList<T>;

    /**
     * *Transform current collection to a specific Tree, BST, AVL, or Red/Black.*
     * @param treeType BST, AVL or Red/Back Tree 
     */
    toTree(treeType: TreeTypes, compare?: ICompareFunc<T>): ITree<T>;

}