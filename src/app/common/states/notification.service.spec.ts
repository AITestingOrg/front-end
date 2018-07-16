import { TestBed, inject } from '@angular/core/testing';
import { sources } from 'eventsourcemock';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  beforeEach(() => {
    sources['`http://localhost:32700/events?stream=all'].emitOpen();
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a price estimate observable', inject([NotificationService], (service: NotificationService) => {
    expect(service.getCurrentPriceEstimate()).toBeTruthy();
  }));
});
