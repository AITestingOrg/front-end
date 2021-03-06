import { Injectable } from '@angular/core';
import * as EventSource from 'eventsource';
import {isNullOrUndefined} from 'util';

@Injectable()
export class EventSourceService {
  readonly TIME_BETWEEN_RETRIES = 3;
  private EventSource: any = window['EventSource'];
  private connections: any = {};
  constructor() { }

  forUrl(url: string, err: (EventSource) => void): EventSource {
    if (!isNullOrUndefined(this.connections[url]) && (this.connections[url].conn.readyState !== 2 && this.connections[url].err !== null))  {
      return this.connections[url];
    }

    const newCon = this.createEventStreamConnection(url, err);
    this.connections[url] = newCon;
    return newCon.conn;
  }

  _forUrl(url: string): EventSource {
    return new this.EventSource(url);
  }

  private createEventStreamConnection(url: string, err: (EventSource) => void) {
    const newCon = {
      conn: this._forUrl(url),
      errorHandler: err,
      errorHandlerCalled: false
    };

    newCon.conn.onerror = () => {
      if (newCon.errorHandlerCalled) {
        return;
      }
      newCon.errorHandlerCalled = true;
      console.log(`SSE Connection failed. Retrying in ${this.TIME_BETWEEN_RETRIES} seconds...`);
      let connection = this.connections[url];
      let timeoutCalled = false;
      setTimeout(() => {
        if (connection != null && !timeoutCalled) {
          timeoutCalled = true;
          // Manually close the instance, just in case it is still open (happens with ERR_CONNECTION_REFUSED)
          if (connection.conn.readyState !== 2) {
            connection.conn.close();
          }
          this.connections[url] = this.createEventStreamConnection(url, err);
          if (typeof connection.errorHandler === 'function') {
            connection.errorHandler(this.connections[url].conn);
          }

          connection = null;
        }
      }, this.TIME_BETWEEN_RETRIES * 1000, this);
    };
    return newCon;
  }
}
