import { HashTable } from './hashTable'
import { Record } from './types/record'
import { ChainedTableEntry as Entry } from './types/chainedTableEntry'

export class ChainedHashTable<T> extends HashTable<T> {
    table: Entry<Record<T>>[];

    constructor(length: number) {
        super(length);

        this.table = Array(length);
        this.buildChains();
    }

    private buildChains() {
        for (let i = 0; i < this.table.length; i++) this.table[i] = new Entry();
    }

    public insert(key: string, value: T) {
        const code = this.hash(key);

        if (this.table[code].find(param => param[0] === key)) throw new Error(`An element with key "${key}" already exists!`);

        this.table[code].addToTail([key, value]);
        this.recordsAmount++;

        if (this.fillFactor > 0.85) {
            this.resizeTwice();
        }
    }
    
    public remove(key: string): T | undefined {
        const code = this.hash(key);

        const entry = this.table[code].find(param => param[0] === key);
        if (!entry) return;

        return this.recordsAmount--, (this.table[code].remove(entry) as Record<T>)[1];
    }

    public find(key: string): T | undefined {
        const code = this.hash(key);

        return this.table[code].find(param => param[0] === key)?.[1];
    }

    public records(): Record<T>[] {
        let arr: Record<T>[] = [];

        this.table.forEach(param => { arr = arr.concat([...param] as Record<T>[]) });

        return arr;
    }

    public entries(): [number, Array<Record<T>>][] {
        return this.table.map((entry, ind) => [ind, [...entry]]);
    }

    public print(): void {
        console.log(
            JSON.stringify(
                this.table.map(param => [...param]),
                null,
                2
            )
        )
    }

    public clear(): void {
        this.buildChains();
        this.recordsAmount = 0;
    }

    private resizeTwice() {
        const records = this.records();

        this.table = Array(this.cardinality *= 2);
        this.recordsAmount = 0;
        this.buildChains();

        records.forEach(record => this.insert(record[0], record[1]));
    }
}