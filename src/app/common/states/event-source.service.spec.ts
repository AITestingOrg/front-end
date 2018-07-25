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
    spyOn(eventSourceService, '_forUrl').and.returnValue(mockEventSource);
  });

  it('should be created', inject([EventSourceService], (service: EventSourceService) => {
    expect(service).toBeTruthy();
  }));

  it('should properly called the error handler', (done => {
    eventSourceService.forUrl(uri, (eventSource) => {
      expect(eventSource).toBeTruthy();
      done();
    });
    sources[uri].emitError(null);
  }));

  it('should properly ignore unspecified error handlers', (done => {
    eventSourceService.forUrl(uri, null);
    sources[uri].emitError(null);

    setTimeout(() => {
      done();
    }, 3500);
  }));

  it('should remember the connection after it is made', () => {
    eventSourceService.forUrl(uri, null);
    expect(eventSourceService['connections'][uri]).toBeTruthy();
  });
});
