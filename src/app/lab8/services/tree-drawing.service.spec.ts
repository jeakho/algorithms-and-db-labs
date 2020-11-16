import { TestBed } from '@angular/core/testing';

import { TreeDrawingService } from './tree-drawing.service';

describe('TreeDrawingService', () => {
  let service: TreeDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
