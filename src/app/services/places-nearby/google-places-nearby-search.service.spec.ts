import { TestBed, inject } from '@angular/core/testing';

import { GooglePlacesNearbySearchService } from './google-places-nearby-search.service';

describe('GooglePlacesNearbySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglePlacesNearbySearchService]
    });
  });

  it('should ...', inject([GooglePlacesNearbySearchService], (service: GooglePlacesNearbySearchService) => {
    expect(service).toBeTruthy();
  }));
});
