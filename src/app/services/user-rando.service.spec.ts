import { TestBed } from '@angular/core/testing';

import { UserRandoService } from './user-rando.service';

describe('UserRandoService', () => {
  let service: UserRandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
