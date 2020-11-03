import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HashTableType, InitTableOperationType, SettingsDialogModel } from './lab6.component';

interface IModel {
  formFieldValue: string,
  selectedRadio: number
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit, OnDestroy {
  private model: IModel
  private subscriptions: Subscription[] = [];
  private radioToHashTableType: Map<number, HashTableType>

  formGroup: FormGroup

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsDialogModel,
    private fb: FormBuilder
  ) {
    this.model = {
      formFieldValue: String(data.length),
      selectedRadio: 1
    }

    this.radioToHashTableType = new Map([
      [1, HashTableType.OPEN_ADDRESSING],
      [2, HashTableType.CLOSED_ADDRESSING]
    ])
  }

  get formFieldValue() {
    return this.formGroup.get('formFieldValue');
  }

  get selectedRadio() {
    return this.formGroup.get('selectedRadio');
  }

  onCloseWithRehash(): void {
    this.dialogRef.close({
      length: +this.model.formFieldValue,
      operationType: InitTableOperationType.WITH_REHASH,
      tableType: this.radioToHashTableType.get(this.model.selectedRadio)
    })
  }

  onCloseWithoutRehash(): void {
    this.dialogRef.close({
      length: +this.model.formFieldValue,
      operationType: InitTableOperationType.WITHOUT_REHASH,
      tableType: this.radioToHashTableType.get(this.model.selectedRadio)
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      formFieldValue: [this.model.formFieldValue, [Validators.required, Validators.pattern(/^\d+$/)]],
      selectedRadio: [this.model.selectedRadio, Validators.required]
    })

    this.formGroup.valueChanges.subscribe(model => Object.assign(this.model, model));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
