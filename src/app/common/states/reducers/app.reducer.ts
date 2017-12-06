import * as AppActions from 'app/common/states/actions/app.action';
import { State } from '@ngrx/store';
import { Route } from 'app/common/models/route';

export type Action = AppActions.All;

export function reducer(state, action: Action): State<Route> {
  switch(action.type) {
    case AppActions.DTN_ROUTE: {
      return state;
    }
    default: {
      return state;
    }
  }
}