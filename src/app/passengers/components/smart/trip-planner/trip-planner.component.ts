import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GMapsDirectionsService } from 'app/common/states/gmaps.service';
import { } from '@types/googlemaps';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { error } from 'util';

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
  @Input() private origin: any;
  @Input() private destinationInput: FormControl;
  @Input() private destinationOutput: FormControl;
  @Input() private destination: any;
  @Input() private estimatedTime: any;
  @Input() private estimatedDistance: any;
  @Input() private initialLat: number;
  @Input() private initialLng: number;

  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild(GMapsDirectionsService) service: GMapsDirectionsService;

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef) {
  }

  ngOnInit() {
    // Set Default Map View
    this.setInitialCords().then((cords) => {
        this.latitude = cords.lat;
        this.longitude = cords.lng;
        this.zoom = 14;
        console.log('set lat and lng')
      })
      .catch((error) => {
        console.log(error);
      });

    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    // Update Map View
    this.setCurrentPosition();

    // Load Autocomplete for Inputs
    this.mapsAPILoader.load().then(() => {
      const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ['address']
      });

      const autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ['address']
      });
      this.setupPlaceChangedListener(autocompleteInput, 'pickup');
      this.setupPlaceChangedListener(autocompleteOutput, 'destination');
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  private setupPlaceChangedListener(autocomplete:any, inputType:string) {
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined) {
          return;
        }
        if (inputType === 'pickup') {
          this.service.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.service.originPlaceId = place.place_id;
        } else {
          this.service.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.service.destinationPlaceId = place.place_id;
        }
        if (this.service.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.service.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }
        this.service.updateDirections();
        this.zoom = 12;
      });
    });
  }

  getDistanceAndDuration() {
    this.estimatedTime = this.service.estimatedTime;
    this.estimatedDistance = this.service.estimatedDistance;
  }

  setInitialCords() {
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
