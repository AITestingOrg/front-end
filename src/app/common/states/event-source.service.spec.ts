import { TestBed, inject } from '@angular/core/testing';
import { EventSourceService } from './event-source.service';
import EventSourceMock, { sources } from 'eventsourcemock';

describe('EventSourceService', () => {
  let eventSourceService: EventSourceService;
  let uri: string;

  beforeEach(() => {
    uri = 'http://localhost:1234/events';
    const mockEventSource = new EventSourceMock(uri);
    TestBed.configureTestingModule({
      providers: [EventSourceService]
    });
    eventSourceService = TestBed.get(EventSourceService);
    spyOn(eventSourceService, 'forUrl').and.returnValue(mockEventSource);
  });

  it('should be created', inject([EventSourceService], (service: EventSourceService) => {
    expect(service).toBeTruthy();
  }));
});
