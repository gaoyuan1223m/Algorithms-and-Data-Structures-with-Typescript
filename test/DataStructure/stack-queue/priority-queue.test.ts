import { inRed, inBlue } from "@Utils/emphasize";
import { PriorityQueue } from "@DataStructure/stack-queue";
import { IQueue } from "@Interface/specific";

describe(`Test for ${inRed("Priority-Queue")}`, () => {
    const elements = [12, 45, 8, 9, 78, 120, 24, 33, 69, 2, 18];
    const priorityQueue: IQueue<number> = new PriorityQueue();

    beforeAll(() => {
        priorityQueue.enqueue(...elements);
        elements.sort((a, b) => a - b);
        console.log(`Sorted Elements: ${inBlue(elements)}`);
        priorityQueue.print();
    });

    it(`Should return right size of Queue`, () => {        
        expect(priorityQueue.size).toBe(elements.length);
        expect(priorityQueue.isEmpty()).toBe(false);
    });

    it(`Should return ${inRed("Peak")} and ${inRed("Tail")}`, () => {
        expect(priorityQueue.head).toBe(120);
        expect(priorityQueue.tail).toBe(12);
    });

    it(`Dequeue ${inRed(1)} elements`, () => {
        expect(priorityQueue.dequeue(0)).toBe(null);
        expect(priorityQueue.size).toBe(elements.length);
    });

    it(`Dequeue ${inRed(1)} elements`, () => {
        expect(priorityQueue.dequeue()).toBe(elements.pop());
        expect(priorityQueue.size).toBe(elements.length);
    });

    it(`Dequeue ${inRed(3)} elements`, () => {
        expect(priorityQueue.dequeue(3)).toEqual([elements.pop(), elements.pop(), elements.pop()]);
        expect(priorityQueue.size).toBe(elements.length);
    });

    it(`Should be empty after clear`, () => {
        expect(priorityQueue.clear().isEmpty()).toBe(true);
    });

})