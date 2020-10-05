import CircleLinkedList from "./circle-linked-list/CircleLinkedList";

export class Task2 {
    private warriors: CircleLinkedList<number>;

    constructor(
        private secondArmyWarriorsQuantity: number,
        private killingOrder: number
    ) {
        this.warriors = new CircleLinkedList<number>(...new Array(secondArmyWarriorsQuantity).fill(0).map((el, ind) => ind + 1))
    }

    public findLastWarriorNumber(): number | undefined {
        return this.warriors.getLastAfterCircularDeletion(this.killingOrder);
    }
}