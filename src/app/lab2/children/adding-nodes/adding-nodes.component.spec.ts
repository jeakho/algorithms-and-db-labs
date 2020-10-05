import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingNodesComponent } from './adding-nodes.component';

describe('AddingNodesComponent', () => {
  let component: AddingNodesComponent;
  let fixture: ComponentFixture<AddingNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
