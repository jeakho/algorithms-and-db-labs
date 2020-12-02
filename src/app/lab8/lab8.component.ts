import { Component, OnInit } from '@angular/core';
import { BinaryTreeService } from '../services/binary-tree.service';
import { BinarySearchTree } from '../types/binary-tree/binarySearchTree';
import { BinaryTree } from '../types/binary-tree/binaryTree';

@Component({
  selector: 'app-lab8',
  templateUrl: './lab8.component.html',
  styleUrls: ['./lab8.component.css']
})
export class Lab8Component implements OnInit {
  bst: BinaryTree<number>

  constructor(
    private bts: BinaryTreeService
  ) {
    this.bst = bts.getSpecificBinaryTree('BinarySearchTree');
  }

  ngOnInit(): void {
  }

}
