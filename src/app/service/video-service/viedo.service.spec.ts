import { TestBed } from '@angular/core/testing';

import { ViedoService } from './viedo.service';

describe('ViedoService', () => {
  let service: ViedoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViedoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
