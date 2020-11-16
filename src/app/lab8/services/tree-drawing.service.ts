import { Injectable } from '@angular/core';
import { Graphics } from '../graphics';
import { BinaryTree } from '../src/binaryTree';
import { Point } from '../src/point';
import { TreeNode } from '../src/treeNode';

@Injectable({
  providedIn: 'root'
})
export class TreeDrawingService<T> {
  private tree: BinaryTree<T>;
  private graphics: Graphics;

  private nodeRepresenationConfig = {
    edge: {
      borderWidth: 2,
    },
    text: {
      fontSize: 25,
      verticalAlign: 'middle' as "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom", 
      horizontalAlign: 'center' as "left" | "right" | "center" | "start" | "end",
    },
    radius: 30,
  }
  private emphasizeConfig = {
    color: '#ff0000',
    borderWidth: this.nodeRepresenationConfig.edge.borderWidth
  }
  private connectionRepresentationConfig = {
    width: 1
  }

  private emphasizeTimeout: any = null;

  get treeSize() {
    return this.tree.size;
  }

  constructor() { }

  config(config: {
    tree: BinaryTree<T>,
    canvas: HTMLCanvasElement
  }) {
    this.tree = config.tree;
    this.graphics = new Graphics(config.canvas);

    this.updateView();
  }

  insertItem(item: T): void {
    try {
      this.tree.insert(item);

      this.updateView();
    } catch(err) {
      alert(err.message);
    }
  }

  removeItem(item: T) {
    try {
      this.tree.remove(item);

      this.updateView();
    } catch(err) {
      alert(err.message);
    }
  }

  findItem(item: T) {
    const curNode = this.tree.findNode(item);

    if (curNode?.data !== item) {
      alert('NULL');
      return;
    }

    else this.emphasizeNode(curNode);
  }

  clear() {
    this.tree.clear();

    this.updateView();
  }

  private updateView() {
    this.graphics.clear();

    if (!this.tree.size) {
      this.graphics.fillText("<<EMPTY TREE>>", this.graphics.fieldWidth / 2, this.graphics.fieldHeight / 2.4, { fontSize: 100, horizontalAlign: 'center', verticalAlign: 'middle', color: '#dcdcdc' });
      return;
    }

    for (let curNode of this.tree.levelOrderNodesTraversalIterator()) {
      const nodeCoordinates = !this.isLeftChild(curNode)
      ? !this.isRightChild(curNode)
        ? new Point(this.graphics.fieldWidth / 2, this.nodeRepresenationConfig.radius + this.nodeRepresenationConfig.edge.borderWidth)
        : this.calculateRightChildCoordinates(curNode.parent)
      : this.calculateLeftChildCoordinates(curNode.parent);

      curNode.coordinates = nodeCoordinates;

      this.drawNode(curNode);
      
      if (curNode.left) this.drawCoonectionToLeftChild(curNode);
      if (curNode.right) this.drawConnectionToRightChild(curNode);
    }
  }

  private emphasizeNode(node: TreeNode<T>): void {
    const { X, Y } = node.coordinates;

    if (this.emphasizeTimeout) clearTimeout(this.emphasizeTimeout);
    this.updateView();

    this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, this.emphasizeConfig);
    this.emphasizeTimeout = setTimeout(() => {
      this.drawNode(node);
    }, 3000)
  }

  private drawNode(node: TreeNode<T>) {
    const { X, Y } = node.coordinates;

    this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, this.nodeRepresenationConfig.edge);
    this.graphics.fillText(String(node.data), X, Y, this.nodeRepresenationConfig.text);
  }

  private drawCoonectionToLeftChild(parent: TreeNode<T>) {
    const { X: XSelf, Y: YSelf } = parent.coordinates;
    const { X: XLeft, Y: YLeft } = this.calculateLeftChildCoordinates(parent);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XLeft - parent.coordinates.X), Y: Math.abs(YLeft - parent.coordinates.Y) };
    const { radius: R } = this.nodeRepresenationConfig;

    this.graphics.drawLine(
      XSelf - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      XLeft + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      YLeft - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      this.connectionRepresentationConfig
    );
  }

  private drawConnectionToRightChild(parent: TreeNode<T>): void {
    const { X: XSelf, Y: YSelf } = parent.coordinates;
    const { X: XRight, Y: YRight } = this.calculateRightChildCoordinates(parent);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XRight - parent.coordinates.X), Y: Math.abs(YRight - parent.coordinates.Y) };
    const { radius: R } = this.nodeRepresenationConfig;

    this.graphics.drawLine(
      XSelf + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      XRight - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YRight - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      { 
        width: this.connectionRepresentationConfig.width 
      }
    );
  }

  private calculateLeftChildCoordinates(parent: TreeNode<T>, isRoot = false): Point {
    const { X, Y } = parent.coordinates;
    const distanceToChild = parent.parent ? new Point(
      Math.abs(parent.coordinates.X - parent.parent.coordinates.X) / 2,
      150
    ) : new Point(200, 150);

    return new Point(
      X - distanceToChild.X,
      Y + distanceToChild.Y
    );
  }

  private calculateRightChildCoordinates(parent: TreeNode<T>): Point {
    const { X, Y } = parent.coordinates;
    const distanceToChild = parent.parent ? new Point(
      Math.abs(parent.coordinates.X - parent.parent.coordinates.X) / 2,
      150
    ) : new Point(200, 150);

    return new Point(
      X + distanceToChild.X,
      Y + distanceToChild.Y
    );
  }

  private isLeftChild(node: TreeNode<T>) {
    if (node === node.parent?.left) return true;
    
    return false;
  }

  private isRightChild(node: TreeNode<T>) {
    if (node === node.parent?.right) return true;
    
    return false;
  }
}
