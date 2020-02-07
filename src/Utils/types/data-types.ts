export enum ArrayTypes {
    DYNAMIC = "DYNAMIC ARRAY",
    STATIC = "STATIC ARRAY"
}

export enum ListTypes {
    SINGLY = "SINGLY LINKED LIST",
    Doubly = "DOUBLY LINKED LIST",
    CIRCULAR = "CIRCULAR LINKED LIST",
    SKIP = "SKIP LINKED LIST"
}

export enum TreeTypes {
    BST = "BINARY SEARCH TREE",
    AVL = "AVL TREE",
    RBT = "RED BLACK TREE"
}

export enum TreeNodeColor {
    Black = "BLACK",
    Red = "RED"
}

export enum HashTypes {
    DICT = "KEY-VALUE MAPPING",
    SET = "UNIQUE VALUES GROUP"
}

export enum BinaryHeapTypes {
    MAX = "MAX HEAP",
    MIN = "MIN HEAP"
}

export type DataStructures = ArrayTypes | ListTypes | TreeTypes | HashTypes | BinaryHeapTypes;

