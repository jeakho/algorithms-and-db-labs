export interface ILinkedList<T> {
    insertAtIndex: (index: number, data: T) => ILinkedList<T>;
    removeAtIndex: (index: number) => T | undefined;
    addToHead: (data: T) => ILinkedList<T>;
    addToTail: (data: T) => ILinkedList<T>;
    removeFromHead: () => T | undefined;
    removeFromTail: () => T | undefined;
    get: (ind: number) => T;
    print?: () => void
}

export interface IListNode<T> {
    data: T | undefined;
    next: IListNode<T> | null;
}