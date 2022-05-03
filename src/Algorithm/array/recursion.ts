
export const fibonacci = (length: number): number[] => {
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

export const drawRuler = (num_inches: number, major_length: number): void => {
  drawLine(major_length, '0');
  for (let i = 1; i <= num_inches; i++) {
    drawInterval(major_length - 1);
    drawLine(major_length, i.toString());
  }
}


/**
 * Print Hanoi 汉诺塔
 */
export const hanoi = (layers: number, start: string, by: string, end: string): void => {
  if (layers === 1) {
    console.log(`Move from "${start}" to "${end}"`);
  } else {
    hanoi(layers - 1, start, end, by);
    hanoi(1, start, by, end);
    hanoi(layers - 1, by, start, end);
  }
}

