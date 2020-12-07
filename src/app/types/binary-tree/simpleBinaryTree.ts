import { BinaryTree } from './binaryTree';
import { TreeNode } from './treeNode';

export class SimpleBinaryTree<T> extends BinaryTree<T>{

    constructor(...items: T[]) {
        super(...items);
    }

    insert(item: T) {
        const newTreeNode = new TreeNode<T>(item, 0);

        if (!this.root) {
            this.root = newTreeNode;
            return;
        }

        for (let curNode of this.levelOrderNodesTraversalIterator()) {
            if (curNode && !curNode.left) {
                curNode.left = newTreeNode;
                newTreeNode.parent = curNode;

                return;
            }
            if(curNode && !curNode.right) {
                curNode.right = newTreeNode;
                newTreeNode.parent = curNode;

                return;
            } 
        }
    }

    remove(item: T): T {
        if (!this.findNode(item)) throw new Error(`An item "${item}" doesn't exist in the tree!`);

        let data: T | undefined;
        for (let curNode of this.levelOrderNodesTraversalIterator()) {
            if (curNode?.left?.data === item) {
                if (curNode.left.left === null && curNode.left.right === null) {
                    data = curNode.left.data;

                    curNode.left = null;

                    return data;
                }
            }

            if (curNode?.right?.data === item) {
                if (curNode.right.left === null && curNode.right.right === null) {
                    data = curNode.right.data;

                    curNode.right = null;

                    return data;
                }
            }
        }
        throw Error(`Can not remove item "${item}" as it is not a leaf!`);
    }

    isEmpty() {
        return !this.root;
    }

    find(item: T) {
        for (let cur of this.preorderTraversalIterator()) {
            if (cur === item) return cur;
        }
    }

    findNode(item: T) {
        for (let cur of this.levelOrderNodesTraversalIterator()) {
            if (cur.data === item) return cur;
        }
    }

    clear(): void {
        this.root = null;
    }
}