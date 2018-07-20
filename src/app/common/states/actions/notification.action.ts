import {Action} from '@ngrx/store';
import {Route} from '../../models/route';

export type PlannedRouteActions = 'UPDATE_ROUTE';
export const UPDATE_ROUTE: PlannedRouteActions = 'UPDATE_ROUTE';

export class PlannedRouteAction implements Action {
  type: PlannedRouteActions;
}

export class UpdatePlannedRoute extends PlannedRouteAction {
  readonly type = UPDATE_ROUTE;
  data: Route;

  constructor(data: Route) {
    super();
    this.data = data;
  }
}
