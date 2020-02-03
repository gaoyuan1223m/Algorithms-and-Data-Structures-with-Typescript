
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

// const nums = [0, 1, 3, 4, 4, 5, 5, 7, 8, 9, 11, 16, 27];

// console.log(shuffle(nums));