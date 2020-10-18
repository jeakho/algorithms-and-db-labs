import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QueueService } from '../../services/queue/queue.service';

interface ICheckingItemsModel {
  itemValue: string
}

@Component({
  selector: 'app-checking-items',
  templateUrl: './checking-items.component.html',
  styleUrls: ['./checking-items.component.css']
})
export class CheckingItemsComponent implements OnInit, OnDestroy {
  model: ICheckingItemsModel = {
    itemValue: "1"
  }

  checkingItemsForm: FormGroup
  private subscriptions: Subscription[] = [];

  get itemValue() {
    return this.checkingItemsForm.get('itemValue');
  }

  constructor(
    private qs: QueueService,
    private fb: FormBuilder
  ) { }

  processChecking() {
    alert(`An item with value ${this.model.itemValue} is${!this.qs.isItemIncludedInQueue(+this.model.itemValue) ? ' NOT' : ''} IN the queue`);
  }

  ngOnInit(): void {
    this.checkingItemsForm = this.fb.group({
      itemValue: [this.model.itemValue, [Validators.required, Validators.pattern(/^-?\d+$/)]]
    })

    this.subscriptions.push(
      this.checkingItemsForm.valueChanges.subscribe(changes => Object.assign(this.model, changes))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
