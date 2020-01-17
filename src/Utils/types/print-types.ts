export enum TreePrintOrder {
    PreOrder = "PRE",
    InOrder = "IN",
    PostOrder = "POST"
}

export enum ListPrintOrder {
    FromHeadToTail = "SEQ",
    FromTailToHead = "REV"
}

export type PrintOrder = TreePrintOrder | ListPrintOrder;
