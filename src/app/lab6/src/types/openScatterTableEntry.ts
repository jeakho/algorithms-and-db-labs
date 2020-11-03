export class OpenScatterTableEntry<T> {
    state: "empty" | "occupied" | "deleted";
    data: T | undefined;

    constructor() {
        this.state = "empty";
    }
}