import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOperationsComponent } from './other-operations.component';

describe('OtherOperationsComponent', () => {
  let component: OtherOperationsComponent;
  let fixture: ComponentFixture<OtherOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
