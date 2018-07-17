import { TestBed, inject } from '@angular/core/testing';
import EventSourceMock, { sources } from 'eventsourcemock';
import { NotificationService } from './notification.service';
import {EventSourceService} from './event-source.service';

describe('NotificationService', () => {
  let uri: string;

  beforeEach(() => {
    uri = 'http://localhost:1234/events';
    const mockEventSource = new EventSourceMock(uri);

    TestBed.configureTestingModule({
      providers: [NotificationService, EventSourceService]
    });
    const eventSourceService = TestBed.get(EventSourceService);
    spyOn(eventSourceService, 'forUrl').and.returnValue(mockEventSource);
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a price estimate observable', inject([NotificationService], (service: NotificationService) => {
    expect(service.getCurrentPriceEstimate(() => {})).toBeTruthy();
  }));
});
