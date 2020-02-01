import { mySqrt } from "@Algorithm/search/int-sqrt"
import { catchErr, Errors } from "@Utils/error-handling";
interface ITestCase {
    params: any,
    expected?: any,
    err?: string
}

describe(`Test for int-SQRT`, () => {
    const validTestCases: ITestCase[] = [
        { params: 14, expected: 3 },
        { params: 65, expected: 8 },
        { params: 35, expected: 5 },
        { params: 100, expected: 10 },
        { params: 81, expected: 9 },
    ]

    const inValidTestCases: ITestCase[] = [
        { params: -14.5, err: Errors.Msg.NotPositiveInteger },
        { params: Number.MAX_SAFE_INTEGER + 1, err: Errors.Msg.NotSafeNum },
        { params: Number.MIN_SAFE_INTEGER - 1, err: Errors.Msg.NotSafeNum },
        { params: NaN, err: Errors.Msg.InvalidArg },
        { params: null, err: Errors.Msg.InvalidArg },
        { params: undefined, err: Errors.Msg.InvalidArg },
        { params: Infinity, err: Errors.Msg.NotSafeNum }
    ]

    validTestCases.forEach(({ params, expected }) => {
        it(`SQRT of "${params}" should be "${expected}"`, () => {
            const received = mySqrt(params);
            expect(received).toBe(expected);
        });
    });

    inValidTestCases.forEach(({params: invalidParam, err: expectedErr}) => {
        it(`SQRT of "${invalidParam}" should throw expections`, () => {
            expect(catchErr(mySqrt)(invalidParam)).toBe(expectedErr);
        })
    })

})