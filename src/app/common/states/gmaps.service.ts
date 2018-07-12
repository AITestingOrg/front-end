import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from 'app/common/models/location';

declare var google: any;

@Directive({
  selector: '[appDirectionsService]'
})
export class GMapsDirectionsServiceDirective {

  @Input() origin: any;
  @Input() destination: any;
  @Input() originPlaceId: any;
  @Input() destinationPlaceId: any;
  @Input() wayPoints: any;
  @Input() directionsDisplay: any;
  @Input() estimatedTime: any;
  @Input() estimatedDistance: any;

  constructor(
    private gmapsApi: GoogleMapsAPIWrapper,
    private http: Http) { }

  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      // Prepare Map and Display Settings
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }

      const directionsService = new google.maps.DirectionsService;
      const service = this;
      const origin = new google.maps.LatLng({ lat: this.origin.latitude, lng: this.origin.longitude });
      const destination = new google.maps.LatLng({ lat: this.destination.latitude, lng: this.destination.longitude });

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor: '#00468c'
        }
      });

      // Update Display
      this.directionsDisplay.setDirections({ routes: [] });

      // Determine Directions
      // Request
      directionsService.route({
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        avoidHighways: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      },
      // Response
      function (response: any, status: any) {
        if (status === 'OK') {
          service.directionsDisplay.setDirections(response);
          map.setZoom(30);
          const point = response.routes[0].legs[0];
          service.estimatedTime = point.duration.text;
          service.estimatedDistance = point.distance.text;
          console.log('Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')');
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  }

  private getcomputeDistance(origin: any, destination: any) {
    return (google.maps.geometry.spherical.computeDistanceBetween(origin, destination) / 1000).toFixed(2);
  }

  getLocation(address: string, geocoder: any): Observable<any> {
    console.log('Getting address: ', address);
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}

getGeocodeFromAddress(address, geocoder) {
  address = address || '416 Sailboat Circle';
  geocoder = new google.maps.Geocoder();
 if (geocoder) {
   geocoder.geocode({
     'address': address
   },
     function (results, status) {
       if (status === google.maps.GeocoderStatus.OK) {
         // this.getLocationFromResult(results[0]); //*
         const result = results[0];
         const lat = result.geometry.location.lat();
         const lng = result.geometry.location.lng();
         const id = result.place_id;
         const formatted_address = result.formatted_address;
         const resultLocation = new Location(lat, lng, formatted_address, id);
         console.log('Location is: ' + resultLocation.formatted_address + ' with ID: ' + resultLocation.place_id);
       }
     });
 }
}

getLocationFromGeocode(result) {
  const lat = result.geometry.location.lat();
  const lng = result.geometry.location.lng();
  const id = result.place_id;
  const address = result.formatted_address;
  return new Location(lat, lng, address, id);
}

}
