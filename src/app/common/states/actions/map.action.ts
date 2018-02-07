import { Action } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Map } from 'app/common/models/map';

export const ADD_LOCATION = 'Add Location';
export const ACTION_2 = '';
export const ACTION_3 = '';

export class AddLocation implements Action {
  readonly type = ADD_LOCATION;

  constructor(public payload: Map) {}
}

export class Action2 implements Action {
  readonly type = ACTION_2;

  constructor(public payload: Map) {}
}

export class Action3 implements Action {
  readonly type = ACTION_3;

  constructor(public payload: string) {}
}

export type Actions = AddLocation | Action2 | Action3;
