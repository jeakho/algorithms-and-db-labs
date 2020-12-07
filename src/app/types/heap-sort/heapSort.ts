export class HeapSort {
    private _arr: number[] = [];
    private _size: number = 0;

    sort(arr: number[]): number[] {
        this._arr = arr;
        this._size = this._arr.length;
        this._buildHeap();

        while (this._size > 0) {
            this._swap(1, this._size)
            this._size--;
            this._siftDown(1);
        }
        return this._arr
    }

    private _buildHeap(): void {
        for (let i = Math.trunc(this._size / 2); i > 0; i--) {
            this._siftDown(i)
        }
    }

    private _siftDown(pos: number): void {
        const leftChildNumber = this._getLeftChildNumber(pos),
            rightChildNumber = this._getRightChildNumber(pos);
        
        let maxNumber = pos;

        if (this._arr[leftChildNumber - 1] > this._arr[maxNumber - 1] && leftChildNumber <= this._size) {
            maxNumber = leftChildNumber;
        }

        if (this._arr[rightChildNumber - 1] > this._arr[maxNumber - 1] && rightChildNumber <= this._size) {
            maxNumber = rightChildNumber;
        }

        if (maxNumber !== pos) {
            this._swap(pos, maxNumber)
            this._siftDown(maxNumber)
        }
    }

    private _getLeftChildNumber(pos: number) {
        return pos * 2
    }

    private _getRightChildNumber(pos: number) {
        return pos * 2 + 1
    }

    private _getParentNumber(pos: number) {
        return Math.trunc(pos / 2)
    }

    private _swap(pos1: number, pos2: number) {
        [this._arr[pos1 - 1], this._arr[pos2 - 1]] = [this._arr[pos2 - 1], this._arr[pos1 - 1]]
    }
}