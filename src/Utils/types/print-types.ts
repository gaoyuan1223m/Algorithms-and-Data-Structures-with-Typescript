export enum TreePrintOrder {
    PreOrder,
    InOrder,
    PostOrder
}
export enum ListPrintOrder {
    FromHeadToTail,
    FromTailToHead
}

export type PrintOrder = TreePrintOrder | ListPrintOrder;
