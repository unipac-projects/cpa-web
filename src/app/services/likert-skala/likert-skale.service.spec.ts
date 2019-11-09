import { TestBed } from '@angular/core/testing';

import { LikertSkaleService } from './likert-skale.service';

describe('LikertSkaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikertSkaleService = TestBed.get(LikertSkaleService);
    expect(service).toBeTruthy();
  });
});
