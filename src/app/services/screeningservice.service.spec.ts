import { TestBed } from '@angular/core/testing';

import { ScreeningserviceService } from './screeningservice.service';

describe('ScreeningserviceService', () => {
  let service: ScreeningserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreeningserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
