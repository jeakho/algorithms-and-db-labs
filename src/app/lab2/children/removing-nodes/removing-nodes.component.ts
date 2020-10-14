import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

interface IRemovingNodesModel {
  removingPosition: number,
  selectedRadio: number,
  isCyclic: boolean
}


@Component({
  selector: 'app-removing-nodes',
  templateUrl: './removing-nodes.component.html',
  styleUrls: ['./removing-nodes.component.css']
})
export class RemovingNodesComponent implements OnInit, OnDestroy {
  @Input() model: IRemovingNodesModel
  @Input() linkedListLength: number

  @Output() removal = new EventEmitter<{ position: number, isCyclic: boolean }>();

  removingNodesForm: FormGroup
  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder
  ) { }

  get removingPosition() {
    return this.removingNodesForm.get('removingPosition');
  }

  isInsertionPositionDisabled() {
    return this.model.selectedRadio == 0 || this.model.selectedRadio == 1
  }

  processRemoval(): void {
    this.removal.emit({ position: this.model.removingPosition, isCyclic: this.model.isCyclic });
  }

  ngOnInit(): void {
    this.removingNodesForm = this.fb.group({
      removingPosition: [{ value: this.model.removingPosition, disabled: this.isInsertionPositionDisabled() }, [Validators.required, Validators.pattern(/^\d+$/)]],
      selectedRadio: [this.model.selectedRadio],
      isCyclic: [this.model.isCyclic]
    })

    this.subscriptions.push(this.removingNodesForm.get('isCyclic').valueChanges.subscribe(isCyclic => {
      Object.assign(this.model, { isCyclic: isCyclic });
    }));

    this.subscriptions.push(this.removingNodesForm.get('removingPosition').valueChanges.subscribe(removingPosition => { Object.assign(this.model, { removingPosition: +removingPosition }) }));
    
    this.subscriptions.push(this.removingNodesForm.get("selectedRadio").valueChanges.subscribe(selectedRadio => {
      this.model.selectedRadio = selectedRadio;
      this.model.isCyclic = false;
      this.model.removingPosition = selectedRadio !== 0 ? selectedRadio != 1 ? this.model.removingPosition : this.linkedListLength : 1;

      this.removingNodesForm.controls['isCyclic'].setValue(this.model.isCyclic);

      this.removingNodesForm.controls['removingPosition'].setValue(this.model.removingPosition)
      this.removingNodesForm.get('removingPosition')[
        this.isInsertionPositionDisabled() ?
        'disable' :
        'enable'
      ]();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

}
