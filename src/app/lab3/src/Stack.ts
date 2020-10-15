export class Stack<T = number> {
    private stack: Array<T> = [];

    constructor(...values: T[]) {
        this.push(...values);
    }

    get top(): T | undefined {
        return this.stack[this.stack.length - 1];
    }

    get length(): number {
        return this.stack.length;
    }

    push(...values: T[]): Stack<T> {
        values.forEach((element, ind) => { this.stack[this.length] = element });

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
        if (!this.length) return;

        let leftB = 0, rightB = this.length - 1;
        while (leftB < rightB) [this.stack[leftB], this.stack[rightB]] = [this.stack[rightB], this.stack[leftB]], leftB++, rightB--;

        return this;
    }

    clear(): void {
        this.stack.length = 0;
    }

    includes(el: T): boolean {
        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i] === el) return true;
        }

        return false;
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