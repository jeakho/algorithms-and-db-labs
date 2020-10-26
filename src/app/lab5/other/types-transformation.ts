export function convertInt(x: any): number {
    const s = String(x);
    
    if (/[^\d-\.]/g.test(s)) return NaN;

    return parseInt(s);
}