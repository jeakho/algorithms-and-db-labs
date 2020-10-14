import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StackService } from '../../stack.service';
import { IAddingItemsModel } from './adding-items.types';

import { compact } from 'lodash'

@Component({
  selector: 'app-adding-items',
  templateUrl: './adding-items.component.html',
  styleUrls: ['./adding-items.component.css']
})
export class AddingItemsComponent implements OnInit, OnDestroy {
  model: IAddingItemsModel = {
    itemValues: ""
  }

  addingItemsForm: FormGroup
  private subscriptions: Subscription[] = [];

  constructor(
    private ss: StackService,
    private fb: FormBuilder
  ) {
    this.model.itemValues = `${ss.length + 1}, ${ss.length + 2}, ${ss.length + 3}`;
  }

  processAddition() {
    this.ss.push(
      ...compact(this.model.itemValues.split(/[ ,]/)).map(el => +el)
    )
  }

  get itemValues() {
    return this.addingItemsForm.get('itemValues');
  }

  ngOnInit(): void {
    this.addingItemsForm = this.fb.group({
      itemValues: [this.model.itemValues, [Validators.required, Validators.pattern(/^[-\d, ]*$/)]]
    })

    this.subscriptions.push(
      this.addingItemsForm.valueChanges.subscribe(changes => Object.assign(this.model, changes))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
