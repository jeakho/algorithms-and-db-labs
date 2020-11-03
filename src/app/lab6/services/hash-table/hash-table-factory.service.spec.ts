import { TestBed } from '@angular/core/testing';

import { HashTableFactoryService } from './hash-table-factory.service';

describe('HashTableFactoryService', () => {
  let service: HashTableFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashTableFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
