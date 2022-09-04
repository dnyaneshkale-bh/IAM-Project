import { TestBed } from '@angular/core/testing';

import { RcaFormService } from './rca-form.service';

describe('RcaFormService', () => {
  let service: RcaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
