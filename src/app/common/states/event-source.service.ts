import { Injectable } from '@angular/core';
import * as EventSource from 'eventsource';

@Injectable()
export class EventSourceService {
  private EventSource: any = window['EventSource'];
  constructor() { }

  forUrl(url: string): EventSource {
    console.log(`creating event source for ${url}`);
    return new this.EventSource(url);
  }
}
