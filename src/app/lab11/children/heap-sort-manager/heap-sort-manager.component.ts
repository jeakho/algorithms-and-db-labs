import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compact } from 'lodash';
import { Subscription } from 'rxjs';
import { HeapSortService } from './service/heap-sort.service';

@Component({
  selector: 'app-heap-sort-manager',
  templateUrl: './heap-sort-manager.component.html',
  styleUrls: ['./heap-sort-manager.component.css']
})
export class HeapSortManagerComponent implements OnInit, OnDestroy {
  private array: number[];
  private _sortedArray: number[];
  sortedArrayAsString: string;
  heapSortForm: FormGroup;
  subscriptions: Subscription[];
  model: { arrayAsString: string } = {
    arrayAsString: "3, 2, 1"
  }

  constructor(
    private fb: FormBuilder,
    private hs: HeapSortService
  ) {
    this.array = compact(this.model.arrayAsString.split(/[ ,]/)).map(el => +el);

    this.sortedArray = this.hs.sort(this.array);
  }

  get sortedArray() {
    return this._sortedArray;
  }

  set sortedArray(value) {
    this._sortedArray = value;

    this.sortedArrayAsString = this._sortedArray.join(', ');
  }

  get arrayAsString() {
    return this.heapSortForm.get("arrayAsString");
  }

  processSorting() {
    console.log(this.model);
    this.sortedArray = this.hs.sort(this.array);
  }

  ngOnInit(): void {
    this.heapSortForm = this.fb.group({
      arrayAsString: [this.model.arrayAsString, Validators.compose([Validators.required, Validators.pattern(/^ *(?:-?\d+(?:(?: *, *)(?=[-\d])|(?: *)(?=$)))+$/)])]
    })

    this.heapSortForm.valueChanges.subscribe(changes => {
      Object.assign(this.model, changes);

      this.array = compact(this.model.arrayAsString.split(/[ ,]/)).map(el => +el);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
