import { Queue } from './queue/queue';
import { TreeNode } from './treeNode';

export abstract class BinaryTree<T> {
    size: number = 0;
    protected root: TreeNode<T> | null = null;


    constructor(...items: T[]) { }

    abstract insert(...items: T[]): void;
    abstract remove(item: T): void;
    abstract find(item: T): T | undefined;
    abstract findNode(item: T): TreeNode<T> | null;
    abstract clear(): void
    
    // findPreorder(item: T): T | undefined {
    //     for (let cur of this.preorderTraversalIterator()) {
    //         if (cur === item) return cur;
    //     }
    // }

    // findPostorder(item: T): T | undefined {
    //     for (let cur of this.postorderTraversalIterator()) {
    //         if (cur === item) return cur;
    //     }
    // }

    // findPathLengthPreorder(item: T): number {
    //     let i = 1;
    //     for (let cur of this.preorderTraversalIterator()) {
    //         if (cur === item) return i;
    //         i++;
    //     }

    //     return Infinity;
    // }

    // findPathLengthPostorder(item: T): number {
    //     let i = 1;
    //     for (let cur of this.postorderTraversalIterator()) {
    //         if (cur === item) return i;
    //         i++;
    //     }

    //     return Infinity;
    // }

    // print(): void {
    //     const queue = this.root ? new Queue<TreeNode<T> | null>(this.root) : new Queue<TreeNode<T> | null>();
    //     const arrayRepresentation: (T | undefined)[] = [];
    //     let counter = 0;

    //     while(counter < this.size) {
    //         const first = queue.dequeue() as TreeNode<T> | null;

    //         if (first) counter++;
    //         arrayRepresentation.push(first?.data);

    //         if(first) {
    //             queue.enqueue(first.left);
    //             queue.enqueue(first.right);
    //         }
    //     }

    //     console.log(JSON.stringify(arrayRepresentation));
    // }

    preorderTraversalIterator() {
        const stack: TreeNode<T>[] = this.root ? [this.root] : [];

        return {
            [Symbol.iterator]() {
                return {
                    next() {
                        const cur = stack.pop();

                        if (cur?.right) stack.push(cur.right);
                        if (cur?.left) stack.push(cur.left);

                        return {
                            value: cur?.data,
                            done: cur == undefined
                        }
                    }
                }
            }
        }
    }

    postorderTraversalIterator() {
        const ctx = this;
        const stack: TreeNode<T>[] = [];
        let cur: TreeNode<T> | null = ctx.root, top = -1, last: TreeNode<T> | undefined;

        return {
            [Symbol.iterator]() {
                return {
                    next() {
                        while (cur) {
                            stack.push(cur);
                            top++;
        
                            if (cur.left) cur = cur.left;
                            else cur = cur.right;
                        }
        
                        last = stack.pop();
                        top--;
        
                        if (stack.length && last !== stack[top].right) cur = stack[top].right;
        
                        return {
                            value: last?.data,
                            done: last == undefined
                        }
                    }
                }
            }
        }
    }

    levelOrderNodesTraversalIterator() {
        const queue = this.root ? new Queue<TreeNode<T>>(this.root) : new Queue<TreeNode<T>>();

        return {
            [Symbol.iterator]() {
                return {
                    next() {
                        const next: TreeNode<T> | undefined = queue.dequeue();

                        if (next?.left) queue.enqueue(next.left);          
                        if (next?.right) queue.enqueue(next.right);

                        return {
                            value: next,
                            done: queue.isEmpty() && !next
                        }
                    }
                }
            }
        }
    }
}