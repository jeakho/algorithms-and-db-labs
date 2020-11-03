import { Record } from './types/record'

export abstract class HashTable<T = any> {
    protected cardinality: number;
    protected recordsAmount = 0;

    protected get fillFactor(): number {
        return +(this.recordsAmount / this.cardinality).toFixed(2);
    }

    constructor(cardinality: number) {
        this.cardinality = cardinality;
    }

    private getHashCode(key: string): number {
        let result = 0;
        const shift = 6;
        const mask = (-1 >>> 0) << (32 - shift);

        for (let i = 0; i < key.length; i++) {
            result = (result & mask) ^ (result << shift) ^ key.charCodeAt(i);
        }
    
        return result >>> 0;
    }

    private adaptToCardinality(hashedKey: number): number {
        return hashedKey % this.cardinality;
    }

    protected hash(key: string) {
        return this.adaptToCardinality(this.getHashCode(key));
    }

    public abstract insert(key: string, value: T): void;
    public abstract remove(key: string): T | undefined;
    public abstract find(key: string): T | undefined;
    public abstract records(): Record<T>[];
    public abstract entries(): [number, Array<Record<T>>][]
    public abstract clear(): void;
    public abstract print(): void;
}