import { IStack } from "@Interface/specific";
import { ICompareFunc, valueTypeComparison } from "@Utils/compare";
import { StackFactory } from "@DataStructure/stack-queue";

/**
 * @Requirement Implements a Stack which can return min value under O(1)
 */

export class MinStack<T = number> {

    protected _allDataStack: IStack<T>
    protected _onlyMinStack: IStack<T>

    protected _size: number;

    get size(): number {
        return this._size;
    }

    constructor(private compare: ICompareFunc<T> = valueTypeComparison) {
        this._allDataStack = StackFactory.create<T>();
        this._onlyMinStack = StackFactory.create<T>();
        this._size = 0;
    }

    push(value: T): this {
        this._allDataStack.push(value);

        this._size += 1;

        if (this._onlyMinStack.isEmpty() ||
            this.compare(value).isLessOrEqualTo(this._onlyMinStack.peek)
        ) {
            this._onlyMinStack.push(value);
        }

        return this;
    }

    pop(): T {
        if(this._size === 0) return null;

        const val = this._allDataStack.pop();

        this._size -= 1;

        if (this.compare(val).isEqualTo(this._onlyMinStack.peek)) {
            return this._onlyMinStack.pop();
        }
        return val;
    }

    getMin(): T {
        return this._onlyMinStack.peek || null;
    }
}

/**
 * 使用两个普通栈，一个存放所有数据, 称为StackA，一个存放最小元素, 称为StackB;
 * 当有新的元素即将入栈，与stackB的栈顶元素比较，如果新元素小于或等于stackB栈顶元素，
 * 将新元素同时压入StackA与StackB, 否则仅压入StackA中；
 * 
 * 当有stackA中元素出栈后，记作val, 将其与stackB的栈顶元素比较，
 * 如果两者相同，弹出StackB的栈顶元素，并返回；
 * 否则，返回val; * 
 */