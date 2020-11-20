import { TestBed } from '@angular/core/testing';

import { CrowdersDispatcherService } from './crowders-dispatcher.service';

describe('DispatcherService', () => {
  let service: CrowdersDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdersDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
