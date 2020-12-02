import { BinarySearchTree } from "./binarySearchTree";
import { TreeNode } from "./treeNode";

export class AVLTree extends BinarySearchTree {
    constructor(...items: number[]) {
        super(...items);
    }

    insert(item: number): AVLTree {
        super.insert(item);

        const newNode = this.findNode(item) as TreeNode<number>;
        this.updateHeights(newNode);
        this.balance(newNode);

        return this;
    }

    remove(item: number): AVLTree {
        const toReplaceNode = this.findNode(item);

        const replaceByNode = toReplaceNode?.right ? this.nextNode(toReplaceNode) : null;
        const balancingStartNode = replaceByNode
            ? replaceByNode.parent === toReplaceNode
                ? replaceByNode
            : replaceByNode.parent
        : toReplaceNode?.parent;

        super.remove(item);

        if (balancingStartNode) {
            this.updateHeights(balancingStartNode);
            this.balance(balancingStartNode);
        }

        return this;
    }

    private balance(node: TreeNode<number> | null) {
        if (!node) return;

        const parent = node.parent;

        if ((node.left?.height || 0) === (node.right?.height || 0) + 2) this.balanceRight(node), this.updateHeights(node);
        if ((node.right?.height || 0) === (node.left?.height || 0) + 2) this.balanceLeft(node), this.updateHeights(node);

        if (parent) this.balance(parent);
    }

    private updateHeights(node: TreeNode<number>) {
        node.height = Math.max(node.left?.height || 0, node.right?.height || 0) + 1;

        if (node.parent) this.updateHeights(node.parent);
    }

    private balanceRight(node: TreeNode<number>) {
        if ((node.left?.right?.height || 0) === (node.left?.left?.height || 0) + 1) {
            this.balanceLeft(node.left as TreeNode<number>);
        }

        this.rotateRight(node);

        node.height = Math.max(node.left?.height || 0, node.right?.height || 0) + 1;
        (node.parent as TreeNode<number>).height = Math.max(node.parent?.left?.height || 0, node.parent?.right?.height || 0);
    }

    private balanceLeft(node: TreeNode<number>) {
        if ((node.right?.left?.height || 0) === (node.right?.right?.height || 0) + 1) {
            this.balanceRight(node.right as TreeNode<number>);
        }

        this.rotateLeft(node);

        node.height = Math.max(node.left?.height || 0, node.right?.height || 0) + 1;
        (node.parent as TreeNode<number>).height = Math.max(node.parent?.left?.height || 0, node.parent?.right?.height || 0);
    }

    private rotateRight(node: TreeNode<number>) {
        if (!node.left) return;

        if (node.parent?.left === node) node.parent.left = node.left;
        else if (node.parent) node.parent.right = node.left;
        else this.root = node.left;

        [node.left.parent, node.parent, node.left.right, node.left] = [node.parent, node.left, node, node.left.right];
        if (node.left) node.left.parent = node;
    }

    private rotateLeft(node: TreeNode<number>) {
        if (!node.right) return;

        if (node.parent?.left === node) node.parent.left = node.right;
        else if (node.parent) node.parent.right = node.right;
        else this.root = node.right;

        [node.right.parent, node.parent, node.right.left, node.right] = [node.parent, node.right, node, node.right.left];
        if (node.right) node.right.parent = node;
    }
}