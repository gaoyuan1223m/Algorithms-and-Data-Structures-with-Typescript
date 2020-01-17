
import { DataStructures } from "@Utils/types";
import { ICollectionBase } from "@Interface/common";

export interface IFactory {
    create(type?: DataStructures, capacity?: number, incremental?: number): ICollectionBase;
}
