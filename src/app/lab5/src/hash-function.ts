const DIVISION_M = 1031;

const MULTIPLICATION_A = 2654435769;
const MULTIPLICATION_W = 32;
const MULTIPLICATION_K = 10;

const STRING_KEYS_SHIFT = 7;
const STRING_KEYS_MASK = (-1 >>> 0) << (32 - STRING_KEYS_SHIFT);

export function hashDivision(x: number): number {
    return (x >>> 0) % DIVISION_M;
}

export function hashMultiplication(x: number): number {
    return (x * MULTIPLICATION_A) >>> (MULTIPLICATION_W - MULTIPLICATION_K);
}

export function hashString(s: string): number {
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        result = (result & STRING_KEYS_MASK) ^ (result << STRING_KEYS_SHIFT) ^ s.charCodeAt(i);
    }

    return result >>> 0;
}