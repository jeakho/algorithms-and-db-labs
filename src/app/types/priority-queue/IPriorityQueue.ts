export interface IPriorityQueue {
    insert(element: number): void,
    extractMax(): number | undefined,
    remove(element: number): number | undefined,
    find(element: number): number | undefined
}