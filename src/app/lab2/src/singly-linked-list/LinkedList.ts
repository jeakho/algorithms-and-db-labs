import { ILinkedList, IListNode } from '../LinkedList'
import { ListNode } from '../ListNode'

import { uniq } from 'lodash'

export enum SORTING_ORDER { ASCENDING = 0, DESCENDING = 1 }

export class LinkedList<T = any> implements ILinkedList<T> {
    protected head: ListNode<T> | null;
    public length: number;
    public removeFromHead: () => T | undefined;
    //3
    public addToHead: (data: T) => LinkedList<T>;

    constructor(...values: T[]) {
        this.head = null;
        this.length = 0;

        this.removeFromHead = this.removeAtIndex.bind(this, 0);
        this.addToHead = this.insertAtIndex.bind(this, 0);

        values.filter(el => el != undefined).reverse().forEach(el => { this.addToHead(el) });
    }

    public static makeList<U>(...values: U[]): IListNode<U> | null {
        return new LinkedList(...values).getRoot();
    }

    //6
    public insertAtIndex(index: number, data: T): LinkedList<T> {
        if (index > this.length) throw new RangeError("Index is out of range!");

        const newNode = new ListNode<T>(data);
        let prevNode = this.getNode(index - 1);

        newNode.next = prevNode ? prevNode.next : this.head;
        if (prevNode) prevNode.next = newNode;
        if (!index) this.head = newNode;

        this.length++;

        return this;
    }

    //5
    public removeAtIndex(index: number): T | undefined {
        if (!this.length) throw new Error("The list is empty!");
        if (index >= this.length || index < 0) throw new RangeError("Index is out of range!");

        let prevNode = this.getNode(index - 1);
        let listNode: ListNode<T> = prevNode?.next || this.head as ListNode<T>;

        if (prevNode) prevNode.next = listNode.next;
        else this.head = listNode.next;

        this.length--;

        return listNode.data;
    }

    public addToTail(data: T): LinkedList<T> {
        return this.insertAtIndex(this.length, data)
    }

    public removeFromTail(): T | undefined {
        return this.removeAtIndex(this.length - 1);
    }

    public get(ind: number): T {
        if (ind < 0 || ind >= this.length) throw new RangeError("Index is out of range!");

        return this.getNode(ind)?.data as T;
    }

    //1
    public move(ind: number, pos: number): LinkedList<T> {
        if (ind >= this.length || ind < 0) throw new RangeError("Index is out of range!");
        if (!this.length || this.length == 1) return this;

        const insertionPosWithShift = pos + ind;
        this.insertAtIndex(insertionPosWithShift - Math.floor(insertionPosWithShift / this.length) * this.length, this.removeAtIndex(ind) as T);

        return this;
    }

    //2
    public cloneDeep(): LinkedList<T> {
        return new LinkedList<T>(...[...this] as T[]);
    }

    //4
    public attachList(linkedList: LinkedList<T>): LinkedList<T> {
        let last = this.getNode(this.length - 1);

        if (last) last.next = linkedList.getRoot();
        else this.head = linkedList.getRoot();

        this.length += linkedList.length;

        return this;
    }

    //7
    public intersectLists(linkedList: LinkedList<T>): LinkedList<T> {
        const currentListEntries = [...this];
        const newListEntries = [...linkedList];

        const intersectionProductList = new LinkedList(...uniq(currentListEntries).filter(el => newListEntries.includes(el)));

        this.head = intersectionProductList.getRoot();
        this.length = intersectionProductList.length;

        return this;
    }

    /**
     * 8
     * algorithm: QuickSort 
     */
    public sort(sortingOrder: SORTING_ORDER): LinkedList<T> {
        function quickSort(arr: T[], low: number, high: number): T[] {
            if (high - low < 1) return arr;

            const baseIndex = partition(arr, low, high);
            quickSort(arr, low, baseIndex - 1);
            quickSort(arr, baseIndex + 1, high);
    
            return arr;
        }

        function partitionASC(arr: T[], low: number, high: number): number {
            if (low >= high) return 0;

            let leftB = low, rightB = high;
            let baseInd = leftB;
    
            while (leftB < rightB) {
                if (baseInd == rightB) {
                    while (arr[leftB] < arr[baseInd] && leftB < rightB) leftB++;
                
                    [arr[leftB], arr[rightB]] = [arr[rightB], arr[leftB]];
                    baseInd = leftB;
                    rightB--;
    
                    continue;
                }
    
                while (arr[baseInd] < arr[rightB] && leftB < rightB) rightB--;
    
                [arr[leftB], arr[rightB]] = [arr[rightB], arr[leftB]];
                baseInd = rightB;
                leftB++;
            }
    
            return baseInd;
        }

        function partitionDESC(arr: T[], low: number, high: number): number {
            if (low >= high) return 0;

            let leftB = low, rightB = high;
            let baseInd = leftB;
    
            while (leftB < rightB) {
                if (baseInd == rightB) {
                    while (arr[leftB] > arr[baseInd] && leftB < rightB) leftB++;
                
                    [arr[leftB], arr[rightB]] = [arr[rightB], arr[leftB]];
                    baseInd = leftB;
                    rightB--;
    
                    continue;
                }
    
                while (arr[baseInd] > arr[rightB] && leftB < rightB) rightB--;
    
                [arr[leftB], arr[rightB]] = [arr[rightB], arr[leftB]];
                baseInd = rightB;
                leftB++;
            }
    
            return baseInd;
        }

        const arrOfNodeValues: T[] = [...this] as T[];
        const partition = sortingOrder === SORTING_ORDER.ASCENDING ? partitionASC : partitionDESC;
        this.head = LinkedList.makeList<T>(...quickSort(arrOfNodeValues, 0, arrOfNodeValues.length - 1));

        return this;
    }

    //9
    public removeEachN(n: number): void {
        if (n <= 0) throw new RangeError(`Can not delete each ${n} element!`);

        if (n == 1) {
            this.clear();
            return;
        }

        for (let i = n - 1; i < this.length; i += n) {
            this.removeAtIndex(i);
            i--;
        }
    }

    //10
    public clear() {
        this.head = null;
        this.length = 0;
    }

    public getRoot(): IListNode<T> | null {
        return this.head;
    }

    public [Symbol.iterator]() {
        let cur: ListNode<T> | null = null;
        let length = -1;
        const ctx = this;

        return {
            next() {
                cur = cur?.next === undefined ?  ctx.head : cur.next;
                length++;
                if (cur && length < ctx.length) {
                    return {
                        done: false,
                        value: cur.data
                    }
                } else {
                    return { done: true }
                }
            }
        }
    }
    
    protected getNode(ind: number): IListNode<T> | null {
        if (ind < 0) return null;

        let cur: ListNode<T> | null = null;

        for (let i = 0; i <= this.length; i++) {
            cur = cur ? cur.next : this.head;

            if (i == ind || i == this.length) return cur;
        }

        return cur;
    }

    public print(): void {
        console.log(JSON.stringify(this.head, null, 2));
    }
}