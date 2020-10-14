import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StackService } from '../../stack.service';

interface IRemovingItemsModel {
  itemsQuantity: string
}

@Component({
  selector: 'app-removing-items',
  templateUrl: './removing-items.component.html',
  styleUrls: ['./removing-items.component.css']
})
export class RemovingItemsComponent implements OnInit, OnDestroy {
  model: IRemovingItemsModel = {
    itemsQuantity: "1"
  }

  removingItemsForm: FormGroup
  private subscriptions: Subscription[] = [];

  constructor(
    private ss: StackService,
    private fb: FormBuilder
  ) { }

  get itemsQuantity() {
    return this.removingItemsForm.get('itemsQuantity');
  }

  processRemoval() {
    let itemsQuantity = +this.model.itemsQuantity;

    while (itemsQuantity-- > 0) this.ss.pop();
  }

  ngOnInit(): void {
    this.removingItemsForm = this.fb.group({
      itemsQuantity: [this.model.itemsQuantity, [Validators.required, Validators.pattern(/^\d+$/)]]
    })

    this.subscriptions.push(
      this.removingItemsForm.valueChanges.subscribe(changes => Object.assign(this.model, changes))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
