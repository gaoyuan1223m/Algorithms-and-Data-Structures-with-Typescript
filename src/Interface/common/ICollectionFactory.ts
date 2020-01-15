
import { ICollection } from "@Interface/common";
import { DataStructures } from "@Utils/types";

export interface IFactory {
    create<T>(type: DataStructures): ICollection<T>;
}
