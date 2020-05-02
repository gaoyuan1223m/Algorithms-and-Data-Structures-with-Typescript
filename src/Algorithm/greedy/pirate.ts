

function robAntiques(capacity: number, antiquesWeights: number[]) {
    antiquesWeights.sort((a, b) => a - b)

    let currWeigtht = 0, count = 0;

    for (const weight of antiquesWeights) {
        currWeigtht += weight;
        if (currWeigtht > capacity) return count;
        count += 1;
    }
    return count;
}

let items = robAntiques(30, [4, 5, 4, 10, 7, 14, 2, 11]);
console.log(`最多能选(${items})件古董！`);
