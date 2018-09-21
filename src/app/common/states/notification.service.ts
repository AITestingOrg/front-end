import {Injectable, NgZone} from '@angular/core';
import {Observable,  BehaviorSubject } from 'rxjs';

import * as EventSource from 'eventsource';
import { EventSourceService } from './event-source.service';
import {Store} from '@ngrx/store';
import {UpdatePlannedRoute} from './actions/notification.action';
import {State} from '../../action-reducer-map';
import {Route} from '../models/route';
import { map, filter } from 'rxjs/operators';

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
  private _subscription = null;

  constructor(
    private passengerStore: Store<State>,
    private eventSourceService: EventSourceService,
    private zone: NgZone
  ) {
    this.subject = new BehaviorSubject<any>({ RoutingKey: NotificationService.NOTHING, Data: new Route() });
    this.onInit();
  }

  onInit(): void {
    const currNotificationService = this;
    const userId = localStorage.getItem('userId');
    this.bindToNotificationEventSource(this.eventSourceService.forUrl(`http://localhost:32700/events?stream=${userId}`,
        eventSource => this.bindToNotificationEventSource.call(currNotificationService, eventSource)));
    this.listenForRouteUpdates();
  }

  private bindToNotificationEventSource(eventSource: EventSource): void {
    this.notificationEvents = eventSource;
    this.notificationEvents.onopen = _ => {
      this._isActive = true;
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
    return this.subject.asObservable().pipe(filter(value => {
      return routingKey.test(value['RoutingKey']);
    })).pipe(map(value => {
      return value['Body'];
    }));
  }

  listenForRouteUpdates() {
    this._subscription = this.newObservableForKey(NotificationService.ESTIMATED_PRICE).subscribe(next => {
<<<<<<< HEAD
=======
      // console.log(next);
>>>>>>> f250b11444550038776a8fd990e7671d7c8ee9ac
      this.passengerStore.dispatch(new UpdatePlannedRoute(next as Route));
    });
  }
}

