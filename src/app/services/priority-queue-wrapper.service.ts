import { EventEmitter, Injectable } from '@angular/core';
import { INotifyChanges } from '../types/ICangesNotifications';
import { PriorityQueueChangesType } from '../types/priority-queue/changesType';
import { IPriorityQueue } from '../types/priority-queue/IPriorityQueue';
import { PriorityQueue } from '../types/priority-queue/priorityQueue';

@Injectable({
  providedIn: 'root'
})
export class PriorityQueueWrapper implements INotifyChanges, IPriorityQueue {
  changes: EventEmitter<{ type: PriorityQueueChangesType, value: PriorityQueue }>;
  priorityQueue: PriorityQueue

  constructor() {
    this.changes = new EventEmitter;
    this.priorityQueue = new PriorityQueue(10, 6, 2, 15, 20);
  }

  getEntries() {
    return this.priorityQueue.entries();
  }

  insert(element: number) {
    this.priorityQueue.insert(element);

    this.changes.emit({
      type: PriorityQueueChangesType.INSERT,
      value: this.priorityQueue
    });
  }

  extractMax(): number | undefined {
    const max = this.priorityQueue.extractMax();

    this.changes.emit({
      type: PriorityQueueChangesType.REMOVE,
      value: this.priorityQueue
    });

    return max;
  }

  remove(element: number): number | undefined {
    const el = this.priorityQueue.remove(element);

    this.changes.emit({
      type: PriorityQueueChangesType.REMOVE,
      value: this.priorityQueue
    });

    return el;
  }

  find(element: number): number | undefined {
    const el = this.priorityQueue.find(element);

    this.changes.emit({
      type: PriorityQueueChangesType.FIND,
      value: this.priorityQueue
    });

    return el;
  }

  clear() {
    this.priorityQueue.clear();

    this.changes.emit({
      type: PriorityQueueChangesType.CLEAR,
      value: this.priorityQueue
    });
  }
}
