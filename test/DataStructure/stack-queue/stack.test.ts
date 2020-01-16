import { IStack } from "@Interface/specific";
import { StackFactory } from "@DataStructure/stack-queue";
import { catchErr, Errors } from "@Utils/error-handling";


describe('Test for Dynamic Stack', () => {

    const stack: IStack<number> = StackFactory.create<number>(); //

    /** Stack
     *      Bottom <------------- Peek 
     *      -------------------------------------
     *      | 11, 2, 9, 3, 8 ...
     *      -------------------------------------
     */

    beforeAll(() => {
        stack.push(11, 2, 9, 3, 8);
    });

    it('push values to the Stack', () => {
        expect(stack.size).toBe(5);
    });

    it('verify value of Peek element', () => {
        expect(stack.peek).toBe(8);
    });

    it('pop one element from the Stack', () => {
        expect(stack.pop()).toBe(8);
        expect(stack.size).toBe(4);
        expect(stack.peek).toBe(3);
    });

    it(`#Should return NULL when passing invalid number`, () => {
        expect(stack.pop(-1.34)).toBe(null);
        expect(stack.size).toBe(4);
        expect(stack.peek).toBe(3);
    })

    it('make Stack pull of elements', () => {
        expect(stack.pop(4)).toEqual([3, 9, 2, 11]);
        expect(stack.size).toBe(0);
    });

    it('Null will be observed when no elements on the Stack', () => {
        expect(stack.peek).toBe(null);
    })

    it('current Stack should be empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    it('Don\'t Throw Err with no element to pop', () => {
        expect(stack.pop()).toBe(null);
    });

})

describe(`Test for Static Stack`, () => {

    const capacity = 5;
    const stack: IStack<number> = StackFactory.create<number>(capacity); //

    /** Stack
     *      Bottom <------------- Peek 
     *      -------------------------------------
     *      | 11, 2, 9, 3, 8  (no more space)
     *      -------------------------------------
     */

    beforeAll(() => {
        stack.push(11, 2, 9, 3, 8);
    });

    it('#push values to the Stack', () => {
        expect(stack.size).toBe(5);
    });

    it('#verify value of Peek element', () => {
        expect(stack.peek).toBe(8);
    });

    it('#pop one element from the Stack', () => {
        expect(stack.pop()).toBe(8);
        expect(stack.size).toBe(4);
        expect(stack.peek).toBe(3);
    });

    it(`#Should return NULL when passing invalid number`, () => {
        expect(stack.pop(-1.34)).toBe(null);
        expect(stack.size).toBe(4);
        expect(stack.peek).toBe(3);
    })

    it('#make Stack pull of elements', () => {
        expect(stack.pop(4)).toEqual([3, 9, 2, 11]);
        expect(stack.size).toBe(0);
    });

    it('#Null will be observed when no elements on the Stack', () => {
        expect(stack.peek).toBe(null);
    })

    it('#current Stack should be empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    it('#Don\'t Throw Err with no element to pop', () => {
        expect(stack.pop()).toBe(null);
    });

    it(`#Push more value to Stack`, () => {
        expect(catchErr(stack.push.bind(stack))(11, 2, 9, 3, 18, 4, 7)).toBe(Errors.Msg.NoMoreSpace);
        expect(stack.size).toBe(capacity);
        expect(stack.peek).toBe(18);
    });
})
