import {Action} from '@ngrx/store';
import {Route} from '../../common/models/route';

export type TripPlannerState = 'USER_LOCATION_INPUT_REQUIRED' |  'PRICE_CALCULATION_REQUIRED' |
  'CALCULATING_PRICE' |  'FINDING_RIDE_REQUIRED' | 'SERVER_ERROR';
export const USER_LOCATION_INPUT_REQUIRED: TripPlannerState = 'USER_LOCATION_INPUT_REQUIRED';
export const PRICE_CALCULATION_REQUIRED: TripPlannerState = 'PRICE_CALCULATION_REQUIRED';
export const CALCULATING_PRICE: TripPlannerState = 'CALCULATING_PRICE';
export const FINDING_RIDE_REQUIRED: TripPlannerState = 'FINDING_RIDE_REQUIRED';
export const SERVER_ERROR: TripPlannerState = 'SERVER_ERROR';



export class TripPlannerAction implements Action {
  type: TripPlannerState;

  constructor(type: TripPlannerState) {
    this.type = type;
  }
}
