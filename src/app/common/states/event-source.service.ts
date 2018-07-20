import { Injectable } from '@angular/core';
import * as EventSource from 'eventsource';
import {isNullOrUndefined} from 'util';

@Injectable()
export class EventSourceService {
  private EventSource: any = window['EventSource'];
  private connections: any = {};
  constructor() { }

  forUrl(url: string, err: (EventSource) => void): EventSource {
    if (!isNullOrUndefined(this.connections[url]) && (this.connections[url].conn.readyState !== 2 && this.connections[url].err !== null)) return this.connections[url];
    let newCon = this.createEventStreamConnection(url, err);
    this.connections[url] = newCon;
    return newCon.conn;
  }

  private createEventStreamConnection(url: string, err: (EventSource) => void) {
    let newCon = {
      conn: new this.EventSource(url),
      errorHandler: err,
      errorHandlerCalled: false
    };

    newCon.conn.onerror = () => {
      if (newCon.errorHandlerCalled) {
        return;
      }
      newCon.errorHandlerCalled = true;
      console.log('SSE Connection failed. Retrying in 5 seconds...');
      let connection = this.connections[url];
      let timeoutCalled = false;
      setTimeout(() => {
        if (connection != null && !timeoutCalled) {
          timeoutCalled = true;
          this.connections[url] = this.createEventStreamConnection(url, err);
          connection.errorHandler(this.connections[url]);
          connection = null;
        }
      }, 5000, this);
    };
    return newCon;
  }
}
