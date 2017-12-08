import { Location } from 'app/common/models/location';

export class Map {

  currentPosition: Location;
  routeIsDisplayed: boolean;

  constructor(currentPosition: Location) {
    this.currentPosition = currentPosition;
  }

}
