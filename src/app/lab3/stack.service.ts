import { Injectable } from '@angular/core';
import { Stack } from './src/Stack'

@Injectable()
export class StackService<T = number> {
  private stack: Stack<T>

  constructor() {
    this.stack = new Stack();
  }

  get top(): T | undefined {
    return this.stack.top
  }

  get length(): number {
    return this.stack.length;
  }

  push(...values: T[]): void {
    this.stack.push(...values);
  }

  pop(): T | undefined {
    return this.stack.pop()
  }

  switchElements(ind1: number, ind2: number): void {
    this.stack.switchElements(ind1, ind2);
  }

  reverse(): void {
      this.stack.reverse();
  }

  clear(): void {
    this.stack.clear();
  }

  includes(el: T): boolean {
    return this.stack.includes(el);
  }

  print(): void {
    console.log(JSON.stringify(this.stack, null, 2));
  }

  getValues() {
    return [...this.stack];
  }
}
