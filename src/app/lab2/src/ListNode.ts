import { IListNode } from './LinkedList'

export class ListNode<T = any> implements IListNode<T> {
    public data: T | undefined;
    public next: ListNode<T> | null;

    constructor(data?: T, next?: ListNode<T> | null) {
        this.data = (data === null) ? undefined : data;
        this.next = (next === undefined) ? null : next;
    }
}