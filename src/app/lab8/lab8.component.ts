import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TreeDrawingService } from './services/tree-drawing.service';
import { BinarySearchTree } from './src/binarySearchTree';

@Component({
  selector: 'app-lab8',
  templateUrl: './lab8.component.html',
  styleUrls: ['./lab8.component.css']
})
export class Lab8Component implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

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

  get isTreeEmpty() {
    console.log(!this.tds.treeSize);
    return !this.tds.treeSize;
  }

  constructor(
    private tds: TreeDrawingService<number>,
    private fb: FormBuilder
  ) {
    this.radioBtnToHashTableOperation = new Map([
      [1, this.tds.insertItem.bind(this.tds)],
      [2, this.tds.removeItem.bind(this.tds)],
      [3, this.tds.findItem.bind(this.tds)]
    ])
  }

  performAction() {
    this.radioBtnToHashTableOperation.get(this.model.selectedRadio)(+this.model.itemValue);
  }

  clearTree() {
    this.tds.clear();
  }

  ngOnInit(): void {
    const bst = new BinarySearchTree(20, 15, 25, 12, 17, 23, 28, 26, 32);
    this.tds.config({ tree: bst, canvas: this.canvasRef.nativeElement });

    this.treeControlFormGroup = this.fb.group({
      itemValue: [this.model.itemValue, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])],
      selectedRadio: [this.model.selectedRadio, Validators.required]
    })

    this.treeControlFormGroup.valueChanges.subscribe(model => Object.assign(this.model, model));
  }

}
