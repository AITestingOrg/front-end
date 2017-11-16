import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GMapsDirectionsDirective } from 'app/common/states/gmaps.directive';
import { } from '@types/googlemaps';
import { Address } from 'app/common/models/address';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {

  title: string = 'Trip Planner';

  @Input() private address: Address
  @Input() private latitude: number;
  @Input() private longitude: number;
  @Input() private zoom: number;
  @Input() private origin: any;
  @Input() private destinationInput: FormControl;
  @Input() private destinationOutput: FormControl;
  @Input() private destination: any;
  @Input() private iconurl: string;
  @Input() private estimatedTime: any;
  @Input() private estimatedDistance: any;

  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  @ViewChild(GMapsDirectionsDirective) directive: GMapsDirectionsDirective;

  constructor(
    private ngZone: NgZone, 
    private mapsAPILoader: MapsAPILoader, 
    private gmapsApi: GoogleMapsAPIWrapper, 
    private _elementRef: ElementRef) {
  }

  ngOnInit() {
    //Default Map View
    this.latitude = 26.089595;
    this.longitude = -80.366791;
    this.zoom = 14;

    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    //Update Map View
    this.setCurrentPosition();
    
    //Load Autocomplete for Inputs
    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ["address"]
      });

      let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });
      this.setupPlaceChangedListener(autocompleteInput, 'pickup');
      this.setupPlaceChangedListener(autocompleteOutput, 'destination');
    });
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  private setupPlaceChangedListener(autocomplete:any, inputType:string) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined) {
          return;
        }
        if (inputType === 'pickup') {
          this.directive.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.directive.originPlaceId = place.place_id;
        } else {
          this.directive.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          this.directive.destinationPlaceId = place.place_id;
        }
        if (this.directive.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.directive.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }
        this.directive.updateDirections();
        this.zoom = 12;
      });
    });
  }

  getDistanceAndDuration() {
    this.estimatedTime = this.directive.estimatedTime;
    this.estimatedDistance = this.directive.estimatedDistance;
  }

  onFindRideClick(event) {
    console.log("Clicked find ride.");
  }

}
