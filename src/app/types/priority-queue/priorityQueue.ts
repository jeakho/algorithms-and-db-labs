import { IPriorityQueue } from './IPriorityQueue';

export class PriorityQueue implements IPriorityQueue {
    private _elements: number[];

    constructor(...values: number[]) {
        this._elements = [];

        values.forEach(value => this.insert(value));
    }

    get size() {
        return this._elements.length
    }

    entries() {
        return this._elements;
    }

    insert(element: number): void {
        this._elements.push(element);
        this._siftUp(this.size);
    }

    extractMax(): number | undefined {
        const replaceByElement = this._elements.pop();

        if (!replaceByElement) throw new Error("The queue is empty!");
        if (!this.size) return replaceByElement;

        const element = this._elements[0];
        this._elements[0] = replaceByElement as number;
        this._siftDown(1);

        return element;
    }

    remove(element: number): number | undefined {
        const num = this._findNum(element);

        if (!num) throw new Error(`An element ${element} is not in the queue!`);

        this._elements[num - 1] = Infinity;
        this._siftUp(num);
        this.extractMax();

        return element;
    }

    find(element: number): number | undefined {
        const num = this._findNum(element);

        return num ? this._elements[num - 1] : undefined;
    }

    clear() {
        this._elements = [];
    }

    private _findNum(element: number): number | undefined {
        return this._elements.findIndex(el => el === element) + 1 || undefined;
    }

    private _siftUp(pos: number): void {
        while (pos > 1) {
            if (this._elements[pos - 1] > this._elements[this._parentNum(pos) - 1]) this._swap(pos, this._parentNum(pos));
            pos = this._parentNum(pos);
        }
    }

    private _siftDown(pos: number) {
        const leftChildNumber = this._leftNum(pos),
            rightChildNumber = this._rightNum(pos);
        
        let maxNumber = pos;

        if (this._elements[leftChildNumber - 1] > this._elements[maxNumber - 1] && leftChildNumber <= this.size) {
            maxNumber = leftChildNumber;
        }

        if (this._elements[rightChildNumber - 1] > this._elements[maxNumber - 1] && rightChildNumber <= this.size) {
            maxNumber = rightChildNumber;
        }

        if (maxNumber !== pos) {
            this._swap(pos, maxNumber)
            this._siftDown(maxNumber)
        }
    }

    private _leftNum(pos: number) {
        return pos * 2;
    }

    private _rightNum(pos: number) {
        return pos * 2 + 1;
    }

    private _parentNum(pos: number) {
        return Math.trunc(pos / 2);
    }

    private _swap(num1: number, num2: number) {
        [this._elements[num1 - 1], this._elements[num2 - 1]] = [this._elements[num2 - 1], this._elements[num1 - 1]]
    }
}