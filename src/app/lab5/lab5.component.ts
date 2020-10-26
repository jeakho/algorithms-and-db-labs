import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';

import { hashDivision, hashMultiplication, hashString } from './src/hash-function'
import { convertInt } from './other/types-transformation'

interface IModel {
  key: string;
  selectedRadio: number;
}

@Component({
  selector: 'app-lab5',
  templateUrl: './lab5.component.html',
  styleUrls: ['./lab5.component.css']
})
export class Lab5Component implements OnInit, OnDestroy {
  hashingForm: FormGroup;
  subscriptions: Subscription[] = [];

  radioToHashConfig: { [x: number]: [any, (x: any) => number], [x: string]: [any, (x: any) => number] };
  hashRecords: Array<[number, string | number]> = [];
  model: IModel = {
    key: "12345",
    selectedRadio: 1
  };

  constructor(
    private fb: FormBuilder
  ) {
    this.radioToHashConfig = {
      1: [convertInt, hashDivision],
      2: [convertInt, hashMultiplication],
      3: [String, hashString]
    }
  }

  get key() {
    return this.hashingForm.get('key');
  }

  get selectedRadio() {
    return this.hashingForm.get('selectedRadio');
  }

  processHashing(): void {
    const hashConfig = this.radioToHashConfig[this.model.selectedRadio]

    const key: string | number = hashConfig[0](this.model.key);
    if (key !== key) {
      alert("The function requires an integer, but got string! Please enter an integer or choose another hashing function!");
      return;
    }

    this.hashRecords.push(
      [hashConfig[1](key), this.model.key]
    )
  }

  clearList(): void {
    this.hashRecords = [];
  }

  ngOnInit(): void {
    this.hashingForm = this.fb.group({
      key: [this.model.key, Validators.required],
      selectedRadio: [this.model.selectedRadio, Validators.required]
    })

    this.subscriptions.push(
      this.hashingForm.valueChanges.subscribe(model => Object.assign(this.model, model))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
