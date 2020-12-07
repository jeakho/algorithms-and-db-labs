import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab11Component } from './lab11.component';

describe('Lab11Component', () => {
  let component: Lab11Component;
  let fixture: ComponentFixture<Lab11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
