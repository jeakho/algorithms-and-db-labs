import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { compact } from 'lodash'
import { Subscription } from 'rxjs';

interface IMergingListsModel {
  nodeValuesStr: string
}

@Component({
  selector: 'app-merging-lists',
  templateUrl: './merging-lists.component.html',
  styleUrls: ['./merging-lists.component.css']
})
export class MergingListsComponent implements OnInit, OnDestroy {
  @Input() model: IMergingListsModel;

  @Output() merging = new EventEmitter<{ nodeValues: number[] }>();

  mergingListsForm: FormGroup;
  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder
  ) { }

  get nodeValuesStr() {
    return this.mergingListsForm.get('nodeValuesStr');
  }

  processMerging() {
    const nodeValues = compact(this.model.nodeValuesStr.split(/[ ,]/)).map(el => +el);

    this.merging.emit({ nodeValues });
  }

  ngOnInit(): void {
    this.mergingListsForm = this.fb.group({
      nodeValuesStr: [this.model.nodeValuesStr, [Validators.required, Validators.pattern(/^[-\d, ]*$/)]]
    })

    this.subscriptions.push(this.mergingListsForm.valueChanges.subscribe(model => Object.assign(this.model, model)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

}
