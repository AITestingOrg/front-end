import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { GMapsDirectionsService } from 'app/common/states/gmaps.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as MapActions from 'app/common/states/actions/map.action';
import * as MapReducer from 'app/common/states/reducers/map.reducer';
import { Map } from 'app/common/models/map';
import { Route } from 'app/common/models/route';
import { Location } from 'app/common/models/location';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { HttpClientModule } from '@angular/common/http';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';

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
  @Input() private pickupTextboxValue: any;
  @Input() private destinationTextboxValue: any;
  @Input() private destinationInput: FormControl;
  @Input() private destinationOutput: FormControl;
  private estimatedTime: any;
  private estimatedDistance: any;
  private geocoder: any;
  directionsDisplay: any;
  originLatitude: Observable<number>;
  originLongitude: Observable<number>;
  origin: Location;

  tripplanner: Observable<Route>;
  testlocation: Observable<any>;

  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild(GMapsDirectionsService) service: GMapsDirectionsService;

  constructor(
    private store: Store<MapReducer.State>,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private http : HttpClient,
    //private gmapsservice: GMapsDirectionsService
  ) {
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
      const autocompleteInput2 = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ['address']
      });

      const autocompleteOutput2 = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ['address']
      });
      this.setupPlaceChangedListener(autocompleteInput2, 'pickup');
      this.setupPlaceChangedListener(autocompleteOutput2, 'destination');
    });
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

  private setupPlaceChangedListener(autocomplete: any, inputType: string) {
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

  setInitialCords(): any {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
      } else {
        reject(new Error('No geolocation found in API.'));
      }
    });
  }

  onFindRideClick(event) {
    const pickupAddress = this.pickupTextboxValue;
    const destinationAddress = this.destinationTextboxValue;
    this.service.getGeocodeFromAddress(pickupAddress, this.geocoder);
    this.service.getGeocodeFromAddress(destinationAddress, this.geocoder);
    // TODO:
    // Use Service to Plan Route
    // this.origin = this.service.getGeocodeFromAddress(pickupAddress, this.geocoder);
    // this.destination = this.service.getGeocodeFromAddress(destinationAddress, this.geocoder);
    // Dispatch Action
    const map = new Map(this.origin);
    this.store.dispatch(new MapActions.AddLocation(map));
  }

  getTripEstimate(event){
    var res;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('front-end:front-end')
    });

    const data = "grant_type=password&scope=webclient&username=passenger&password=password";

    const options = {
      headers,
      withCredentials: true
    }; 

   this.http.post('http://localhost:32798/auth/oauth/token', data, options).subscribe(res => {
     if(res){
       localStorage.setItem("accessToken", JSON.parse(JSON.stringify(res)).access_token)
     }
   })
   this.postToCalculstionService()
}
// Request to communicate with calculation service via JWT token
  postToCalculstionService = function(){
    const token = localStorage.getItem("accessToken");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
    });

    const resOptions = {
    headers,
    withCredentials: true
    };

    const inputElem = JSON.stringify({
    "origin": this.pickupInputElementRef.nativeElement.value,
    "destination": this.pickupOutputElementRef.nativeElement.value,
    "userId": "560c62f4-8612-11e8-adc0-fa7ae01bbebc",
    })
    console.log(inputElem)

    this.http.post('http://localhost:8080/api/calculationservice/api/v1/cost',inputElem, resOptions).subscribe(res=> {
      if(res){
        console.log(JSON.parse(JSON.stringify(res)))
      }
    })
  }

  //To-Do: Disable "Find Ride" until inputs are validated
  validateInputs() {
    return this.pickupTextboxValue != null && this.destinationTextboxValue != null;
  }
}
