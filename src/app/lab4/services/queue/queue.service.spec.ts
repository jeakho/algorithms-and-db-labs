import { TestBed } from '@angular/core/testing';

import { QueueHandlerService } from './queue.service';

describe('QueueHandlerService', () => {
  let service: QueueHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
