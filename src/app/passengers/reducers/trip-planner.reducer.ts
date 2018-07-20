import {
  CALCULATING_PRICE, FINDING_RIDE_REQUIRED,
  PRICE_CALCULATION_REQUIRED, SERVER_ERROR, TripPlannerAction,
  TripPlannerState,
  USER_LOCATION_INPUT_REQUIRED
} from '../actions/trip-planner.action';

export function tripPlannerStateReducer(state: TripPlannerState = USER_LOCATION_INPUT_REQUIRED, action: TripPlannerAction): TripPlannerState {
  switch (action.type) {
    case USER_LOCATION_INPUT_REQUIRED:
    case PRICE_CALCULATION_REQUIRED:
    case CALCULATING_PRICE:
    case SERVER_ERROR:
      return action.type as TripPlannerState;

    case FINDING_RIDE_REQUIRED: {
      // Workaround for TOOL-7543
      if (state === USER_LOCATION_INPUT_REQUIRED) return state;
      return action.type as TripPlannerState;
    }

    default:
      return state;
  }
}
