import { Injectable } from '@angular/core';
import { Queue } from '../../src/Queue';

@Injectable()
export class QueueService<T = number> {
  queue: Queue<T> = new Queue<T>();

  get queueFirst(): T | undefined {
    return this.queue.first;
  }

  get queueLength(): number {
    return this.queue.length;
  }

  addToQueue(...values: T[]): void {
    this.queue.enqueue(...values);
  }

  removeFromQueue(): T | undefined {
    return this.queue.dequeue();
  }

  isQueueEmpty(): boolean {
    return this.queue.isEmpty();
  }

  findInQueue(predicate: (value: T, index: number) => boolean, thisArg?: any): T | undefined {
    return this.queue.find(predicate, thisArg);
  }

  swapQueueItems(ind1: number, ind2: number): void {
    this.queue.swap(ind1, ind2);
  }

  reverseQueue(): void {
    this.queue.reverse();
  }

  isItemIncludedInQueue(el: T): boolean {
    return this.queue.includes(el);
  }

  clearQueue(): void {
    this.queue.clear();
  }

  getQueueItems(): T[] {
    return [...this.queue];
  }
}
