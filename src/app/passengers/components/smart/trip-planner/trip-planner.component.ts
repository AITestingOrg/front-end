import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GMapsDirectionsService } from 'app/common/services/gmaps.service';
import { APIGatewayService } from 'app/common/services/api-gateway.service';
import { } from '@types/googlemaps';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { error } from 'util';
import { MessageService } from 'app/common/services/message.service';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {

  title: string = 'Trip Planner';

  @Input() private latitude: number;
  @Input() private longitude: number;
  @Input() private zoom: number;
  @Input() private pickupTextboxValue : any;
  @Input() private destinationTextboxValue: any;
  private destinationInput: FormControl;
  private destinationOutput: FormControl;
  private estimatedTime: any;
  private estimatedDistance: any;
  private directionsDisplay: any;
  private message: String;
  private originLocation:any;
  private destinationLocation:any;

  @ViewChild(GMapsDirectionsService) service: GMapsDirectionsService;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private apiGatewayService: APIGatewayService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    // Set Default Map View
    this.setInitialCords().then((cords) => {
        this.latitude = cords.lat;
        this.longitude = cords.lng;
        this.zoom = 14;
      })
      .catch((error) => {
        console.log(error);
      });
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    // Update Map View
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      this.service.directionsDisplay = new google.maps.DirectionsRenderer;
    });
  }

  onConfirmClick(event) {
    this.originLocation = this.apiGatewayService.getLatLng(this.pickupTextboxValue);
    this.destinationLocation = this.apiGatewayService.getLatLng(this.destinationTextboxValue);
    Promise.all([this.originLocation, this.destinationLocation]).then(values => {
      this.service.updateDirections(values[0], values[1], this.service.directionsDisplay);      
    })
  }

  onFindRideClick(event) {
    this.router.navigateByUrl('/pick-driver');
  }

  onPickupTextChange(event) {}
  
  onDestinationTextChange(event) {}

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  getDistanceAndDuration() {
    this.estimatedTime = this.service.estimatedTime;
    this.estimatedDistance = this.service.estimatedDistance;
  }

  setInitialCords(): any {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
      } else {
        reject(new Error('No geolocation found in API.'))
      }
    });
  }
}
