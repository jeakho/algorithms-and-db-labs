import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BinaryTree } from '../types/binary-tree/binaryTree';
import { TreeRepConfig } from '../state/treeRepConfig'
import { TreeNode } from '../types/binary-tree/treeNode';
import { Point } from '../types/binary-tree/point';
import { GraphicsService } from '../services/graphics.service';

@Component({
  selector: 'app-tree-drawer',
  templateUrl: './tree-drawer.component.html',
  styleUrls: ['./tree-drawer.component.css']
})
export class TreeDrawerComponent implements OnInit, OnChanges {
  @Input() binaryTree: BinaryTree<any>;
  @Input() config: typeof TreeRepConfig;

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  private nodesToCoordinates: Map<TreeNode<any>, Point>;

  constructor(
    private graphics: GraphicsService
  ) {
    this.nodesToCoordinates = new Map();
  }

    
  ngOnInit(): void {
    this.graphics.addField(this.canvasRef.nativeElement);

    this.initCoordinates();
    this.drawTree();

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];

      if (chng.previousValue !== chng.currentValue) {
        this.nodesToCoordinates.clear();
        
        if (this.graphics.hasField()) {
          this.initCoordinates();
          this.drawTree();
        }
      }
    }
  }

  private initCoordinates() {
    this.nodesToCoordinates.clear();

    for (let node of this.binaryTree.levelOrderNodesTraversalIterator()) {
      const nodeCoordinates = !this.isLeftChild(node)
      ? !this.isRightChild(node)
        ? this.calculateRootNodeCoordinates()
        : this.calculateRightChildCoordinates(node.parent)
      : this.calculateLeftChildCoordinates(node.parent);

      this.nodesToCoordinates.set(node, nodeCoordinates);
    }
  }

  private drawTree() {
    this.graphics.clear();

    if (this.binaryTree.isEmpty()) this.printDefault(this.config.onEmptyTreeMessage);

    for (let node of this.binaryTree.levelOrderNodesTraversalIterator()) {

      this.drawNode(node);
      
      if (node.left) this.drawConectionToLeftChild(node);
      if (node.right) this.drawConnectionToRightChild(node);
    }
  }

  // private emphasizeNode(node: TreeNode<any>, seconds: number): void {
  //   const { X, Y } = this.nodesToCoordinates.get(node);

  //   if (this.emphasizeTimeout) clearTimeout(this.emphasizeTimeout);

  //   this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, this.emphasizeConfig);
  //   this.emphasizeTimeout = setTimeout(() => {
  //     this.drawNode(node);
  //   }, seconds * 1000);
  // }

  private drawNode(node: TreeNode<any>) {
    const { X, Y } = this.nodesToCoordinates.get(node);

    this.graphics.drawArc(X, Y, this.config.node.radius, 0, 2 * Math.PI, this.config.node.edge);
    this.graphics.fillText(String(node.data), X, Y, this.config.node.text);
  }

  private drawConectionToLeftChild(node: TreeNode<any>) {
    const { X: XSelf, Y: YSelf } = this.nodesToCoordinates.get(node);
    const { X: XLeft, Y: YLeft } = this.calculateLeftChildCoordinates(node);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XLeft - XSelf), Y: Math.abs(YLeft - YSelf) };
    const { radius: R } = this.config.node;

    this.graphics.drawLine(
      XSelf - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      XLeft + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      YLeft - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      this.config.connection
    );
  }

  private drawConnectionToRightChild(node: TreeNode<any>): void {
    const { X: XSelf, Y: YSelf } = this.nodesToCoordinates.get(node);
    const { X: XRight, Y: YRight } = this.calculateRightChildCoordinates(node);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XRight - XSelf), Y: Math.abs(YRight - YSelf) };
    const { radius: R } = this.config.node;

    this.graphics.drawLine(
      XSelf + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      XRight - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YRight - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      { 
        width: this.config.connection.width 
      }
    );
  }

  private printDefault(message: string) {
    this.graphics.fillText(message, this.graphics.fieldWidth / 2, this.graphics.fieldHeight / 2.4, { fontSize: 100, horizontalAlign: 'center', verticalAlign: 'middle', color: '#dcdcdc' });
  }

  private calculateRootNodeCoordinates() {
    return new Point(this.graphics.fieldWidth / 2, this.config.node.radius + this.config.node.edge.borderWidth)
  }

  private calculateLeftChildCoordinates(node: TreeNode<any>) {
    const { X, Y } = this.nodesToCoordinates.get(node);
    const distanceToChild = node.parent ? new Point(
      Math.abs(this.nodesToCoordinates.get(node).X - this.nodesToCoordinates.get(node.parent).X) / 2,
      150
    ) : new Point(200, 150);

    return new Point(
      X - distanceToChild.X,
      Y + distanceToChild.Y
    );
  }

  private calculateRightChildCoordinates(node: TreeNode<any>) {
    const { X, Y } = this.nodesToCoordinates.get(node);
    const distanceToChild = node.parent ? new Point(
      Math.abs(this.nodesToCoordinates.get(node).X - this.nodesToCoordinates.get(node.parent).X) / 2,
      150
    ) : new Point(200, 150);

    return new Point(
      X + distanceToChild.X,
      Y + distanceToChild.Y
    );
  }

  private isLeftChild(node: TreeNode<any>) {
    if (node === node.parent?.left) return true;
    
    return false;
  }

  private isRightChild(node: TreeNode<any>) {
    if (node === node.parent?.right) return true;
    
    return false;
  }
}
