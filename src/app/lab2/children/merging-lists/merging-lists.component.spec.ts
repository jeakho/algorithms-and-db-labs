import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergingListsComponent } from './merging-lists.component';

describe('MergingListsComponent', () => {
  let component: MergingListsComponent;
  let fixture: ComponentFixture<MergingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergingListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
