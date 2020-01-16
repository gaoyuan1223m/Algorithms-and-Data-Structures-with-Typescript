
import { DataStructures } from "@Utils/types";
import { ICollectionBase } from "./ICollection";

export interface IFactory {
    create<T>(type: DataStructures): ICollectionBase;
}
