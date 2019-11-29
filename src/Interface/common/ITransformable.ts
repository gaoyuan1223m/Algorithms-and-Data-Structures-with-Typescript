import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/data-types";
import { IArray } from "@Interface/specific/IArray";
import { ILinkedList } from "@Interface/specific/ILinkedList";
import { ITree } from "@Interface/specific/ITree";

export interface ITransformable<T> {

    toArray(arrayType: ArrayTypes): IArray<T>;

    toList(listType: ListTypes): ILinkedList<T>;

    toTree(treeType: TreeTypes): ITree<T>;
    
}