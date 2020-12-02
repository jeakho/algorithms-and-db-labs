import { TestBed } from '@angular/core/testing';

import { BinaryTreeService } from './binary-tree.service';

describe('BinaryTreeService', () => {
  let service: BinaryTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinaryTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
