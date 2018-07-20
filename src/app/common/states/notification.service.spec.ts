import { TestBed, inject } from '@angular/core/testing';
import EventSourceMock, { sources } from 'eventsourcemock';
import { NotificationService } from './notification.service';
import {EventSourceService} from './event-source.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../action-reducer-map';

describe('NotificationService', () => {
  let uri: string;

  beforeEach(() => {
    uri = 'http://localhost:1234/events';
    const mockEventSource = new EventSourceMock(uri);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({reducers})
      ],
      providers: [NotificationService, EventSourceService]
    });
    const eventSourceService = TestBed.get(EventSourceService);
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

  it('should be able to update', (done) => {
    // Arrange
    const service = TestBed.get(NotificationService);
    const source = sources[uri];
    const expectedCost = 1234.56;
    const expectedCostString = expectedCost.toLocaleString('en-US', { currency: 'USD', style: 'currency' });
    const message = mockNotificationEvent(NotificationService.ESTIMATED_PRICE, {
      cost: expectedCost
    });

    // Act
    source.emitOpen();
    const observable = service.getCurrentPriceEstimate();
    observable.subscribe(val => {
      // Assert
      expect(val).toBe(expectedCostString);
      done();
    });

    source.emitMessage(message);
  });

  it('should use last available value', (done) => {
    // Arrange
    const service = TestBed.get(NotificationService);
    const source = sources[uri];
    const expectedCost = 1248.16;
    const expectedCostString = expectedCost.toLocaleString('en-US', { currency: 'USD', style: 'currency' });
    const messageA = mockNotificationEvent(NotificationService.ESTIMATED_PRICE, {
      cost: 0.01
    });
    const messageB = mockNotificationEvent(NotificationService.ESTIMATED_PRICE, {
      cost: expectedCost
    });

    // Act
    source.emitOpen();
    source.emitMessage(messageA);
    source.emitMessage(messageB);
    setTimeout(() => {
        const observable = service.getCurrentPriceEstimate();
        observable.subscribe(val => {
          // Assert
          expect(val).toBe(expectedCostString);
          done();
        });
      }, 1000);
  });
});
