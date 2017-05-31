import { TestBed, inject } from '@angular/core/testing';

import { SelectedPlaceTypeService } from './selected-place-type.service';

describe('SelectedPlaceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedPlaceTypeService]
    });
  });

  it('should ...', inject([SelectedPlaceTypeService], (service: SelectedPlaceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
