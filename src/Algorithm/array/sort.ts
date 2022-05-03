import { logTime } from '@Utils/decorator';

type SortResult = {
  array: number[],
  loopCnt: number,
  compCnt: number,
  swapCnt: number,
  consumption?: number,
}

class SortMethod {
  static instance: SortMethod;

  static getInstance() {
    if (SortMethod.instance) {
      return SortMethod.instance;
    }

    SortMethod.instance = new SortMethod();
    return SortMethod.instance;
  }

  protected constructor() { }

  @logTime
  static useQuickSort(array: number[]): SortResult {
    return this.getInstance().quick(array);
  }

  @logTime
  static useMergeSort(array: number[]): SortResult {
   return this.getInstance().merge2(array);
  }

  @logTime
  static useInsertSort(array: number[]): SortResult {
    return this.getInstance().insert(array);
  }

  @logTime
  static useSelectSort(array: number[]): SortResult {
    return this.getInstance().select(array);
  }

  @logTime
  static useBubbleSort(array: number[]): SortResult {
    return this.getInstance().bubble2(array);
  }

  /**
   * 1s completed for 500000- (秒级50W条以内数据)
   */
  protected quick(array: number[], loopCnt = 0, compCnt = 0, swapCnt = 0): SortResult{
    compCnt += 1;

    if (array.length <= 1) {
      return { array, loopCnt, compCnt, swapCnt };
    }

    const middle = Math.floor(array.length / 2);
    const pivot = array[middle];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < array.length; i++) {
      compCnt += 1;

      if (i === middle) continue;

      const element = array[i];
      if (element <= pivot) {
        left.push(element);
      } else {
        right.push(element);
      }

      compCnt += 1;
      loopCnt += 1;
    }

    // return [...this.quick(left), pivot, ...this.quick(right)];

    return {
      array: [
        ...this.quick(left, loopCnt, compCnt, swapCnt).array,
        pivot,
        ...this.quick(right, loopCnt, compCnt, swapCnt).array
      ],
      loopCnt,
      compCnt,
      swapCnt,
    };
  }

  /**
   * @deprecated
   */
  protected merge(array: number[]): number[] {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const leftArray = this.merge(array.slice(0, middle));
    const rightArray = this.merge(array.slice(middle));

    if (leftArray[leftArray.length - 1] <= rightArray[0]) {
      return [...leftArray, ...rightArray];
    }

    if (rightArray[rightArray.length - 1] <= leftArray[0]) {
      return [...rightArray, ...leftArray];
    }

    const { array: orderedArray } = this.insert([...leftArray, ...rightArray]);
    return orderedArray;
  }

  /**
   * 1s completed for 100000- (秒级10W条以内数据)
   */
  protected merge2(array: number[], loopCnt = 0, compCnt = 0, swapCnt = 0): SortResult {
    compCnt += 1;

    if (array.length <= 1) return { array, loopCnt, compCnt, swapCnt };

    const middle = ~~(array.length / 2);
    const { array: leftArray } = this.merge2(array.slice(0, middle), loopCnt, compCnt, swapCnt);
    const { array: rightArray } = this.merge2(array.slice(middle), loopCnt, compCnt, swapCnt);

    return this.mergeConquer(leftArray, rightArray, loopCnt, compCnt, swapCnt);
  }

  /**
   * 1s completed for 3500- (秒级3.5K条以内数据)
   */
  protected insert(array: number[]): SortResult {
    let loopCnt = 0;
    let compCnt = 0;
    let swapCnt = 0;

    for (let i = 1; i < array.length; i++) {
      let idx = i;
      while (idx > 0 && array[idx - 1] > array[idx]) {
        [array[idx - 1], array[idx]] = [array[idx], array[idx - 1]];
        idx--;

        loopCnt += 1;
        compCnt += 1;
        swapCnt += 3;
      }

      loopCnt += 1;
    }

    return  { array, loopCnt, compCnt, swapCnt };
  }

  /**
   * 1s completed for 20000- (秒级2W条以内数据)
   */
  protected select(array: number[]): SortResult {
    let loopCnt = 0;
    let compCnt = 0;
    let swapCnt = 0;

    for (let end = array.length - 1; end > 0; end--) {
      let idxOfMax = 0;

      for (let begin = 0 + 1; begin <= end; begin++) {
        if (array[idxOfMax] <= array[begin]) {
          idxOfMax = begin;
        }

        // ------------ only for statistics --------
        loopCnt += 1;
        compCnt += 1;
      }

      [array[idxOfMax], array[end]] = [array[end], array[idxOfMax]];

      // ------------ only for statistics --------
      loopCnt += 1;
      swapCnt += 3;
    }

    return { array, loopCnt, compCnt, swapCnt };
  }

  /**
   * 1s completed for 3500- (秒级3.5K条以内数据)
   */
  protected bubble(array: number[]): number[] {
    for (let end = array.length - 1; end > 0; end--) {
      let isOrdered = true; // assume it's ordered by default

      for (let begin = 1; begin <= end; begin++) {
        if (array[begin] < array[begin - 1]) {
          [array[begin - 1], array[begin]] = [array[begin], array[begin - 1]];
          isOrdered = false; // that means it's disordered because of swapping index
        }
      }

      if (isOrdered) break;
    }

    return array;
  }

  /**
   * 1s completed for 3500- (秒级3.5K条以内数据)
   */
  protected bubble2(array: number[]): SortResult {
    let loopCnt = 0;
    let compCnt = 0;
    let swapCnt = 0;

    for (let end = array.length - 1; end > 0; end--) {
      // Assume array is in-ordered from pointerAtSorted to the end
      let pointerAtSorted = 1;

      for (let begin = 1; begin <= end; begin++) {
        if (array[begin] < array[begin - 1]) {
          [array[begin - 1], array[begin]] = [array[begin], array[begin - 1]];
          pointerAtSorted = begin;

           // ---------only for statistics------
           swapCnt += 3;
        }
        // ---------only for statistics------
        loopCnt += 1;
        compCnt += 1;
      }

      end = pointerAtSorted;

      // ---------only for statistics------
      loopCnt += 1;
    }

    return { array, loopCnt, compCnt, swapCnt };
  }

  private mergeConquer(
    leftArray: number[],
    rightArray: number[],
    loopCnt: number,
    compCnt: number,
    swapCnt: number,
  ): SortResult {
    const result: number[] = [];

    while (leftArray.length > 0 && rightArray.length > 0) {
      if (leftArray[0] < rightArray[0]) {
        result.push(leftArray.shift())
      } else {
        result.push(rightArray.shift())
      }

      compCnt += 3;
      loopCnt += 1;
    }

    if (leftArray.length === 0) {
      return { array: [...result, ...rightArray], loopCnt, compCnt, swapCnt }
    }
    return { array: [...result, ...leftArray], loopCnt, compCnt, swapCnt };
  }
}

export { SortMethod };
