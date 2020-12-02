export class TreeNode<T> {
    data: T;
    height: number;
    parent: TreeNode<T> | null;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(
        data: T,
        height: number,
        parent?: TreeNode<T>,
        left?: TreeNode<T>,
        right?: TreeNode<T>
    ) {
        this.data = data;
        this.height = height;
        this.parent = parent || null;
        this.left = left || null;
        this.right = right || null;
    }
}