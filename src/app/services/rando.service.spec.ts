import { TestBed } from '@angular/core/testing';

import { RandoService } from './rando.service';

describe('RandoService', () => {
  let service: RandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
