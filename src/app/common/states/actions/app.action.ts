import { Action } from '@ngrx/store';
import { Location } from 'app/common/models/location'

export const DTN_ROUTE = 'Determine Route';
export const BGN_RIDE = 'Begin Ride';
export const END_RIDE = 'Begin Ride';

export class DetermineRoute implements Action {
  readonly type = DTN_ROUTE;
}

export class BeginRide implements Action {
  readonly type = BGN_RIDE;
}

export class EndRide implements Action {
  readonly type = END_RIDE;
}

export type All = DetermineRoute | BeginRide | EndRide;