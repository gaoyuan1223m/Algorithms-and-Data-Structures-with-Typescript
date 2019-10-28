import { ICollection } from "./ICollection";

export interface IStack extends ICollection {

    push(value: number | string | boolean | Object): void;

    pop(): number | string | boolean | Object;
    
}