import { MinStack } from "@Algorithm/stack-queue";

describe(`Test for Min-Stack`, () => {
    const minStack = new MinStack();
    const elements = [3, 4, 5, 1, 2, 1];
    beforeAll(() => {
        elements.forEach(elem => minStack.push(elem));
    });

    it(`#Get size of the MinStack`, () => {
        expect(minStack.size).toBe(elements.length);
    });

    it(`#Get Min element of the MinStack`, () => {
        expect(minStack.getMin()).toBe(1)
    });

    it(`#Pop elements`, () => {
        expect(minStack.pop()).toBe(elements[elements.length - 1]);
        expect(minStack.pop()).toBe(elements[elements.length - 2]);
        expect(minStack.pop()).toBe(elements[elements.length - 3]);

        expect(minStack.getMin()).toBe(3);
    })
})