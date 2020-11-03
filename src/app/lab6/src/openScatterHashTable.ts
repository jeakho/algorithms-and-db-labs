import { HashTable } from "./hashTable";
import { Record } from './types/record'
import { OpenScatterTableEntry as Entry } from './types/openScatterTableEntry'
import { compact } from 'lodash'

export class OpenScatterHashTable<T> extends HashTable<T> {
    table: Entry<Record<T>>[];

    constructor(length: number) {
        super(length);

        this.table = Array(length);
        this.buildEntries();
    }

    private buildEntries() {
        for (let i = 0; i < this.table.length; i++) this.table[i] = new Entry();
    }

    private c(i: number): number {
        return i;
    }

    private findRecordIndex(key: string): number | undefined {
        const hash = this.hash(key);

        let probe: number;
        for (let i = 0; i < this.cardinality; i++) {
            probe = (hash + this.c(i)) % this.cardinality;

            if (this.table[probe].state === "empty") return;
            if (this.table[probe].data?.[0] === key) return probe;
        }
    }

    private findUnoccupied(key: string): number {
        const hash = this.hash(key);

        let probe: number;
        for (let i = 0; i < this.cardinality; i++) {
            probe = (hash + this.c(i)) % this.cardinality;

            if(this.table[probe].state !== "occupied") return probe;
        }

        return -1;
    }

    public insert(key: string, value: T): void {
        if (this.fillFactor > 0.85) {
            this.resizeTwice();
        }

        const unoccupiedPos = this.findUnoccupied(key);

        if (unoccupiedPos === -1) throw new Error("The table is full!");

        this.table[unoccupiedPos].data = [key, value];
        this.table[unoccupiedPos].state = "occupied";
        this.recordsAmount++;
    }

    public remove(key: string): T | undefined {
        const recordInd = this.findRecordIndex(key);

        if (recordInd === undefined) return;

        this.table[recordInd].state = "deleted";
        this.table[recordInd].data = undefined;
        this.recordsAmount--;
    }

    public find(key: string): T | undefined {
        const recordInd = this.findRecordIndex(key);

        if (recordInd === undefined) return;

        return this.table[recordInd].data?.[1];
    }

    public records(): Record<T>[] {
        return compact(this.table.map(entry => entry.data));
    }

    public entries(): [number, Array<Record<T>>][] {
        return this.table.map((entry, ind) => [ind, compact([entry.data])]);
    }

    public print(): void {
        console.log(
            JSON.stringify(
                this.table.map(entry => entry.data),
                null,
                2
            )
        )
    }

    public clear(): void {
        this.buildEntries();
        this.recordsAmount = 0;
    }

    private resizeTwice(): void {
        const records = this.records();

        this.table = Array(this.cardinality *= 2);
        this.recordsAmount = 0;
        this.buildEntries();

        records.forEach(record => this.insert(record[0], record[1]));
    }
}