import { TestBed } from '@angular/core/testing';

import { RepartitionService } from './repartition.service';

describe('DispatcherService', () => {
  let service: RepartitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepartitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
