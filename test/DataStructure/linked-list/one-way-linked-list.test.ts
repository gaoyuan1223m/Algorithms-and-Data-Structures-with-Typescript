import { OneWayLinkedList } from "@DataStructure/linked-list/one-way-linked-list";

class Avenger implements Object {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    toString(): string {
        return `${this._name}/${this._age}`;
    }
}

const myLinkList = new OneWayLinkedList<Avenger>();

myLinkList
    .append(new Avenger('Ryan', 18))
    .insert(new Avenger('Peter', 18), 1)
    .insertFirst(new Avenger('Steve', 42))
    .insert(new Avenger('Stark', 55), 1)
    .insertFirst(new Avenger('T\'Chalelle', 35));

console.log(myLinkList.findbyIndex(2));

console.log(`size is: ${myLinkList.size}`);

myLinkList.print();