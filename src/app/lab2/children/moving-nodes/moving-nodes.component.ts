import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IMovingNodesModel {
  positionToMoveFrom: number,
  positionsToMove: number
}

@Component({
  selector: 'app-moving-nodes',
  templateUrl: './moving-nodes.component.html',
  styleUrls: ['./moving-nodes.component.css']
})
export class MovingNodesComponent implements OnInit {
  @Input() model: IMovingNodesModel

  @Output() moving = new EventEmitter<{ positionToMoveFrom: number, positionsToMove: number }>()

  movingNodesForm: FormGroup

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

    this.movingNodesForm.valueChanges.subscribe(model => {
      Object.assign(this.model, { positionToMoveFrom: +model.positionToMoveFrom, positionsToMove: +model.positionsToMove })
    });
  }

}
