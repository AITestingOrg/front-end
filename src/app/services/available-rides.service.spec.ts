import { TestBed, inject } from '@angular/core/testing';

import { AvailableRidesService } from './available-rides.service';

describe('AvailableRidesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableRidesService]
    });
  });

  it('should be created', inject([AvailableRidesService], (service: AvailableRidesService) => {
    expect(service).toBeTruthy();
  }));
});
