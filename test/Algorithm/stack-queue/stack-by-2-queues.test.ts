import { StackBy2Queues } from "@Algorithm/stack-queue";
import { inRed, inBlue } from "@Utils/emphasize";

describe(`Test Implementation of Stack by 2 Queues`, () => {
    const stack = new StackBy2Queues<number>();
    const elements = [3, 7, 5, 2];
    const elements2 = [1, 4, 8, 6];
    let currLen = 0;

    beforeAll(() => {
        stack.push(...elements);
        currLen = elements.length;
    })

    it(`#Check the ${inBlue("Size")} of current Stack`, () => {
        expect(stack.size).toBe(currLen);
    })

    it(`#Check ${inRed("Head")} of current Stack`, () => {
        expect(stack.peek).toBe(2);
    })

    it(`#Pop ${inRed(2)} elements`, () => {
        expect(stack.pop(2)).toEqual([2, 5]);
        expect(stack.size).toBe(currLen -= 2);
    });

    it(`#Push ${inRed(4)} elements and Pop ${inRed(3)} elememts`, () => {
        expect(stack.push(...elements2).pop(3)).toEqual([6, 8, 4]);
        expect(stack.size).toBe(currLen = currLen + elements2.length - 3);
    });

    it(`#Pop ${inRed(2)} elements`, () => {
        expect(stack.pop(2)).toEqual([1, 7]);
        expect(stack.size).toBe(currLen -= 2);
    });

    it(`Pop ${inRed(1)} more elements`, () => {
        expect(stack.pop()).toEqual(3);
        expect(stack.size).toEqual(currLen -= 1);
        expect(currLen).toBe(0);
    });

});