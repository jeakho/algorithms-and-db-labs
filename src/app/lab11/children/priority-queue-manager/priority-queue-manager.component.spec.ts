import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityQueueManagerComponent } from './priority-queue-manager.component';

describe('PriorityQueueManagerComponent', () => {
  let component: PriorityQueueManagerComponent;
  let fixture: ComponentFixture<PriorityQueueManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityQueueManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityQueueManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
