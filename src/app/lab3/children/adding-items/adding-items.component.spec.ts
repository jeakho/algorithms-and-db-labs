import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingItemsComponent } from './adding-items.component';

describe('AddingItemsComponent', () => {
  let component: AddingItemsComponent;
  let fixture: ComponentFixture<AddingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
