import { TestBed, inject } from '@angular/core/testing';

import { RandomTypeRedirectionService } from './random-type-redirection.service';

describe('RandomTypeRedirectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomTypeRedirectionService]
    });
  });

  it('should ...', inject([RandomTypeRedirectionService], (service: RandomTypeRedirectionService) => {
    expect(service).toBeTruthy();
  }));
});
