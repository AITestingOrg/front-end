import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as EventSource from 'eventsource';
import { EventSourceService } from './event-source.service';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class NotificationService {
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
    this.subject = new BehaviorSubject<any>({ RoutingKey: 'nothing', Data: null });
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
    const routingKey = new RegExp(key.replace('.', '\\.'));
    return this.subject.asObservable().filter(value => {
      return value['RoutingKey'] === 'all' || routingKey.test(value['RoutingKey']);
    }).map(value => {
      return value['Body'];
    });
  }

  getCurrentPriceEstimate(updateCallback: () => void): Observable<string> {
      // Setup Notification server-side event code
    const observable = this.newObservableForKey('notification.trip.estimatecalculated');
    return observable.map(val => {
      updateCallback();
      return val['cost'].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    });
  }

  private userId() {
      return '560c62f4-8612-11e8-adc0-fa7ae01bbebc';
  }
}

