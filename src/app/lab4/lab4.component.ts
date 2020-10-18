import { Component, OnInit } from '@angular/core';

import { QueueService } from './services/queue/queue.service';

@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.css'],
  providers: [QueueService]
})
export class Lab4Component implements OnInit {

  get queueItems() {
    return this.qs.getQueueItems();
  }

  constructor(
    public qs: QueueService
  ) {
    qs.addToQueue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  }



  ngOnInit(): void {
  }

}
