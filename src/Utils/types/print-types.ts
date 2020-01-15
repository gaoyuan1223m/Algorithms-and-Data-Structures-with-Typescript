export enum TreePrintOrder {
    PreOrder = 0,
    InOrder,
    PostOrder
}

export enum ListPrintOrder {
    FromHeadToTail = 0,
    FromTailToHead = 1
}

export type PrintOrder = TreePrintOrder | ListPrintOrder;
