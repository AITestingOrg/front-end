import { ActionReducer, Action } from '@ngrx/store';
import { Route } from 'app/common/models/route';

export const SELECT_ORIGIN = 'SELECT_ORIGIN';
export const SELECT_DESTINATION = 'SELECT_DESTINATION';
export const PLAN_ROUTE = 'PLAN_ROUTE';
export const RESET = 'RESET';

export const tripRouterReducer: ActionReducer<Route> = (state: Route, action: Action) => {
    switch (action.type) {
        case SELECT_ORIGIN:
            return new Route;
        case SELECT_DESTINATION:
            return new Route;
        case PLAN_ROUTE:
            return new Route;
        default:
            return state;
    }
};