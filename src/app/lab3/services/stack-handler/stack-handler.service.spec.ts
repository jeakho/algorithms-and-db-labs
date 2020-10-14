import { TestBed } from '@angular/core/testing';

import { StackHandlerService } from './stack-handler.service';

describe('StackHandlerService', () => {
  let service: StackHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
