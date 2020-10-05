import { ILinkedList, IListNode } from '../LinkedList'
import { ListNode } from '../ListNode'

export default class CircleLinkedList<T> implements ILinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    public cycleLength: number;
    public removeFromHead: () => T | undefined;
    public addToHead: (data: T) => CircleLinkedList<T>;
    
    constructor(...values: T[]) {
        this.head = null;
        this.tail = null;
        this.cycleLength = 0;

        this.removeFromHead = this.removeAtIndex.bind(this, 0);
        this.addToHead = this.insertAtIndex.bind(this, 0);

        values.filter(el => el != undefined).reverse().forEach(el => { this.addToHead(el) });
    }

    public insertAtIndex(index: number, data: T): CircleLinkedList<T> {
        if (index > this.cycleLength) throw new RangeError("Index is out of range!");

        const newNode = new ListNode<T>(data);
        let prevNode = this.getNode(index - 1);

        if (prevNode) prevNode.next = newNode;
        if (!index) {
            newNode.next = this.head;
            this.head = newNode;            
        }
        if (index == this.cycleLength) this.tail = newNode;
        if (this.tail) this.tail.next = this.head;

        this.cycleLength++;

        return this;
    }

    public removeAtIndex(index: number): T | undefined {
        if (!this.cycleLength) throw new Error("The list is empty!");
        if (index >= this.cycleLength || index < 0) throw new RangeError("Index is out of range!");

        let prevNode = this.getNode(index - 1);
        let listNode: ListNode<T> = prevNode?.next || this.head as ListNode<T>;

        if (prevNode) prevNode.next = listNode.next;
        else this.head = listNode.next;

        this.cycleLength--;

        return listNode.data;
    }

    public addToTail(data: T): CircleLinkedList<T> {
        return this.insertAtIndex(this.cycleLength, data)
    }

    public removeFromTail(): T | undefined {
        return this.removeAtIndex(this.cycleLength - 1);
    }

    public get(ind: number): T {
        if (ind < 0 || ind >= this.cycleLength) throw new RangeError("Index is out of range!");

        return this.getNode(ind)?.data as T;
    }

    public getLastAfterCircularDeletion(n: number): T | undefined {
        if (!this.cycleLength) return;

        const indexCache: { [x: number]: boolean, length: number } = { length: 0 };

        let nextInd = -1;
        while (indexCache.length < this.cycleLength) {
            let count = 1;
            while (count <= n) {
                while (Object.prototype.hasOwnProperty.call(indexCache, (nextInd = ++nextInd >= this.cycleLength ? 0 : nextInd))) { }
                count++;
            }

            indexCache[nextInd] = true;
            indexCache.length++;
        }

        return this.get(nextInd);
    }

    public print(): void {
        let cycle = 1;
        console.log(
            JSON.stringify(this.head, (key, value) => {
                return value === this.head ? cycle-- ? this.head : 'HEAD' : value;
            }, 2)
        )
    }

    private getNode(ind: number): IListNode<T> | null {
        if (ind < 0) return null;

        let cur: ListNode<T> | null = null;

        for (let i = 0; i <= this.cycleLength; i++) {
            cur = cur ? cur.next : this.head;

            if (i == ind || i == this.cycleLength) return cur;
        }

        return cur;
    }
}