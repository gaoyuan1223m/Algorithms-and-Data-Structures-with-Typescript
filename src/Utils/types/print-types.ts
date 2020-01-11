enum TreePrintOrder {
    PreOrder,
    InOrder,
    PostOrder
}

enum ListPrintOrder {
    Increase,
    Decrease
}

export type PrintOrder = TreePrintOrder | ListPrintOrder;
