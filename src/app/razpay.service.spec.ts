import { TestBed } from '@angular/core/testing';

import { RazpayService } from './razpay.service';

describe('RazpayService', () => {
  let service: RazpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
