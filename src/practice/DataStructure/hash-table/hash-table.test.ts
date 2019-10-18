import { HashClassInterface } from "./hash-table";
Object
class HashEntity implements HashClassInterface<HashEntity>, Object {

    private _id: string;
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._id = this.guid();
        this._name = name;
        this._age = age;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    hashCode(): number {
        const s: string = this.toString();
        const len: number = s.length;

        let hash: number = 0;
        if (len == 0) {
            return hash;
        }

        for (let i = 0; i < len; i++) {
            let char = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        return Math.abs(hash);
    }

    equals(key: HashEntity): boolean {
        return this._name === key.name && this._age === key.age
    }

    toString(): string {
        return `${this._id}/${this._name}/${this._age}`;
    }
    
    private guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }
}

const p1 = new HashEntity('Ryan', 18);
const p2 = new HashEntity('Ryan', 18);
const p3 = new HashEntity('Ryan', 18);

const arr = [p1, p2]

console.log(p1.id);
console.log(p2.id);
console.log(p1.hashCode(), p2.hashCode());
console.log(p1.equals(p2));
console.log(p1.toString());

console.log(arr.includes(p2))
