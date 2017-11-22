import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';

declare var google: any;

@Directive({
  selector: 'directions-service'
})

export class GMapsDirectionsService {

  @Input() origin: any;
  @Input() destination: any;
  @Input() originPlaceId: any;
  @Input() destinationPlaceId: any;
  @Input() waypoints: any;
  @Input() directionsDisplay: any;
  @Input() estimatedTime: any;
  @Input() estimatedDistance: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      //Prepare Map and Display Settings
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }

      var directionsService = new google.maps.DirectionsService;
      var service = this;
      var origin = new google.maps.LatLng({ lat: this.origin.latitude, lng: this.origin.longitude });
      var destination = new google.maps.LatLng({ lat: this.destination.latitude, lng: this.destination.longitude });

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor: '#00468c'
        }
      });

      //Update Display
      this.directionsDisplay.setDirections({ routes: [] });

      //Determine Directions
      //Request
      directionsService.route({
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        avoidHighways: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, 
      //Response
      function (response: any, status: any) {
        if (status === 'OK') {
          service.directionsDisplay.setDirections(response);
          map.setZoom(30);
          var point = response.routes[0].legs[0];
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
}
