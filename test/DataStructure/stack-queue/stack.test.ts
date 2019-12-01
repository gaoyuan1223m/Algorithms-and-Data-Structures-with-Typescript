import { IStack } from "@Interface/specific/IStack";
import { Stack } from "@DataStructure/stack-queue/stack";
import { IError } from "@Interface/common/IError";
import { Errors } from "@Utils/errors";

describe('Test for Stack', () => {

    const s: IStack<number> = new Stack<number>();

    it('Throw Err with no element to pop', () => {
        try {
            s.pop();
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.NoElements);
        }
    })

    it('push values to the Stack', () => {
        s.push(11).push(2).push(9).push(3).push(8);
        expect(s.size).toBe(5);
    })

    it('verify value of Peek element', () => {
        expect(s.peek).toBe(8);
    })

    it('pop element from the Stack', () => {
        expect(s.pop()).toBe(8);
        expect(s.size).toBe(4);
    })

    it('make Stack pull of elements', () => {
        s.push(1).push(5).push(6).push(4).push(7).push(10);
        expect(s.size).toBe(10);
    })

    it('Throw Err when no room for new elements', () => {
        try {
            s.push(111);
        } catch (error) {
            const e: IError = error;
            expect(e.message).toBe(Errors.Msg.NoMoreSpace);
        }
    })

})
