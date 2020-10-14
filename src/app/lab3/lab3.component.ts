import { Component, OnInit } from '@angular/core';
import { StackService } from './stack.service';


@Component({
  selector: 'app-lab3',
  templateUrl: './lab3.component.html',
  styleUrls: ['./lab3.component.css'],
  providers: [StackService]
})
export class Lab3Component implements OnInit {
  constructor(
    public ss: StackService
  ) {
    ss.push(1, 2, 3, 4, 5, 6, 7);
  }

  get reversedStack() {
    return this.ss.getValues().reverse();
  }

  ngOnInit(): void {
  }

}
