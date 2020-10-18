import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QueueService } from '../../services/queue/queue.service'
import { compact } from 'lodash'

interface IAddingItemsModel {
  itemValues: string
}

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
    private qs: QueueService,
    private fb: FormBuilder
  ) {
    this.model.itemValues = `${qs.queueLength + 1}, ${qs.queueLength + 2}, ${qs.queueLength + 3}`
  }

  get itemValues() {
    return this.addingItemsForm.get('itemValues');
  }

  processAddition() {
    this.qs.addToQueue(
      ...compact(this.model.itemValues.split(/[ ,]/)).map(el => +el)
    )
  }

  ngOnInit(): void {
    this.addingItemsForm = this.fb.group({
      itemValues: [this.model.itemValues, [Validators.required, Validators.pattern(/^[-\d, ]*$/)]]
    })

    this.subscriptions.push(
      this.addingItemsForm.valueChanges.subscribe(model => Object.assign(this.model, model))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
