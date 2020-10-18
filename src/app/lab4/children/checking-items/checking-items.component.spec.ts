import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingItemsComponent } from './checking-items.component';

describe('CheckingItemsComponent', () => {
  let component: CheckingItemsComponent;
  let fixture: ComponentFixture<CheckingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
