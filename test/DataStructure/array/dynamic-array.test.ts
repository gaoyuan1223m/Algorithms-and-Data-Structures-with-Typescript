import { ArrayFactory } from "@DataStructure/array"
import { ArrayTypes } from "@Utils/types";

describe(`Test for Dynamic Array`, () => {

    const capacity = 5;
    const dynamicArray = ArrayFactory.create<number>(ArrayTypes.Dynamic, capacity);


    beforeAll(() => {
        dynamicArray
            .append(5)
            .append(3)
            .append(2)
            .append(1)
            .append(4);
    })

    it(`#should return right size`, () => {
        expect(dynamicArray.length).toBe(capacity);
        expect(dynamicArray.size).toBe(capacity)
    });

    it(`Should add an element at first capacity growth`, () => {
        dynamicArray
            .insertByIndex(10, 7)
            .append(7)
        // .print();

        expect(dynamicArray.length).toBe(2 * capacity);
        expect(dynamicArray.size).toBe(capacity + 2);
    });

    it(`Should insert an element at first capacity growth`, () => {
        dynamicArray
            .insertByIndex(8, 6)
            .insertByIndex(9, 7)
            .insertByIndex(0, 8)
        // .print();
        expect(dynamicArray.size).toBe(2 * capacity);
        expect(dynamicArray.length).toBe(2 * capacity);
    });

    it(`Should insert an element at second capacity growth`, () => {
        dynamicArray
            .insertByIndex(13, 2)
        // .print();

        expect(dynamicArray.length).toBe(3 * capacity);
        expect(dynamicArray.size).toBe(2 * capacity + 1);
        expect(dynamicArray[-5]).toBe(7);
        expect(dynamicArray[-10]).toBe(4);
        expect(dynamicArray[-13]).toBe(13);
        expect(dynamicArray.head).toBe(5);
        expect(dynamicArray.tail).toBe(undefined);
    });

    it(`Should insert an element by its Negative Index`, () => {
        dynamicArray
            .insertByIndex(11, -6)
            .print();
        expect(dynamicArray[-6]).toBe(11);
        expect(dynamicArray.size).toBe(2 * capacity + 2);
    });

    it(`Should insert an element by its Negative Index when it's full`, () => {
        dynamicArray
            .append(12)
            .append(16)
            .append(20) 
            // it is full and inset 77 at -17
            .insertByIndex(77, -17)
            .print()
        expect(dynamicArray.length).toBe(4 * capacity);
        expect(dynamicArray.size).toBe(3 * capacity + 1);
        expect(dynamicArray[3]).toBe(77);
    });

});