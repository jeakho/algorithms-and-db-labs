import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab10Component } from './lab10.component';

describe('Lab10Component', () => {
  let component: Lab10Component;
  let fixture: ComponentFixture<Lab10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
