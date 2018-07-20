import {PlannedRouteAction, UpdatePlannedRoute} from '../actions/notification.action';
import {Route} from '../../models/route';

const initialState: Route = new Route();
initialState.cost = 0;
initialState.distance = 0;
initialState.duration = 0;

export function notificationReducer(state: Route = initialState, action: PlannedRouteAction): Route {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      return (action as UpdatePlannedRoute).data;

    default:
      return state;
  }
}
