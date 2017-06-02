import { TestBed, inject } from '@angular/core/testing';

import { HourlyDataService } from './hourly-data.service';

describe('HourlyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HourlyDataService]
    });
  });

  it('should ...', inject([HourlyDataService], (service: HourlyDataService) => {
    expect(service).toBeTruthy();
  }));
});
