
import { DataStructures } from "@Utils/types";
import { ICollectionBase } from "@Interface/common";
import { ICompareFunc } from "@Utils/compare";

export interface IFactory {
    create<T>(type: DataStructures, compare?: ICompareFunc<T>, capacity?: number, incremental?: number): ICollectionBase;
}
