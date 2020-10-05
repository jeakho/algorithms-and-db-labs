import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersectingListsComponent } from './intersecting-lists.component';

describe('IntersectingListsComponent', () => {
  let component: IntersectingListsComponent;
  let fixture: ComponentFixture<IntersectingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntersectingListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersectingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
