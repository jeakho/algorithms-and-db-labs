import { TreeNode } from './treeNode';
import { BinaryTree } from './binaryTree';
import { cloneDeep } from 'lodash'

export class BinarySearchTree extends BinaryTree<number> {
    root: TreeNode<number> | null = null;
    size: number = 0;

    constructor(...items: number[]) {
        super();
        items.forEach(item => this.insert(item));
    }

    insert(item: number): BinarySearchTree {
        const parent = this.findNode(item);

        if (!parent) {
            this.root = new TreeNode(item);
            this.size++;

            return this;
        }

        if (parent?.data === item) throw new Error(`The node with value ${item} is already in the tree!`);

        const newNode = new TreeNode<number>(item, parent);
        if (item < parent.data) parent.left = newNode;
        else parent.right = newNode;

        this.size++;

        return this;
    }

    remove(item: number): void {
        const curNode = this.findNode(item);

        if (curNode?.data !== item) throw new Error(`The node with value ${item} is not in the tree!`)

        if (!curNode.right) {
            if (curNode.left) this.promote(curNode.left);
            else this.removeSubtree(curNode);

            this.size--;
            return;
        }

        const nextNode = this.nextNode(curNode) as TreeNode<number>
        const nextNodeClone = cloneDeep(nextNode);

        this.replace(curNode, nextNodeClone);

        if (nextNode.right) this.promote(nextNode.right);
        else this.removeSubtree(nextNode);

        this.size--;

        return;
    }

    find(item: number): number | undefined {
        const val = this.findNode(item);

        return val?.data === item ? item : void 0;
    }

    
    findNode(item: number, root = this.root): TreeNode<number> | null {
        if (!root) return root;
        if (item === root?.data) return root;
        if (item < root?.data) {
            if (root.left) return this.findNode(item, root.left);

            return root;
        }
        else { 
            if (root.right) return this.findNode(item, root.right);

            return root;
        }
    }

    clear(): void {
        this.root = null;
        this.size = 0;
    }

    private replace(source: TreeNode<number>, target: TreeNode<number>) {
        if (source === source.parent?.left) source.parent.left = target;
        else if (source === source.parent?.right) source.parent.right = target;
        
        [target.parent, target.left, target.right] = [source.parent, source.left, source.right];

        if (target.left) target.left.parent = target;
        if (target.right) target.right.parent = target;

        if (this.root === source) this.root = target;
    }

    private promote(node: TreeNode<number>): void {
        if (!node.parent?.parent) {
            this.root = node;
            this.root.parent = null;
            return;
        }

        const parent = node.parent;

        if (node.parent === parent.parent?.left) parent.parent.left = node;
        else if (node.parent === parent.parent?.right) parent.parent.right = node;

        node.parent = parent.parent;
    }

    private nextNode(node: TreeNode<number>): TreeNode<number> | null {
        if (!node.right) return this.firstRightParent(node);
        
        node = node.right
        while (node.left) {
            node = node.left;
        }

        return node;
    }

    private removeSubtree(node: TreeNode<number>) {
        if (node === node.parent?.left) node.parent.left = null;
        else if (node === node.parent?.right) node.parent.right = null;

        if (!node.parent) this.root = null;
    }

    private firstRightParent(node: TreeNode<number>): TreeNode<number> | null {
        if (node.parent) {
            if (node.parent.right === node) return node.parent;
            else return this.firstRightParent(node.parent);
        } else return null;
    }
}