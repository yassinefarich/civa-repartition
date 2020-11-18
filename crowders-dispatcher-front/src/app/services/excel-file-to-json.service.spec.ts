import { TestBed } from '@angular/core/testing';

import { ExcelFileToJsonService } from './excel-file-to-json.service';

describe('ExcelFileToJsonService', () => {
  let service: ExcelFileToJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelFileToJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
