import equal from 'deep-equal'

class ListNode<T = any> {
    public data: T | undefined;
    public next: ListNode<T> | null;

    constructor(data?: T, next?: ListNode<T> | null) {
        this.data = (data === null) ? undefined : data;
        this.next = (next === undefined) ? null : next;
    }
}

export class LinkedList<T = any> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    public length: number;
    public removeFromHead: () => T | undefined;
    public addToHead: (data: T) => LinkedList<T>;

    constructor(...values: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        this.removeFromHead = this.removeAtIndex.bind(this, 0);
        this.addToHead = this.insertAtIndex.bind(this, 0);

        values.filter(el => el != undefined).reverse().forEach(el => { this.addToHead(el) });
    }

    public static makeList<U>(...values: U[]): ListNode<U> | null {
        return new LinkedList(...values).getRoot();
    }

    public insertAtIndex(index: number, data: T): LinkedList<T> {
        if (index > this.length) throw new RangeError("Index is out of range!");

        const newNode = new ListNode<T>(data);
        let prevNode = this.getNodeByIndex(index - 1);

        newNode.next = prevNode ? prevNode.next : this.head;
        if (prevNode) prevNode.next = newNode;
        if (!index) this.head = newNode;
        if (index === this.length) this.tail = newNode;

        this.length++;

        return this;
    }

    public removeAtIndex(index: number): T | undefined {
        if (!this.length) throw new Error("The list is empty!");
        if (index >= this.length || index < 0) throw new RangeError("Index is out of range!");

        let prevNode = this.getNodeByIndex(index - 1);
        let listNode: ListNode<T> = prevNode?.next || this.head as ListNode<T>;

        if (prevNode) prevNode.next = listNode.next;
        else this.head = listNode.next;
        if (listNode === this.tail) this.tail = prevNode;

        this.length--;

        return listNode.data;
    }

    public remove(value: T): T | undefined {
        const index = this.getIndex(value);

        return index != -1 ? this.removeAtIndex(index) : undefined;
    }

    public addToTail(data: T): LinkedList<T> {
        return this.insertAtIndex(this.length, data)
    }

    public removeFromTail(): T | undefined {
        return this.removeAtIndex(this.length - 1);
    }

    public get(ind: number): T | undefined {
        return this.getNodeByIndex(ind)?.data;
    }

    public attachList(LinkedList: LinkedList<T>): LinkedList<T> {
        let last = this.getNodeByIndex(this.length - 1);

        if (last) last.next = LinkedList.getRoot();
        else this.head = LinkedList.getRoot();

        return this;
    }

    public clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    public getRoot(): ListNode<T> | null {
        return this.head;
    }

    public isEmpty(): boolean {
        return !this.head;
    }

    public find(predicate: (value: T, index: number) => boolean, thisArg?: any): T | undefined {
        let cur: ListNode<T> | null = this.head;

        for (let i = 0; i < this.length; i++) {
            if (predicate.call(thisArg, cur?.data as T, i)) return cur?.data;
            cur = cur?.next as ListNode<T> | null;
        }
    }

    public includes(el: T): boolean {
        return !!this.find(elem => elem === el);
    }

    public swap(ind1: number, ind2: number) {
        if (ind1 < 0 || ind1 >= this.length) throw new RangeError("First index is out of range!")
        if (ind2 < 0 || ind2 >= this.length) throw new RangeError("Second index is out of range!")

        if (ind2 < ind1) [ind1, ind2] = [ind2, ind1];

        const prev1: { next: any } = this.getNodeByIndex(ind1 - 1) || { next: this.getNodeByIndex(ind1) };
        const prev2: { next: any } = this.getNodeByIndex(ind2 - 1) || { next: this.getNodeByIndex(ind2) };

        const cur1 = prev1.next;
        const cur2 = prev2.next;

        if (this.head === cur1) this.head = cur2;
        if (this.tail === cur2) this.tail = cur1;

        if (cur1 !== prev2) {
            [prev1.next, cur1.next, prev2.next, cur2.next] = [cur2, cur2.next, cur1, cur1.next];
        } else {
            [cur1.next, cur2.next, prev1.next] = [cur2.next, prev2, cur2]
        }
    }

    public reverse(): void {
        if (!this.length) return;

        const arrOfNodes: T[] = [...this] as T[];
        let leftB = 0, rightB = this.length - 1;

        while(leftB < rightB) [arrOfNodes[leftB], arrOfNodes[rightB]] = [arrOfNodes[rightB], arrOfNodes[leftB]], leftB++, rightB--;

        this.head = LinkedList.makeList(...arrOfNodes)
        this.tail = this.getNodeByIndex(this.length - 1);
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

    private getIndex(value: T): number {
        let cur: ListNode<T> | null = null;

        for (let i = 0; i < this.length; i++) {
            cur = cur ? cur.next : this.head;

            if (equal(cur?.data, value, { strict: true })) return i;
        }

        return -1;
    }
    
    private getNodeByIndex(ind: number): ListNode<T> | null {
        if (ind < 0) return null;
        if (ind === this.length) return this.tail;

        let cur: ListNode<T> | null = null;

        for (let i = 0; i <= this.length; i++) {
            cur = cur ? cur.next : this.head;

            if (i === ind || i === this.length) return cur;
        }

        return cur;
    }

    public print(): void {
        console.log(JSON.stringify(this.head, null, 2));
    }
}