import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as EventSource from 'eventsource';
import {EventSourceService} from './event-source.service';

@Injectable()
export class NotificationService {
  private notificationEvents: EventSource;

  constructor(
    private eventSourceService: EventSourceService
  ) {
    this.onInit()
  }

  onInit(): void {
    this.notificationEvents = this.eventSourceService.forUrl("http://localhost:32700/test.php");
    this.notificationEvents.onopen = _ => {
      console.log('SSE Connection opened');
    };
  }

  getCurrentPriceEstimate(): Observable<string> {
      // Setup Notification server-side event code
    console.log(this);
      return new Observable((obs) => {
        this.notificationEvents.onerror = _ => {
          obs.error();
          console.log('SSE Connection failed')
        };

        this.notificationEvents.onmessage = e => {
          console.log(e);
          const data = JSON.parse((e as MessageEvent).data);
          const price: number = Number.parseFloat(data.price);
          const priceString: string = price.toLocaleString('en-US', {style: 'currency', currency: 'USD' });
          console.log(priceString);

          obs.next(priceString);
        };

        const service = this;
        return { unsubscribe() { service.notificationEvents.close(); }};
      });
    }

  private userId() {
      return 'all';
    }
}

