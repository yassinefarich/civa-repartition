import { TestBed } from '@angular/core/testing';

import { SimulationsService } from './simulations.service';

describe('SimulationDataSetService', () => {
  let service: SimulationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
