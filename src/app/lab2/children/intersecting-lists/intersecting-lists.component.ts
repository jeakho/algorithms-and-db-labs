import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { compact } from 'lodash'

interface IIntersectingListsModel {
  nodeValuesStr: string
}

@Component({
  selector: 'app-intersecting-lists',
  templateUrl: './intersecting-lists.component.html',
  styleUrls: ['./intersecting-lists.component.css']
})
export class IntersectingListsComponent implements OnInit {
  @Input() model: IIntersectingListsModel;

  @Output() intersecting = new EventEmitter<{ nodeValues: number[] }>();

  intersectingListsForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  get nodeValuesStr() {
    return this.intersectingListsForm.get('nodeValuesStr');
  }

  processIntersecting() {
    const nodeValues = compact(this.model.nodeValuesStr.split(/[ ,]/)).map(el => +el);

    this.intersecting.emit({ nodeValues });
  }

  ngOnInit(): void {
    this.intersectingListsForm = this.fb.group({
      nodeValuesStr: [this.model.nodeValuesStr, [Validators.required, Validators.pattern(/^[-\d, ]*$/)]]
    })

    this.intersectingListsForm.valueChanges.subscribe(model => Object.assign(this.model, model));
  }

}
