import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovingNodesComponent } from './removing-nodes.component';

describe('RemovingNodesComponent', () => {
  let component: RemovingNodesComponent;
  let fixture: ComponentFixture<RemovingNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovingNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovingNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
