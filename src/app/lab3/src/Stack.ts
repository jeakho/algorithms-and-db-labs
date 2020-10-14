export class Stack<T = number> {
    private stack: Array<T> = [];

    constructor(...values: T[]) {
        this.stack.push(...values);
    }

    get top(): T | undefined {
        return this.stack[this.stack.length - 1];
    }

    get length(): number {
        return this.stack.length;
    }

    push(...values: T[]): Stack<T> {
        this.stack.push(...values);

        return this;
    }

    pop(): T | undefined {
        return this.stack.pop();
    }

    switchElements(ind1: number, ind2: number): void {
        if (ind1 < 0 || ind1 >= this.length || ind2 < 0 || ind2 >= this.length) throw new RangeError("Index is out of range!");

        [this.stack[ind1], this.stack[ind2]] = [this.stack[ind2], this.stack[ind1]];
    }

    reverse(): Stack<T> {
        this.stack.reverse();

        return this;
    }

    clear(): void {
        this.stack.length = 0;
    }

    includes(el: T): boolean {
        return this.stack.includes(el);
    }

    print(): void {
        console.log(JSON.stringify(this.stack, null, 2));
    }

    [Symbol.iterator]() {
        let start = 0;
        let end = this.length;
        const ctx = this;

        return {
            next() {
                if (start < end) {
                    return {
                        done: false,
                        value: ctx.stack[start++]
                    }
                } else {
                    return { done: true }
                }
            }
        }
    }
}