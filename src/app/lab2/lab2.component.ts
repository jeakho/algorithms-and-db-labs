import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LinkedList, SORTING_ORDER } from './src/singly-linked-list/LinkedList'
import { Task2 } from './src/Task2'

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.css']
})
export class Lab2Component {
  public linkedList: LinkedList<number>;

  public addingNodesForm: FormGroup;

  public addingNodesModel = {
    nodeValuesStr: '',
    selectedRadio: 0,
    insertionPosition: 1
  }
  public removingNodesModel = {
    removingPosition: 1,
    selectedRadio: 0,
    isCyclic: false
  }
  public movingNodesModel = {
    positionToMoveFrom: 1,
    positionsToMove: 2
  }
  public mergingListsModel = {
    nodeValuesStr: ''
  }
  public intersectingListsModel = {
    nodeValuesStr: ''
  }
  public sortingListModel = {
    order: SORTING_ORDER.ASCENDING
  }

  constructor(
    private fb: FormBuilder
  ) {

    this.linkedList = new LinkedList<number>(...new Array(10).fill(0).map((el, ind) => ind + 1));
    this.addingNodesModel.nodeValuesStr = String(this.linkedList.get(0) - 1);

    this.mergingListsModel.nodeValuesStr = `${this.linkedList.length + 1}, ${this.linkedList.length + 2}`

    this.intersectingListsModel.nodeValuesStr = `${this.linkedList.get(0)}, ${this.linkedList.get(1)}`
  }

  addNodes(data: { position: number, values: number[] }) {
    if (data.position < 1 || data.position > this.linkedList.length + 1) {
      alert(`Adding position is out of range! You can add nodes only at positions from 1 to ${this.linkedList.length + 1}`);
      return;
    }

    data.values.reverse().forEach(el => { 
      data.position - 1 !== 1 
      ? data.position - 1 !== this.linkedList.length + 1
        ? this.linkedList.insertAtIndex(data.position - 1, +el)
        : this.linkedList.addToTail(+el)
      : this.linkedList.addToHead(+el)
    });
  }

  removeNode(data: { position: number, isCyclic: boolean }) {
    if (data.position < 1 || data.position > this.linkedList.length) {
      alert(`Removing position is out of range! You can remove nodes only from positions 1 to ${this.linkedList.length}`)
      return;
    }

    if (data.isCyclic) {
      this.linkedList.removeEachN(data.position);
      return;
    }

    data.position !== 1
    ? data.position !== this.linkedList.length
      ? this.linkedList.removeAtIndex(data.position - 1)
      : this.linkedList.removeFromTail()
    : this.linkedList.removeFromHead();
  }

  moveNode(data: { positionToMoveFrom: number, positionsToMove: number }) {
    if (data.positionToMoveFrom < 1 || data.positionToMoveFrom > this.linkedList.length) {
      alert(`Position is out of range! You can move only those nodes that are on positions from 1 to ${this.linkedList.length}`)
      return;
    }

    this.linkedList.move(data.positionToMoveFrom - 1, data.positionsToMove);
  }

  attachList(data: { nodeValues: number[] }) {
    this.linkedList.attachList(new LinkedList<number>(...data.nodeValues));
  }

  intersectLists(data: { nodeValues: number[] }) {
    this.linkedList.intersectLists(new LinkedList<number>(...data.nodeValues));
  }

  sortList(data: { order: SORTING_ORDER.ASCENDING }) {
    this.linkedList.sort(data.order);
  }

  solveTask2({ secondArmyWarriorsQuantity, killingOrder }: { secondArmyWarriorsQuantity: number, killingOrder: number }) {
    const task2 = new Task2(secondArmyWarriorsQuantity, killingOrder);

    alert(`The last warrior was at position ${task2.findLastWarriorNumber()}`);
  }

}
