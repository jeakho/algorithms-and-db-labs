import { TreeNode } from './treeNode';

export interface IBinaryTree<T> {
    isEmpty(): boolean;
    insert(...items: T[]): void;
    remove(item: T): void;
    find(item: T): T | undefined;
    //findNode(item: T): TreeNode<T> | null;
    clear(): void;
    // preorderTraversalIterator(): { [Symbol.iterator](): Iterator<T> };
    // postorderTraversalIterator(): { [Symbol.iterator](): Iterator<T> };
    // levelOrderNodesTraversalIterator(): { [Symbol.iterator](): Iterator<TreeNode<T>> };
}