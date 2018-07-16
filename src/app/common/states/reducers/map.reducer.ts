import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Map } from 'app/common/models/map';
import * as MapActions from 'app/common/states/actions/map.action';

export interface State extends EntityState<Map> {
  currentMapId: string | null;
}

export const adapter: EntityAdapter<Map> = createEntityAdapter<Map>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currentMapId: null,
});

export function mapReducer(
  state = initialState,
  action: MapActions.Actions
): State {
  switch (action.type) {
    case MapActions.ADD_LOCATION:
      return {
        ...adapter.addOne(action.payload, state),
        currentMapId: state.currentMapId,
      };
    default: {
      return state;
    }
  }
}

export const getCurrentMapId = (state: State) => state.currentMapId;
