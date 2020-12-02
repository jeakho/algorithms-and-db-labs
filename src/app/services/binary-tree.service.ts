import { Injectable } from '@angular/core';
import { AVLTree } from '../types/binary-tree/AVLTree';
import { BinarySearchTree } from '../types/binary-tree/binarySearchTree';
import { BinaryTree } from '../types/binary-tree/binaryTree';

@Injectable({
  providedIn: 'root'
})
export class BinaryTreeService {
  binaryTreeClassMap: Map<string, typeof BinarySearchTree | typeof AVLTree>;
  specificBinaryTreeMap: Map<string, BinaryTree<number>>;

  constructor() {
    this.specificBinaryTreeMap = new Map();

    this.binaryTreeClassMap = new Map([
      ['BinarySearchTree', BinarySearchTree],
      ['AVLTree', AVLTree]
    ])
  }

  getSpecificBinaryTree(className: 'BinarySearchTree' | 'AVLTree'): BinaryTree<number> {
    if (!this.specificBinaryTreeMap.has(className)) {
      this.specificBinaryTreeMap.set(
        className,
        new (this.binaryTreeClassMap.get(className))(30, 20, 40, 15, 10)
      )
    }

    return this.specificBinaryTreeMap.get(className);
  }
}
