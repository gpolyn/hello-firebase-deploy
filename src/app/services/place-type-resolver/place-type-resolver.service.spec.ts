import { TestBed, inject } from '@angular/core/testing';

import { PlaceTypeResolverService } from './place-type-resolver.service';

describe('PlaceTypeResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceTypeResolverService]
    });
  });

  it('should ...', inject([PlaceTypeResolverService], (service: PlaceTypeResolverService) => {
    expect(service).toBeTruthy();
  }));
});
