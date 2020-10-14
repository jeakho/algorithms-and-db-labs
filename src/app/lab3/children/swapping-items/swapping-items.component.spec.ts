import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwappingItemsComponent } from './swapping-items.component';

describe('SwappingItemsComponent', () => {
  let component: SwappingItemsComponent;
  let fixture: ComponentFixture<SwappingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwappingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwappingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
