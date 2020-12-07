import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeapSortManagerComponent } from './heap-sort-manager.component';

describe('HeapSortManagerComponent', () => {
  let component: HeapSortManagerComponent;
  let fixture: ComponentFixture<HeapSortManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeapSortManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeapSortManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
