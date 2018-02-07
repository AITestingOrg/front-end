export class Location {
  latitude: number;
  longitude: number;
  formatted_address: string;
  place_id: any;

  constructor(latitude : number, longitude : number, address : string, id : any) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.formatted_address = address;
    this.place_id = id;
  }

}
