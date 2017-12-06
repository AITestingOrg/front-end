import { Action, combineReducers } from '@ngrx/store';
import { Location } from 'app/common/models/location';

export interface AppState {
  route: Location[];
}

export const reducers = {
};


export function reducer(state: AppState, action: Action) {
}