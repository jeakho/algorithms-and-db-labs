import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

interface IMovingNodesModel {
  positionToMoveFrom: number,
  positionsToMove: number
}

@Component({
  selector: 'app-moving-nodes',
  templateUrl: './moving-nodes.component.html',
  styleUrls: ['./moving-nodes.component.css']
})
export class MovingNodesComponent implements OnInit, OnDestroy {
  @Input() model: IMovingNodesModel

  @Output() moving = new EventEmitter<{ positionToMoveFrom: number, positionsToMove: number }>()

  movingNodesForm: FormGroup
  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder
  ) { }

  get positionToMoveFrom() {
    return this.movingNodesForm.get('positionToMoveFrom');
  }

  get positionsToMove() {
    return this.movingNodesForm.get('positionsToMove');
  } 

  processMoving () {
    this.moving.emit(this.model);
  }

  ngOnInit(): void {
    this.movingNodesForm = this.fb.group({
      positionToMoveFrom: [this.model.positionToMoveFrom, [Validators.required, Validators.pattern(/^\d+$/)]],
      positionsToMove: [this.model.positionsToMove, [Validators.required, Validators.pattern(/^-?\d+$/)]]
    })

    this.subscriptions.push(this.movingNodesForm.valueChanges.subscribe(model => {
      Object.assign(this.model, { positionToMoveFrom: +model.positionToMoveFrom, positionsToMove: +model.positionsToMove })
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

}
