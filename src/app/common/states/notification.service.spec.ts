import { TestBed, inject } from '@angular/core/testing';
import EventSourceMock, { sources } from 'eventsourcemock';
import { NotificationService } from './notification.service';
import {EventSourceService} from './event-source.service';
import {Store, StoreModule} from '@ngrx/store';
import {reducers} from '../../action-reducer-map';
import {UpdatePlannedRoute} from './actions/notification.action';

describe('NotificationService', () => {
  const DEFAULT_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  let uri: string;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    uri = 'http://localhost:1234/events';
    const mockEventSource = new EventSourceMock(uri);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [NotificationService, EventSourceService]
    });
    const eventSourceService = TestBed.get(EventSourceService);
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(eventSourceService, 'forUrl').and.returnValue(mockEventSource);
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  function mockNotificationEvent(key: string, body: object) {
    return new MessageEvent('', {
      data: JSON.stringify({
        RoutingKey: key,
        Body: body
      })
    });
  }

  it('should use the EventSourceService', () => {
    const eventSourceService = TestBed.get(EventSourceService);
    const service = TestBed.get(NotificationService);

    service.onInit();

    expect(eventSourceService.forUrl).toHaveBeenCalled();
  });

  it('should respond correctly to EventSource failing', () => {

    const service = TestBed.get(NotificationService);
    const eventSourceService = TestBed.get(EventSourceService);
    spyOn(service, 'bindToNotificationEventSource').and.callThrough();
    //spyOn(eventSourceService, 'forUrl');

    service.onInit();
    sources[uri].emitError(new Event(null, null));

    expect(eventSourceService.forUrl).toHaveBeenCalledTimes(2);
    expect(service.bindToNotificationEventSource).toHaveBeenCalledTimes(1);
  });

  it('should be able to update the app state', () => {
    // Arrange
    const store = TestBed.get(Store);
    const service = TestBed.get(NotificationService);
    const source = sources[uri];
    const expectedCost = 1234.56;
    let body = {
      cost: expectedCost,
      origin: null,
      destination: null,
      distance: 0,
      duration: 0
    };
    const message = mockNotificationEvent(NotificationService.ESTIMATED_PRICE, body);

    // Act
    source.emitOpen();
    source.emitMessage(message);

    // Assert
    expect(service._isActive).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new UpdatePlannedRoute(body));
  });
});
