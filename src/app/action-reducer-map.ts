import {ActionReducerMap} from '@ngrx/store';
import {notificationReducer} from './common/states/reducers/notification.reducer';
import {Route} from './common/models/route';
import { TripPlannerState } from './passengers/actions/trip-planner.action';
import {tripPlannerStateReducer} from './passengers/reducers/trip-planner.reducer';

export interface State {
  tripPlannerState: TripPlannerState;
  routePlan: Route;
}

export const reducers: ActionReducerMap<State> = {
  tripPlannerState: tripPlannerStateReducer,
  routePlan: notificationReducer
};
