import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ITask2Condition {
  secondArmyWarriorsQuantity: number,
  killingOrder: number
}

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {
  @Output() data = new EventEmitter<ITask2Condition>();

  model: ITask2Condition = {
    secondArmyWarriorsQuantity: 10,
    killingOrder: 3
  }

  task2Form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  get secondArmyWarriorsQuantity() {
    return this.task2Form.get('secondArmyWarriorsQuantity');
  }

  get killingOrder() {
    return this.task2Form.get('killingOrder');
  }

  processSolving() {
    this.data.emit(this.model);
  }

  ngOnInit(): void {
    this.task2Form = this.fb.group({
      secondArmyWarriorsQuantity: [this.model.secondArmyWarriorsQuantity, [Validators.required, Validators.pattern(/^-?\d+$/)]],
      killingOrder: [this.model.killingOrder, [Validators.required, Validators.pattern(/^-?\d+$/)]]
    })

    this.task2Form.valueChanges.subscribe(model => Object.assign(this.model, { secondArmyWarriorsQuantity: +model.secondArmyWarriorsQuantity, killingOrder: + model.killingOrder }))
  }

}
