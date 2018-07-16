import { TestBed, inject } from '@angular/core/testing';

import { EventSourceService } from './event-source.service';
import { EventSource as EventSourceMock, sources } from 'eventsourcemock';

describe('EventSourceService', () => {
  let eventSourceService: EventSourceService;
  let uri: string;

  beforeEach(() => {
    uri = 'localhost:1234/events';
    sources[uri].emitOpen();
    TestBed.configureTestingModule({
      providers: [EventSourceService]
    });
    eventSourceService = TestBed.get(EventSourceService);
    spyOn(eventSourceService, 'forUrl').and.returnValue(new EventSourceMock(uri))
  });

  it('should be created', inject([EventSourceService], (service: EventSourceService) => {
    expect(service).toBeTruthy();
  }));
});
