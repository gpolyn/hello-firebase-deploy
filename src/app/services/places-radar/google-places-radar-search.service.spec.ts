import { TestBed, inject } from '@angular/core/testing';

import { GooglePlacesRadarSearchService } from './google-places-radar-search.service';

describe('GooglePlacesRadarSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglePlacesRadarSearchService]
    });
  });

  it('should ...', inject([GooglePlacesRadarSearchService], (service: GooglePlacesRadarSearchService) => {
    expect(service).toBeTruthy();
  }));
});
