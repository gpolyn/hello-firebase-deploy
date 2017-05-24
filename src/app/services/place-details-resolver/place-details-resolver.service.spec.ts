import { TestBed, inject } from '@angular/core/testing';

import { PlaceDetailsResolverService } from './place-details-resolver.service';

describe('PlaceDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceDetailsResolverService]
    });
  });

  it('should ...', inject([PlaceDetailsResolverService], (service: PlaceDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
