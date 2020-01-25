
import { DataStructures } from "@Utils/types";
import { ICollectionBase } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";

export interface IFactory {
    create<T>(capacity: number, comapre?: ICompareFunc<T>): ICollectionBase;
    create<T>(capacity?: number, incremental?: number): ICollectionBase;
    create<T>(type?: DataStructures, capacity?: number, incremental?: number, compare?: ICompareFunc<T>): ICollectionBase;
}
