import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface ISortingModel {
  order: 0 | 1
}

@Component({
  selector: 'app-sorting-list',
  templateUrl: './sorting-list.component.html',
  styleUrls: ['./sorting-list.component.css']
})
export class SortingListComponent implements OnInit {
  @Input() model: ISortingModel

  @Output() sort = new EventEmitter<ISortingModel>();

  sortingListForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  processSorting() {
    this.sort.emit(this.model);
  }

  ngOnInit(): void {
    this.sortingListForm = this.fb.group({
      order: [this.model.order]
    })

    this.sortingListForm.valueChanges.subscribe(model => Object.assign(this.model, { ...model }, { order: +model.order }));
  }

}
