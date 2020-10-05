import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingNodesComponent } from './moving-nodes.component';

describe('MovingNodesComponent', () => {
  let component: MovingNodesComponent;
  let fixture: ComponentFixture<MovingNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
