import { TestBed } from '@angular/core/testing';

import { GestionTempsService } from './gestion-temps.service';

describe('GestionTempsService', () => {
  let service: GestionTempsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTempsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
