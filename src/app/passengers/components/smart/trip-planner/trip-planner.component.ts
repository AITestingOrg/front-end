import {Component, OnInit, Input, ElementRef, NgZone, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {GMapsDirectionsService} from 'app/common/states/gmaps.service';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as MapActions from 'app/common/states/actions/map.action';
import * as MapReducer from 'app/common/states/reducers/map.reducer';
import {Map} from 'app/common/models/map';
import {Route} from 'app/common/models/route';
import {Location} from 'app/common/models/location';
import {NotificationService} from '../../../../common/states/notification.service';
import {isNullOrUndefined} from 'util';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';

enum TripState {
  USER_LOCATION_INPUT_REQUIRED,
  PRICE_CALCULATION_REQUIRED,
  CALCULATING_PRICE,
  FINDING_RIDE_REQUIRED,
  SERVER_ERROR
}

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
  private estimatedTime: Observable<number>;
  private estimatedDistance: Observable<number>;
  estimatedPrice: Observable<string>;
  private geocoder: any;
  directionsDisplay: any;
  originLatitude: Observable<number>;
  originLongitude: Observable<number>;
  origin: Location;

  private destLocation: string = null;
  private pickupLocation: string  = null;

  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild(GMapsDirectionsService) service: GMapsDirectionsService;
  interactionState: TripState = TripState.USER_LOCATION_INPUT_REQUIRED;

  constructor(
    private store: Store<MapReducer.State>,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private notificationService: NotificationService,
    // private gmapsservice: GMapsDirectionsService
    private http: HttpClient
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

    this.estimatedPrice = this.notificationService.getCurrentPriceEstimate();
    this.estimatedTime = this.notificationService.getCurrentTimeEstimate();
    this.estimatedPrice.subscribe(next => {
      if (!isNullOrUndefined(next)) {
        if (this.interactionState === TripState.CALCULATING_PRICE || this.interactionState === TripState.SERVER_ERROR) {
          this.interactionState = TripState.FINDING_RIDE_REQUIRED;
        } else {
          console.warn(`Refusing to transition UI state to ${TripState.FINDING_RIDE_REQUIRED} from ${this.interactionState}`);
        }
      } else {
        this.interactionState = TripState.SERVER_ERROR;
        console.warn('The notification service encountered an error communicating');
      }
    });
  }

  onPickupTextChange(event) {
    this.pickupLocation = null;
  }

  onDestinationTextChange(event) {
    this.destLocation = null;
  }

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
          this.service.origin = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
          this.service.originPlaceId = place.place_id;
          this.pickupLocation = place.place_id;
        } else {
          this.service.destination = {longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat()};
          this.service.destinationPlaceId = place.place_id;
          this.destLocation = place.place_id;
        }
        if (this.service.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.service.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        if (this.pickupLocation !== null && this.destLocation !== null) {
          this.interactionState = TripState.PRICE_CALCULATION_REQUIRED;
        } else {
          this.interactionState = TripState.USER_LOCATION_INPUT_REQUIRED;
        }

        this.service.updateDirections();
        this.zoom = 12;
      });
    });
  }

  setInitialCords(): any {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({lat: position.coords.latitude, lng: position.coords.longitude});
        });
      } else {
        reject(new Error('No geolocation found in API.'));
      }
    });
  }

  onFindRideClick(event) {
    if (this.findYourRideButtonDisabled()) return;

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

  // To-Do: Disable "Find Ride" until inputs are validated
  getTripEstimate(e) {
    if (this.tripEstimateButtonDisabled()) return;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('front-end:front-end')
    });

    const data = 'grant_type=password&scope=webclient&username=passenger&password=password';

    const options = {
      headers,
      withCredentials: true
    };

    this.interactionState = TripState.CALCULATING_PRICE;
    this.http.post('http://localhost:32933/auth/oauth/token', data, options).subscribe(res => {
      if (res) {
        localStorage.setItem('accessToken', (res as any).access_token);
        this.postToCalculationService();
      }
    }, err => {
      this.interactionState = TripState.SERVER_ERROR;
      console.warn(`Failed to communicate with the user service. Err: ${err}`);
    });
  }

// Request to communicate with calculation service via JWT token
  postToCalculationService() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const resOptions = {
      headers,
      withCredentials: true,
      responseType: 'text' as 'text'
    };

    const inputElem = JSON.stringify({
      'origin': this.pickupInputElementRef.nativeElement.value,
      'destination': this.pickupOutputElementRef.nativeElement.value,
      'userId': '560c62f4-8612-11e8-adc0-fa7ae01bbebc'
    });

    this.http.post('http://localhost:8080/api/calculationservice/api/v1/cost', inputElem, resOptions).subscribe(() => {}, err => {
      this.interactionState = TripState.SERVER_ERROR;
      console.warn(`Failed to communicate with edge service. Err: ${JSON.stringify(err)}`);
    });
  };

  // To-Do: Disable "Find Ride" until inputs are validated
  validateInputs(): boolean {
    return (TripPlannerComponent.validateInput(this.destinationInput.value) || TripPlannerComponent.validateInput(this.pickupTextboxValue)) &&
      (TripPlannerComponent.validateInput(this.destinationOutput.value) || TripPlannerComponent.validateInput(this.destinationTextboxValue));
  }

  private static validateInput(controlValue: string): boolean {
    return controlValue !== null && controlValue !== '';
  }

  tripEstimateButtonDisabled(): boolean {
    return this.interactionState != TripState.PRICE_CALCULATION_REQUIRED && this.interactionState != TripState.SERVER_ERROR;
  }

  findYourRideButtonDisabled() {
    return this.interactionState !== TripState.FINDING_RIDE_REQUIRED;
  }

  isPriceEstimateAvailable() {
    return this.interactionState === TripState.FINDING_RIDE_REQUIRED;
  }

  isCalculatingPrice(): boolean {
    return this.interactionState === TripState.CALCULATING_PRICE;
  }

  isWaitingForUserInput(): boolean {
    return this.interactionState ===  TripState.USER_LOCATION_INPUT_REQUIRED;
  }

  isWaitingForPricingCalculationRequest(): boolean {
    return this.interactionState === TripState.PRICE_CALCULATION_REQUIRED;
  }

  encounteredServerError(): boolean {
    return this.interactionState === TripState.SERVER_ERROR;
  }
}
