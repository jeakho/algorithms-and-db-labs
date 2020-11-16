import { LinkedList } from "./linkedList";

export class Queue<T = any> {
    linkedList: LinkedList<T>;

    constructor(...values: T[]) {
        this.linkedList = new LinkedList<T>(...values);
    }

    get first(): T | undefined {
        return this.linkedList.get(0);
    }

    get length(): number {
        return this.linkedList.length;
    }

    enqueue(...values: T[]): void {
        values.forEach(val => this.linkedList.addToTail(val));
    }

    dequeue(): T | undefined {
        if (!this.length) return;

        return this.linkedList.removeFromHead();
    }

    isEmpty(): boolean {
        return this.linkedList.isEmpty();
    }

    find(predicate: (value: T, index: number) => boolean, thisArg?: any): T | undefined {
        return this.linkedList.find(predicate, thisArg);
    }

    swap(ind1: number, ind2: number): void {
        this.linkedList.swap(ind1, ind2);
    }

    reverse(): void {
        this.linkedList.reverse();
    }

    includes(el: T): boolean {
        return this.linkedList.includes(el);
    }

    print() {
        this.linkedList.print();
    }
}