import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QueueService } from '../../services/queue/queue.service';

interface ISwappingItemsModel {
  firstItemPosition: string,
  selectedRadio1: number,
  secondItemPosition: string,
  selectedRadio2: number
}

@Component({
  selector: 'app-swapping-items',
  templateUrl: './swapping-items.component.html',
  styleUrls: ['./swapping-items.component.css']
})
export class SwappingItemsComponent implements OnInit, OnDestroy {
  private selectedRadioToItemPosition: { [x: string]: string, [x: number]: string } = { }

  model: ISwappingItemsModel = {
    firstItemPosition: '1',
    selectedRadio1: 1,
    secondItemPosition: '',
    selectedRadio2: 2
  }

  swappingItemsForm: FormGroup
  private subscriptions: Subscription[] = [];

  get firstItemPosition() {
    return this.swappingItemsForm.get('firstItemPosition');
  }

  get selectedRadio1() {
    return this.swappingItemsForm.get('selectedRadio1');
  }

  get secondItemPosition() {
    return this.swappingItemsForm.get('secondItemPosition');
  }

  get selectedRadio2() {
    return this.swappingItemsForm.get('selectedRadio2');
  }

  constructor(
    private qs: QueueService,
    private fb: FormBuilder
  ) {
    this.model.secondItemPosition = String(qs.queueLength);

    this.selectedRadioToItemPosition = {
      get 1() { return '1' },
      get 2() { return String(qs.queueLength) },
      get 3() { return '' }
    }
  }

  isFirstItemPositionLabelDisabled() {
    return this.model.selectedRadio1 !== 3
  }

  isSecondItemPositionLabelDisabled() {
    return this.model.selectedRadio2 !== 3
  }

  processSwapping() {
    if (!this.qs.queueLength) {
      alert("The queue is emty! Nothing to swap");
      return;
    }

    const firstItemPosition = +this.model.firstItemPosition;
    const secondItemPosition = +this.model.secondItemPosition;

    if (
      firstItemPosition < 1 || firstItemPosition > this.qs.queueLength ||
      secondItemPosition < 1 || secondItemPosition > this.qs.queueLength
    ) {
      alert(`Items positions are out of range. Expected from 1 to ${this.qs.queueLength}`);
      return;
    }

    this.qs.swapQueueItems(firstItemPosition - 1, secondItemPosition - 1);
  }

  ngOnInit(): void {
    this.swappingItemsForm = this.fb.group({
      firstItemPosition: [{ value: this.model.firstItemPosition, disabled: this.isFirstItemPositionLabelDisabled() }, [Validators.required, Validators.pattern(/^-?\d+$/)]],
      selectedRadio1: [this.model.selectedRadio1],
      secondItemPosition: [{ value: this.model.secondItemPosition, disabled: this.isSecondItemPositionLabelDisabled() }, [Validators.required, Validators.pattern(/^-?\d+$/)]],
      selectedRadio2: [this.model.selectedRadio2]
    })

    this.subscriptions.push(
      this.firstItemPosition.valueChanges.subscribe(newValue => { this.model.firstItemPosition = newValue }),
      this.selectedRadio1.valueChanges.subscribe(newValue => {
        Object.assign(this.model, { selectedRadio1: newValue, firstItemPosition: this.selectedRadioToItemPosition[newValue] || this.model.firstItemPosition })
        this.firstItemPosition.setValue(this.selectedRadioToItemPosition[this.model.selectedRadio1] || this.firstItemPosition.value)

        this.firstItemPosition[
          this.isFirstItemPositionLabelDisabled() ?
          'disable' :
          'enable'
        ]();
      }),

      this.secondItemPosition.valueChanges.subscribe(newValue => { this.model.secondItemPosition = newValue }),
      this.selectedRadio2.valueChanges.subscribe(newValue => {
        Object.assign(this.model, { selectedRadio2: newValue, secondItemPosition: this.selectedRadioToItemPosition[newValue] || this.model.secondItemPosition })
        this.secondItemPosition.setValue(this.selectedRadioToItemPosition[this.model.selectedRadio2] || this.secondItemPosition.value)

        this.secondItemPosition[
          this.isSecondItemPositionLabelDisabled() ?
          'disable' :
          'enable'
        ]();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
