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

  @logTime
  static useHeapSort(array: number[]): SortResult {
    return this.getInstance().heap(array)
  }

  /**
   * 1s completed for 500000- (50W)
   */
  protected quick(array: number[], loopCnt = 0, compCnt = 0, swapCnt = 0): SortResult {
    compCnt += 1;

    if (array.length <= 1) {
      return { array, loopCnt, compCnt, swapCnt };
    }

    const middle = array.length >> 1;
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
   * Quick Sort：Pick up Pivot element,
   * leftArray holds the elements less than or equal to the Pivot，
   * rightArray save the others，
   * and then selects Pivots recursively from leftArray and rightArray,
   * till each element was selected as a Pivot
   * @BestTimeComplexity nlogn
   * @AverageTimeComplexity nlogn
   * @WorstTimeComplexity n2
   * @ExtraSpaceComplexity logn
   * @InPlace No
   * @Stability NO
   */
  protected quickSort(array: number[]): number[] {
    if (array.length <= 1) {
      return array;
    }

    const middle = array.length >> 1;
    const pivot = array[middle];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < array.length; i++) {
      if (i === middle) continue;

      const element = array[i];
      element <= pivot ? left.push(element) : right.push(element);
    }

    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
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
   * 1s completed for 100000- (10W)
   */
  protected merge2(array: number[], loopCnt = 0, compCnt = 0, swapCnt = 0): SortResult {
    compCnt += 1;

    if (array.length <= 1) return { array, loopCnt, compCnt, swapCnt };

    const middle = array.length >> 1;
    const { array: leftArray } = this.merge2(array.slice(0, middle), loopCnt, compCnt, swapCnt);
    const { array: rightArray } = this.merge2(array.slice(middle), loopCnt, compCnt, swapCnt);

    return this.mergeConquer(leftArray, rightArray, loopCnt, compCnt, swapCnt);
  }

  /**
   * 1s completed for 30000- (3W)
   */
  protected insert(array: number[]): SortResult {
    let loopCnt = 0;
    let compCnt = 0;
    let swapCnt = 0;

    for (let i = 1; i < array.length; i++) {
      let idx = i;
      const curr = array[idx];
      while (idx > 0 && array[idx - 1] > curr) {
        array[idx] = array[idx - 1];
        idx--;

        loopCnt += 1;
        compCnt += 1;
      }
      array[idx] = curr;

      loopCnt += 1;
    }

    return { array, loopCnt, compCnt, swapCnt };
  }

  /**
   * (original) Insert Sort, compare (i) to (i - 1)，
   * if (i - 1) is larger than (i)，that means (i) should be put before (i - 1)，
   * and swap them and proceed (i - 1 => i),
   * till the index reduces to 1, or (i-1) is less than or equal to (i)
   * @BestTimeComplexity n
   * @AverageTimeComplexity n2
   * @WorstTimeComplexity n2
   * @ExtraSpaceComplexity 1
   * @InPlace Yes
   * @Stability Yes
   */
  private insertSort(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
      let idx = i;
      // idx > 0 compare till the index reduces to 1;
      while (idx > 0 && array[idx - 1] > array[idx]) {
        // TODO, too many swaps
        [array[idx - 1], array[idx]] = [array[idx], array[idx - 1]];
        idx--;
      }
    }

    return array;
  }

  /**
   * (optimization1) Insert Sort, mark [curr = (i)] and compare curr to (i - 1)，
   * if (i - 1) is larger than the curr，that means curr should sit before (i - 1)，
   * and assign (i - 1) to (i) and proceed,
   * till the index reduces to 1, or (i-1) is less than or equal to the curr,
   * and then assign the curr to its intended place
   * @BestTimeComplexity n
   * @AverageTimeComplexity n2
   * @WorstTimeComplexity n2
   * @ExtraSpaceComplexity 1
   * @InPlace Yes
   * @Stability Yes
   */
  private insertSort2(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
      let idx = i;
      const curr = array[idx];
      while (idx > 0 && array[idx - 1] > curr) {
        array[idx] = array[idx - 1];
        idx--;
      }
      array[idx] = curr;
    }

    return array;
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

      const temp = array[end];
      array[end] = array[idxOfMax];
      array[idxOfMax] = temp;

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
          const temp = array[begin];
          array[begin] = array[begin - 1];
          array[begin - 1] = temp;

          pointerAtSorted = begin;

          // ---------only for statistics------
          swapCnt += 1;
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

  protected heap(array: number[]): SortResult {
    let loopCnt = 0;
    let compCnt = 0;
    let swapCnt = 0;
    let size = array.length;

    // build in-place max heap
    function shiftDown(index: number) {
      const value = array[index]; // target value

      while (index < Math.floor(size / 2)) { // has child
        loopCnt += 1;
        compCnt += 3; // approximate

        // It must have left node if having child
        let leftIndex = 2 * index + 1;
        let leftValue = array[leftIndex];

        let rightIndex = leftIndex + 1;
        let rightValue = array[rightIndex];

        // in case the right node is valid and it's large than the left
        // so the right won, and we should take it's index and corresponding value instead
        if (2 * index + 2 <= size - 1 && rightValue >= leftValue) {
          leftIndex = rightIndex;
          leftValue = rightValue;
        }

        // if the larger value is also less then the target value,
        // which shows that max heap is ready
        if (leftValue < value) break;

        array[index] = leftValue;
        index = leftIndex;
      }

      array[index] = value;
    }

    for (let i = size >> 1; i >= 0; i--) {
      shiftDown(i);
      loopCnt += 1;
    }

    while (size > 1) {
      const temp = array[0];
      array[0] = array[size - 1];
      array[size - 1] = temp;

      size -= 1;

      // ----------------------------------------------------------------
      loopCnt += 1;
      swapCnt += 1;

      shiftDown(0);
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
