
/**
 * return fibonacci array
 */
const fibonacci = (length: number): number[] => {
    if (length < 1) return [];

    const arr = [1];

    if (length === 1) return arr;

    let a = 1, b = 1;

    for (let i = 1; i < length; i++) {
        [a, b] = [b, a + b];
        arr.push(a);
    }

    return arr;

}

/**
 * print ruler
 */

const drawLine = (tick_length: number, label?: string): void => {
    let line = '';
    for (let i = 0; i < tick_length; i++) {
        line += '-';
    }
    if (label) {
        line += ` ${label}`
    }
    console.log(line);
}

const drawInterval = (center_lenth: number): void => {
    if (center_lenth < 1) return;

    drawInterval(center_lenth - 1);
    drawLine(center_lenth);
    drawInterval(center_lenth - 1);
}

const drawRuler = (num_inches: number, major_length: number): void => {
    drawLine(major_length, '0');
    for (let i = 1; i <= num_inches; i++) {
        drawInterval(major_length - 1);
        drawLine(major_length, i.toString());
    }
}


/**
 * Print Hanoi 汉诺塔
 */

const hanoi = (layers: number, start: string, by: string, end: string): void => {
    if (layers === 1) {
        console.log(`Move from "${start}" to "${end}"`);
    } else {
        hanoi(layers - 1, start, end, by);
        hanoi(1, start, by, end);
        hanoi(layers - 1, by, start, end);
    }
}

/**
 * Merge_Sort Runtime:O(nlogn) Space:O(n)
 */
const mergeSortConquer = (left: number[], right: number[]): number[] => {
    let result: number[] = [];

    while (left.length > 0 && right.length > 0) {
        left[0] < right[0]
            ? result.push(left.shift() as number)
            : result.push(right.shift() as number);
    }

    return left.length === 0
        ? [...result, ...right]
        : [...result, ...left];
}
const mergeSort = (nums: number[]): number[] => {

    if (nums.length <= 1) return nums;

    let middle = ~~(nums.length / 2);

    let left = mergeSort(nums.slice(0, middle));

    let right = mergeSort(nums.slice(middle));

    return mergeSortConquer(left, right);

}

const insertSort = (nums: number[]): number[] => {
    const a = [...nums];
    for (let i = 1; i < a.length; i++) {
        let idx = i;
        while (idx > 0 && a[idx - 1] > a[idx]) {
            [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
            idx--;
        }
    }
    return a;
}


const mergeAndInserSort = (nums: number[]): number[] => {

    if (nums.length <= 1) return nums; //Recrursion Base

    let middle = Math.floor(nums.length / 2);

    let left = mergeAndInserSort(nums.slice(0, middle));

    let right = mergeAndInserSort(nums.slice(middle));

    if (left[left.length - 1] <= right[0]) {
        return [...left, ...right];
    }

    if (right[right.length - 1] <= left[0]) {
        return [...right, ...left];
    }

    return insertSort([...left, ...right]);

}

const quickSort = (nums: number[]): number[] => {

    if (nums.length <= 1) return nums; //Recrursion Base

    const middle = Math.floor(nums.length / 2);

    const pivot = nums[middle];

    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        if (i === middle) continue;

        nums[i] <= pivot ? left.push(nums[i]) : right.push(nums[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const a1 = [1, 8, 9, 7, 5, 56, 5, 113, 4, 11, 0, 4, 5, 3, 27, 16];
const a2 = [1, 8, 4, 9, 5, 56, 5, 7];
// console.log(mergeSort(a1));
// console.log(insertSort(a1));
// console.log(mergeAndInserSort(a1));
console.log(quickSort(a1));
console.log(a1);
// hanoi(4, 'L', 'M', 'R');
// drawRuler(15, 3);
// console.log(fibonacci(14));
