import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { nodeValuesValidator } from '../../src/validation-rules/multiple-values.validation'

import { compact } from 'lodash'

interface IAddingNodesModel {
  nodeValuesStr: string,
  selectedRadio: number,
  insertionPosition: number
}

@Component({
  selector: 'app-adding-nodes',
  templateUrl: './adding-nodes.component.html',
  styleUrls: ['./adding-nodes.component.css']
})
export class AddingNodesComponent implements OnInit {
  @Input() model: IAddingNodesModel
  @Input() linkedListLength: number

  @Output() addition = new EventEmitter<{ position: number, values: number[] }>();

  addingNodesForm: FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }


  get insertionPosition(): AbstractControl {
    return this.addingNodesForm.get('insertionPosition');
  }

  get nodeValues(): AbstractControl {
    return this.addingNodesForm.get('nodeValues');
  }
  
  processAddition(): void {
    this.addition.emit({ position: this.model.insertionPosition, values: compact(this.model.nodeValuesStr.split(/[ ,]/)).map(el => +el) })
  }

  isInsertionPositionDisabled() {
    return this.model.selectedRadio == 0 || this.model.selectedRadio == 1
  }

  ngOnInit(): void {
    this.addingNodesForm = this.fb.group({
      nodeValues: [this.model.nodeValuesStr, [Validators.required, Validators.pattern(/^[-\d, ]*$/)]],
      selectedRadio: this.model.selectedRadio,
      insertionPosition: [{ value: this.model.insertionPosition, disabled: this.isInsertionPositionDisabled() }, [Validators.pattern(/^-?\d+$/)]]
    });

    this.addingNodesForm.get("nodeValues").valueChanges.subscribe(nodeValuesStr => { this.model.nodeValuesStr = nodeValuesStr })

    this.addingNodesForm.get("selectedRadio").valueChanges.subscribe(selectedRadio => {
      this.model.selectedRadio = selectedRadio;
      this.model.insertionPosition = selectedRadio !== 0 ? selectedRadio != 1 ? this.model.insertionPosition : this.linkedListLength + 1 : 1;

      this.addingNodesForm.controls['insertionPosition'].setValue(this.model.insertionPosition)
      this.addingNodesForm.get("insertionPosition")[
        this.isInsertionPositionDisabled() ?
        'disable' :
        'enable'
      ]();
    });

    this.addingNodesForm.get("insertionPosition").valueChanges.subscribe(newValue => {
      this.model.insertionPosition = newValue;
    })
  }

}
