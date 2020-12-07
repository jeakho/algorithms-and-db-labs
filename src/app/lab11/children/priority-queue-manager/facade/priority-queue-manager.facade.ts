import { PriorityQueueWrapper } from '@/app/services/priority-queue-wrapper.service';
import { INotifyChanges } from '@/app/types/ICangesNotifications';
import { PriorityQueueChangesType } from '@/app/types/priority-queue/changesType';
import { IPriorityQueue } from '@/app/types/priority-queue/IPriorityQueue';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class PriorityQueueManagerFacade implements INotifyChanges, IPriorityQueue {
  changes: EventEmitter<{ type: PriorityQueueChangesType }>

  constructor(private pqw: PriorityQueueWrapper) {
    this.changes = new EventEmitter;

    pqw.changes.subscribe(this.changeHandler.bind(this));
  }

  getHeap(): number[] {
    return this.pqw.getEntries();
  }

  insert(element: number): void {
    this.pqw.insert(element);
  }

  extractMax(): number | undefined {
    return this.pqw.extractMax();
  }

  remove(element: number): number | undefined {
    return this.pqw.remove(element);
  }

  find(element: number): number | undefined {
    return this.pqw.find(element);
  }

  clear() {
    this.pqw.clear();
  }

  private changeHandler({ type }: { type: PriorityQueueChangesType }) {
    this.changes.emit({ type });
  }
}
