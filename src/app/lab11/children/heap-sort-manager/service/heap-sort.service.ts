import { HeapSort } from '@/app/types/heap-sort/heapSort';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeapSortService {
  private heapSort: HeapSort

  constructor() {
    this.heapSort = new HeapSort;
  }

  sort(arr: number[]): number[] {
    return this.heapSort.sort(arr);
  }
}
