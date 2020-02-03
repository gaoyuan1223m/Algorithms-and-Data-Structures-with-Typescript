import { ArrayFactory } from "@DataStructure/array";
import { Errors, catchErr } from "@Utils/error-handling";
import { ArrayTypes, ListTypes, TreeTypes } from "@Utils/types";
import { valueTypeComparison } from "@Utils/compare";
import { IArray } from "@Interface/specific";


describe(`Test for Static Array`, () => {

    const capacity = 7;
    const staticArray: IArray<number> = ArrayFactory.create(ArrayTypes.STATIC);

    beforeAll(() => {
        staticArray
            .append(7)
            .insertByIndex(6, 3)
            .insertByIndex(2, 5)
            .insertByIndex(16, 3)
            .updateByIndex(26, 4)
    });

    // it(`#update with validator`, () => {
    //     staticArray.print();
    //     staticArray.updateByIndex(undefined, 2.5);
    //     staticArray.print();
    // })

    // it(`#getByIndex with validator`, () => {
    //     staticArray.getByIndex(1.3);
    // })

    it(`#Get size/length of the array`, () => {
        expect(staticArray.size).toBe(4);
        expect(staticArray.length).toBe(capacity);
    });

    it(`#Append invalid value but no exception throw`, () => {
        expect(catchErr(staticArray.append.bind(staticArray))(null))
            .toContain(Errors.Msg.InvalidArg);
        expect(staticArray.size).toBe(4);
    })

    it(`#Get value by positive index`, () => {
        expect(staticArray[3]).toBe(16);
        expect(staticArray[4]).toBe(26);
        expect(staticArray[5]).toBe(2);
    });

    it(`#Get value by negative index`, () => {
        expect(staticArray[-4]).toBe(16);
        expect(staticArray[-3]).toBe(26);
        expect(staticArray[-2]).toBe(2);
    });

    it(`#remove value by positive index`, () => {
        expect(staticArray.removeByIndex(2)).toBe(undefined);
        expect(staticArray[2]).toBe(16);
    });

    it(`#remove value by negative index`, () => {
        expect(staticArray[-5]).toBe(16);
    })

    it(`#insert value by positive index`, () => {
        staticArray.insertByIndex(44, 4);
        expect(staticArray[4]).toBe(44);
        expect(staticArray[5]).toBe(2);
    })

    it(`#insert value by negative index`, () => {
        expect(staticArray[-3]).toBe(44);
        expect(staticArray[-2]).toBe(2);
    })

    it(`#append value to the empty position`, () => {
        staticArray.append(100);
        expect(staticArray[6]).toBe(100);
        expect(staticArray[-1]).toBe(100);
        expect(staticArray.size).toBe(6);
    })

    it(`#insert value to the left`, () => {
        staticArray.insertByIndex(32, 5);
        expect(staticArray[0]).toBe(7);
        expect(staticArray[6]).toBe(100);
        expect(staticArray[-7]).toBe(7);
        expect(staticArray[-1]).toBe(100);
        expect(staticArray[3]).toBe(44);
        expect(staticArray[-5]).toBe(26);
    })

    it(`#get index of value `, () => {
        expect(staticArray.indexOf(11)).toBe(-1);
        expect(staticArray.indexOf(32)).toBe(5);
    })

    it(`#contains value?`, () => {
        expect(staticArray.contains(22)).toBeFalsy()
        expect(staticArray.contains(100)).toBeTruthy();
    })

    it(`#remove value by searching itself`, () => {
        staticArray
            .remove(123)
            .remove(44);

        expect(staticArray[3]).toBe(2);
        expect(staticArray[5]).toBe(100);
        expect(staticArray[6]).toBeUndefined();

        expect(staticArray[-5]).toBe(26);
        expect(staticArray[-2]).toBe(100);
        expect(staticArray[-1]).toBeUndefined();
    });

    it(`#reverse current array`, () => {
        staticArray.reverse();
        expect(staticArray[0]).toBe(undefined);
        expect(staticArray[6]).toBe(7);
        expect(staticArray[-2]).toBe(16);
        expect(staticArray[-4]).toBe(2);
    });

    it(`print the array`, () => {
        staticArray.print();
    });

    it(`Sort the Array`, () => {
        staticArray
            .sort()
            .append(200);
        for (let i = 0; i < staticArray.size - 1; i++) {
            expect(
                valueTypeComparison<number>(staticArray[i])
                    .isLessThan(staticArray[i + 1])
            ).toBe(true);
        }
    })

    it(`clear the array`, () => {
        staticArray.clear();
        expect(staticArray.isEmpty()).toBeTruthy();
    });



    it(`Should transform to Linked List`, () => {
        const list
            = staticArray
                .clear()
                .append(7)
                .insertByIndex(6, 3)
                .insertByIndex(2, 5)
                .insertByIndex(16, 3)
                .updateByIndex(26, 4)
                .toList(ListTypes.SINGLY);

        expect(list.size).toBe(staticArray.size);
    });

    it(`Should transform to BST`, () => {
        const tree
            = staticArray
                .clear()
                .append(7)
                .insertByIndex(6, 3)
                .insertByIndex(2, 5)
                .insertByIndex(16, 3)
                .updateByIndex(26, 4)
                .toTree(TreeTypes.BST);

        expect(tree.size).toBe(staticArray.size);
    });

});
