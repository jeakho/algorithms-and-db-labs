import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue/queue.service';

@Component({
  selector: 'app-other-operations',
  templateUrl: './other-operations.component.html',
  styleUrls: ['./other-operations.component.css']
})
export class OtherOperationsComponent implements OnInit {

  controllessOperations: { name: string, handler: () => void }[];

  constructor(
    private qs: QueueService
  ) {
    const _this = this;
    this.controllessOperations = [
      {
        name: "Remove first",
        handler: this.removeItems.bind(_this)
      },
      {
        name: "Get length",
        handler: this.showLength.bind(_this)
      },
      {
        name: "Get first",
        handler: this.showFirst.bind(_this)
      },
      {
        name: "Is empty",
        handler: this.showIsEmptyStatus.bind(_this)
      },
      {
        name: "Reverse",
        handler: this.reverse.bind(_this)
      },
      {
        name: "Clear",
        handler: this.clear.bind(_this)
      }
    ]
  }

  removeItems(): void {
    this.qs.removeFromQueue();
  }

  showLength(): void {
    alert("LENGTH: " + this.qs.queueLength)
  }

  showFirst(): void {
    if (!this.qs.queueLength) {
      alert("THE QUEUE IS EMPTY. NO FIRST ELEMENT");
      return;
    }

    alert("FIRST: " + this.qs.queueFirst);
  }

  showIsEmptyStatus(): void {
    alert(this.qs.isQueueEmpty() ? "TRUE" : "FALSE");
  }

  reverse(): void {
    if (!this.qs.queueLength) return;

    this.qs.reverseQueue();
  }

  clear(): void {
    this.qs.clearQueue();
  }

  ngOnInit(): void {
  }

}
