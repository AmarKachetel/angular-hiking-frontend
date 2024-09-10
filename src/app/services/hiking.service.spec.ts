import { TestBed } from '@angular/core/testing';

import { HikingService } from './hiking.service';

describe('HikingService', () => {
  let service: HikingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
