import { Component, OnInit, Inject, Input, OnDestroy, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { GraphicsService } from '../services/graphics.service';
import { BinaryTree } from '../types/binary-tree/binaryTree';
import { IBinaryTree } from '../types/binary-tree/IBinaryTree';
import { Point } from '../types/binary-tree/point';
import { TreeNode } from '../types/binary-tree/treeNode';

@Component({
  selector: 'app-tree-controller',
  templateUrl: './tree-controller.component.html',
  styleUrls: ['./tree-controller.component.css']
})
export class TreeControllerComponent implements OnInit, OnDestroy, OnChanges, IBinaryTree<any> {
  @Input() binaryTree: BinaryTree<any>;

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  private nodesToCoordinates: Map<TreeNode<any>, Point>;
  private defaultMessage: string = "<<EMPTY TREE>>"

  private nodeRepresenationConfig = {
    edge: {
      borderWidth: 3,
    },
    text: {
      fontSize: 40,
      verticalAlign: 'middle' as "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom", 
      horizontalAlign: 'center' as "left" | "right" | "center" | "start" | "end",
    },
    radius: 30,
  }
  private emphasizeConfig = {
    color: '#ff0000',
    borderWidth: 3
  }
  private connectionRepresentationConfig = {
    width: 1
  }

  private emphasizeTimeout: any = null;

  treeControlFormGroup: FormGroup
  private model = {
    itemValue: '10',
    selectedRadio: 1
  }
  private subscriptions: Subscription[] = [];
  private radioBtnToHashTableOperation: Map<number, (item: number) => any>

  get itemValue(): AbstractControl {
    return this.treeControlFormGroup.get('itemValue');
  }

  get selectedRadio(): AbstractControl {
    return this.treeControlFormGroup.get('selectedRadio');
  }

  constructor(
    private fb: FormBuilder,
    private graphics: GraphicsService,
    @Inject('TouchedErrorStateMatcher') public errorStateMatcher: ErrorStateMatcher,
  ) {
    this.nodesToCoordinates = new Map();

    this.radioBtnToHashTableOperation = new Map([
      [1, this.insert.bind(this)],
      [2, this.remove.bind(this)],
      [3, this.find.bind(this)]
    ])
  }

  performAction() {
    this.radioBtnToHashTableOperation.get(this.model.selectedRadio)(+this.model.itemValue);

    this.itemValue.setValue('');
    this.itemValue.markAsUntouched();
  }

  isEmpty() {
    return this.binaryTree.isEmpty();
  }

  insert() {
    try {
      this.binaryTree.insert(+this.model.itemValue);

      this.initCoordinates();
      this.drawTree();

    } catch(error) {
      alert(error);
    }
  }

  remove() {
    try {
      this.binaryTree.remove(+this.model.itemValue);

      this.initCoordinates();
      this.drawTree();

    } catch(error) {
      alert(error);
    }
  }

  find() {
    const node = this.binaryTree.findNode(+this.model.itemValue);
    
    if (+this.model.itemValue === node?.data) this.emphasizeNode(node, 3);
    else alert ("NULL");
  }

  clear() {
    this.binaryTree.clear();

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
          console.log("HELLO!"), this.drawTree();
        }
      }
    }
  }

  ngOnInit(): void {
    this.graphics.addField(this.canvasRef.nativeElement);

    this.initCoordinates();
    this.drawTree();

    this.treeControlFormGroup = this.fb.group({
      itemValue: [this.model.itemValue, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])],
      selectedRadio: [this.model.selectedRadio, Validators.required]
    })

    this.subscriptions.push(
      this.treeControlFormGroup.valueChanges.subscribe(model => Object.assign(this.model, model))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

    if (this.binaryTree.isEmpty()) this.printDefault(this.defaultMessage);

    for (let node of this.binaryTree.levelOrderNodesTraversalIterator()) {

      this.drawNode(node);
      
      if (node.left) this.drawConectionToLeftChild(node);
      if (node.right) this.drawConnectionToRightChild(node);
    }
  }

  private emphasizeNode(node: TreeNode<any>, seconds: number): void {
    const { X, Y } = this.nodesToCoordinates.get(node);

    if (this.emphasizeTimeout) clearTimeout(this.emphasizeTimeout);

    this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, this.emphasizeConfig);
    this.emphasizeTimeout = setTimeout(() => {
      this.drawNode(node);
    }, seconds * 1000);
  }

  private drawNode(node: TreeNode<any>) {
    const { X, Y } = this.nodesToCoordinates.get(node);

    this.graphics.drawArc(X, Y, this.nodeRepresenationConfig.radius, 0, 2 * Math.PI, this.nodeRepresenationConfig.edge);
    this.graphics.fillText(String(node.data), X, Y, this.nodeRepresenationConfig.text);
  }

  private drawConectionToLeftChild(node: TreeNode<any>) {
    const { X: XSelf, Y: YSelf } = this.nodesToCoordinates.get(node);
    const { X: XLeft, Y: YLeft } = this.calculateLeftChildCoordinates(node);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XLeft - XSelf), Y: Math.abs(YLeft - YSelf) };
    const { radius: R } = this.nodeRepresenationConfig;

    this.graphics.drawLine(
      XSelf - (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      YSelf + (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      XLeft + (R * XToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)), 
      YLeft - (R * YToChild) / Math.sqrt(Math.pow(XToChild, 2) + Math.pow(YToChild, 2)),
      this.connectionRepresentationConfig
    );
  }

  private drawConnectionToRightChild(node: TreeNode<any>): void {
    const { X: XSelf, Y: YSelf } = this.nodesToCoordinates.get(node);
    const { X: XRight, Y: YRight } = this.calculateRightChildCoordinates(node);
    const { X: XToChild, Y: YToChild } = { X: Math.abs(XRight - XSelf), Y: Math.abs(YRight - YSelf) };
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

  private printDefault(message: string) {
    this.graphics.fillText(message, this.graphics.fieldWidth / 2, this.graphics.fieldHeight / 2.4, { fontSize: 100, horizontalAlign: 'center', verticalAlign: 'middle', color: '#dcdcdc' });
  }

  private calculateRootNodeCoordinates() {
    return new Point(this.graphics.fieldWidth / 2, this.nodeRepresenationConfig.radius + this.nodeRepresenationConfig.edge.borderWidth)
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
