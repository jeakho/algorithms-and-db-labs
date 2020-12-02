import { Component, OnInit } from '@angular/core';
import { BinaryTreeService } from '../services/binary-tree.service';
import { BinaryTree } from '../types/binary-tree/binaryTree';

@Component({
  selector: 'app-lab10',
  templateUrl: './lab10.component.html',
  styleUrls: ['./lab10.component.css']
})
export class Lab10Component implements OnInit {
  avl: BinaryTree<number>

  constructor(
    private bts: BinaryTreeService
  ) {
    this.avl = bts.getSpecificBinaryTree('AVLTree');
  }

  ngOnInit(): void {
  }

}
