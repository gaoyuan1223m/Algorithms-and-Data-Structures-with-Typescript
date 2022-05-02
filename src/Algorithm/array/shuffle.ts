
/**
 * Fisher–Yates shuffle Algorithm
 */
export const shuffle = (arr: any[]): any[] => {
    const a = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [a[r], a[i]] = [a[i], a[r]]
    }
    return a;
}
