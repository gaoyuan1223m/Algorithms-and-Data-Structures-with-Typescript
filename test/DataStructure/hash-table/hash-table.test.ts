import { HashClassInterface } from "../../../src/DataStructure/hash-table/hash-table-interface";
import { Dictionary } from "../../../src/DataStructure/hash-table/hash-table";

class Avenger implements HashClassInterface<Avenger>, Object {

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

    equals(key: Avenger): boolean {
        return this._name === key.name && this._age === key.age
    }

    toString(): string {
        return `${this._name}/${this._age}`;
    }

    private guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }
}

class Address implements Object {
    private _id: string;
    private _country: string;
    private _state: string;
    private _street: string;

    get id(): string {
        return this._id;
    }

    get country(): string {
        return this._country;
    }

    get state(): string {
        return this._state;
    }

    get street(): string {
        return this._street;
    }

    constructor(street: string, state: string, country: string) {
        this._id = this.guid();
        this._street = street;
        this._state = state;
        this._country = country;
    }

    toString(): string {
        return `${this._id}/${this._street}/${this._state}/${this._country}`;
    }

    private guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }
}

const a1 = new Avenger('Ryan', 18);
    const ad1 = new Address('No.01-DeSheng', 'Beijing', 'China');

const a2 = new Avenger('Peter', 19);
    const ad2 = new Address('No.11-Queen', 'New York', 'USA');

const a3 = new Avenger('Steve', 46);
    const ad3 = new Address('No.01-Queen', 'New York', 'USA');


const dict = new Dictionary<Address, Avenger>(5);

dict
    .set(ad1, a1)
    .set(ad2, a2)
    .set(ad3, a3);

dict.print();

