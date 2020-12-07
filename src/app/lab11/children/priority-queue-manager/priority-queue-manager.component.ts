import { TreeRepresentationApi } from '@/app/api/tree-representation.api';
import { TreeRepConfig } from '@/app/state/treeRepConfig';
import { SimpleBinaryTree } from '@/app/types/binary-tree/simpleBinaryTree';
import { PriorityQueueChangesType } from '@/app/types/priority-queue/changesType';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PriorityQueueManagerFacade } from './facade/priority-queue-manager.facade';

@Component({
  selector: 'app-priority-queue-manager',
  templateUrl: './priority-queue-manager.component.html',
  styleUrls: ['./priority-queue-manager.component.css'],
  providers: [PriorityQueueManagerFacade]
})
export class PriorityQueueManagerComponent implements OnInit {
  heapTree: SimpleBinaryTree<number>;
  treeRepresentationConfig: typeof TreeRepConfig;
  heapControlFormGroup: FormGroup;

  private model = {
    itemValue: '10',
    selectedRadio: 1
  }
  
  private subscriptions: Subscription[] = [];
  private radioBtnToHashTableOperation: Map<number, (item: number) => any>

  constructor(
    private pqmf: PriorityQueueManagerFacade,
    private tra: TreeRepresentationApi,
    private fb: FormBuilder
  ) {
    this.heapTree = new SimpleBinaryTree(...pqmf.getHeap());

    this.tra.setOnEmptyTreeMessage("<<EMPTY HEAP>>");
    this.treeRepresentationConfig = tra.getApi();

    this.subscriptions.push(pqmf.changes.subscribe(this.onHeapChange.bind(this)));

    this.radioBtnToHashTableOperation = new Map([
      [1, this.insert.bind(this)],
      [2, this.remove.bind(this)],
      [3, this.find.bind(this)]
    ])
  }

  get itemValue(): AbstractControl {
    return this.heapControlFormGroup.get('itemValue');
  }

  get selectedRadio(): AbstractControl {
    return this.heapControlFormGroup.get('selectedRadio');
  }

  private onHeapChange({ type }: { type: PriorityQueueChangesType }) {
    if (type !== PriorityQueueChangesType.FIND) {
      this.heapTree = new SimpleBinaryTree(...this.pqmf.getHeap());
    }
  }

  performAction() {
    this.radioBtnToHashTableOperation.get(this.model.selectedRadio)(+this.model.itemValue);

    // this.itemValue.setValue('');
    // this.itemValue.markAsUntouched();
  }

  insert() {
    try {
      this.pqmf.insert(+this.model.itemValue);
    } catch(error) {
      alert(error);
    }
  }

  remove() {
    try {
      this.pqmf.remove(+this.model.itemValue);
    } catch(error) {
      alert(error);
    }
  }

  clear() {
    this.pqmf.clear();
  }

  find() {
    const element = this.pqmf.find(+this.model.itemValue);
  
    alert(element ? element : "NULL");
  }

  ngOnInit(): void {
    this.heapControlFormGroup = this.fb.group({
      itemValue: [this.model.itemValue, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])],
      selectedRadio: [this.model.selectedRadio, Validators.required]
    })

    this.subscriptions.push(
      this.heapControlFormGroup.valueChanges.subscribe(model => Object.assign(this.model, model))
    )
  }

}
