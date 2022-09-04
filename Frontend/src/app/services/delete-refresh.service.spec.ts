import { TestBed } from '@angular/core/testing';

import { DeleteRefreshService } from './delete-refresh.service';

describe('DeleteRefreshService', () => {
  let service: DeleteRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
