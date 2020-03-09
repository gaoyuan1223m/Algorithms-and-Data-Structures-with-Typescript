import { TreeSet } from "@DataStructure/map-set";

describe(`Test for Tree-Set`, () => {
    const elements = [
        55, 47, 7, 8, 68, 61, 12, 99, 11, 64, 33, 36, 9, 81, 49, 46, 70, 35, 76, 93, 32,
        94, 38, 100, 63, 22, 78, 69, 45, 18, 64, 58, 97, 26, 59, 34, 21, 20, 5, 80, 15, 2, 4
    ];
    let len = elements.length;
    const treeSet = new TreeSet<number>();

    beforeAll(() => {
        for (const e of elements) {
            treeSet.add(e)
        }
        treeSet.print();
    })

    it(`Should return right size`, () => {
        expect(treeSet.isEmpty()).toBe(false);
        expect(treeSet.size).toBe(--len);
    });

    it(`Should contain input elements`, () => {
        [94, 38, 100, 63, 22, 78, 69, 45, 18]. forEach(e => {
            expect(treeSet.has(e)).toBe(true);
        });
    });

    it(`Should NOT contain the elements`, () => {
        [1, 25, 101, 345, 77, 62].forEach(e => { 
            expect(treeSet.has(e)).toBe(false);
        });
    });

    it(`Should delete element if has`, () => {
        const elementsToDel = [94, 38, 100, 63, 22, 78, 69, 45, 18]
        elementsToDel.forEach(e => {
            expect(treeSet.del(e)).toBe(true);
            expect(treeSet.size).toBe(--len);
        });
        expect(len).toBe(elements.length - 1 - elementsToDel.length);
    });

    it(`Should NOT delete element if does NOT have`, () => {
        const elementsToDel = [1, 25, 101, 345, 77, 62]
        elementsToDel.forEach(e => {
            expect(treeSet.del(e)).toBe(false);
            expect(treeSet.size).toBe(len);
        });
    });

    it(`Should clear the Set`, () => {
        expect(treeSet.clear().isEmpty()).toBe(true);
    });

})