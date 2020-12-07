import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDrawerComponent } from './tree-drawer.component';

describe('TreeDrawerComponent', () => {
  let component: TreeDrawerComponent;
  let fixture: ComponentFixture<TreeDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
