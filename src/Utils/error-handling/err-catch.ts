export const catchErr = (fn: Function) =>
    (...args: any[]): string => {
        try {
            return fn(...args)
        } catch (e) {
            return e?.message ? e.message : e;
        }
    }