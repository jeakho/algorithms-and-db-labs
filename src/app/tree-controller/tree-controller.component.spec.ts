import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeControllerComponent } from './tree-controller.component';

describe('TreeControllerComponent', () => {
  let component: TreeControllerComponent;
  let fixture: ComponentFixture<TreeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
