import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovingItemsComponent } from './removing-items.component';

describe('RemovingItemsComponent', () => {
  let component: RemovingItemsComponent;
  let fixture: ComponentFixture<RemovingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
