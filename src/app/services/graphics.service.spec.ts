import { TestBed } from '@angular/core/testing';

import { GraphicsService } from './graphics.service';

describe('GraphicsService', () => {
  let service: GraphicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
