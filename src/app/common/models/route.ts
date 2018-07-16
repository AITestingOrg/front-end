import { Location } from 'app/common/models/location';

export class Route {
  origin: Location;
  destination: Location;
  distance: number;
  duration: number;
  cost: number;
}
