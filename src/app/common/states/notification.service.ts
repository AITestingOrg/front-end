import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as EventSource from 'eventsource';
import { EventSourceService } from './event-source.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {
  public static ESTIMATED_PRICE = 'notification.trip.estimatecalculated';
  public static NOTHING = 'nothing';

  private static regexpForRoutingKey(key: string): RegExp {
    // Per AMQP spec 0-9-1 Section 3.1.3.3
    //
    // The routing key used for a topic exchange MUST consist of zero or more words delimited by dots. Each
    // word may contain the letters A-Z and a-z and digits 0-9.
    // The routing pattern follows the same rules as the routing key with the addition that * matches a single
    // word, and # matches zero or more words.
    // todo: implement above when we actually need it
    return new RegExp(key.replace('.', '\\.'));
  }

  private notificationEvents: EventSource;
  private subject: BehaviorSubject<any>;
  private _isActive = false;

  constructor(
    private eventSourceService: EventSourceService,
    private zone: NgZone
  ) {
    this.onInit();
  }

  onInit(): void {
    this.subject = new BehaviorSubject<any>({ RoutingKey: NotificationService.NOTHING, Data: null });
    this.notificationEvents = this.eventSourceService.forUrl(`http://localhost:32700/events?stream=${this.userId()}`);
    this.notificationEvents.onopen = _ => {
      this._isActive = true;
    };

    this.notificationEvents.onerror = _ => {
      this._isActive = false;
      console.log('SSE Connection failed. Retrying in 1 second...');
      setTimeout(() => {
        const currNotificationService = this;
        this.onInit.call(currNotificationService);
      }, 1000, this);
    };

    this.notificationEvents.onmessage = e => {
      const data = JSON.parse((e as MessageEvent).data);
      this.zone.run(() => {
        this.subject.next(data);
      });
    };
  }

  private newObservableForKey(key: string): Observable<any> {
    console.log(`Registering key: ${key}`);
    const routingKey = NotificationService.regexpForRoutingKey(key);
    return this.subject.asObservable().filter(value => {
      return routingKey.test(value['RoutingKey']);
    }).map(value => {
      return value['Body'];
    });
  }

  getCurrentPriceEstimate(updateCallback: () => void): Observable<string> {
      // Setup Notification server-side event code
    const observable = this.newObservableForKey(NotificationService.ESTIMATED_PRICE);
    return observable.map(val => {
      updateCallback();
      return val['cost'].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    });
  }

  private userId() {
      return '560c62f4-8612-11e8-adc0-fa7ae01bbebc';
  }
}

