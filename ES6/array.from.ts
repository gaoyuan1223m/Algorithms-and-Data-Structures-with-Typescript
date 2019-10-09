const arrayWithInitValue = (length: number, initValue?: any) => Array.from({ length }).fill(initValue ? initValue : 0);

const arr = arrayWithInitValue(6, NaN);

console.log(arr);
