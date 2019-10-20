import { DynamicArray } from "../../../src/DataStructure/dynamic-array/dynamic-array";
import { IArray } from "../../../src/DataStructure/dynamic-array/dynamic-array-interface";

const dynamicArray: IArray<number> = new DynamicArray<number>(7);

dynamicArray
    .insert(4, 3)
    .insert(6, 1)
    .insert(7, 0)
    .update(9, 5)
    .insert(8, 2)
    .insert(11, 4)
    .insert(15, 6)
    // full
    .insert(100, 2)
    .remove(0)


console.log(dynamicArray.size)
dynamicArray.print();