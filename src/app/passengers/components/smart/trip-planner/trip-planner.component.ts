import {Component, OnInit, Input, ElementRef, NgZone, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {GMapsDirectionsService} from 'app/common/states/gmaps.service';
import {Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as MapActions from 'app/common/states/actions/map.action';
import * as MapReducer from 'app/common/states/reducers/map.reducer';
import {Map} from 'app/common/models/map';
import {Route} from 'app/common/models/route';
import {Location} from 'app/common/models/location';
import {NotificationService} from '../../../../common/states/notification.service';
import {isNullOrUndefined} from 'util';
import {HttpHeaders, HttpClient} from '@angular/common/http';
// noinspection ES6UnusedImports
import {} from '@types/googlemaps';
import {
  CALCULATING_PRICE,
  FINDING_RIDE_REQUIRED,
  PRICE_CALCULATION_REQUIRED,
  SERVER_ERROR,
  TripPlannerState,
  USER_LOCATION_INPUT_REQUIRED
} from '../../../actions/trip-planner.action';


interface AppState {
  tripPlannerState: TripPlannerState;
  routePlan: Route;
}

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {

  title = 'Trip Planner';

  @Input() private latitude: number;
  @Input() private longitude: number;
  @Input() private zoom: number;
  @Input() private pickupTextboxValue: any;
  @Input() private destinationTextboxValue: any;
  @Input() private destinationInput: FormControl;
  @Input() private destinationOutput: FormControl;
  private isFirstClick = true;
  private address: string;
  private geocoder: any;
  private estimatedTime: Observable<number>;
  private estimatedDistance: Observable<number>;
  estimatedPrice: Observable<string>;
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
  interactionState: Observable<TripPlannerState>;
  currentRoutePlan: Observable<Route>;
  private tripEstimateButtonDisabled: boolean;
  private findYourRideButtonDisabled: boolean;

  constructor(
    private store: Store<MapReducer.State>,
    private passengerStore: Store<AppState>,
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
    this.interactionState = this.passengerStore.select('tripPlannerState');
    this.currentRoutePlan = this.passengerStore.select('routePlan');

    this.currentRoutePlan.pipe(map(val => {
      console.log(val.cost);
    }));

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

    this.estimatedPrice = this.getCurrentPriceEstimate$();
    this.estimatedTime = this.getCurrentTimeEstimate$();
    this.estimatedPrice.subscribe(next => {
      if (!isNullOrUndefined(next)) {
        this.updateInteractionState(FINDING_RIDE_REQUIRED);
      } else {
        this.updateInteractionState(SERVER_ERROR);
        console.warn('The notification service encountered an error communicating');
      }
    });
  }

  private updateInteractionState(type: TripPlannerState) {
    this.passengerStore.dispatch({type: type});
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
        this.updateLocations(inputType, place);
      });
    });
  }

  private updateLocations(inputType: string, place) {
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
      this.updateInteractionState(PRICE_CALCULATION_REQUIRED);
    } else {
      this.updateInteractionState(USER_LOCATION_INPUT_REQUIRED);
    }

    this.service.updateDirections();
    this.zoom = 12;
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
    if (this.findYourRideButtonDisabled) {
      return;
    }

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

<<<<<<< HEAD
  getTripEstimate(event) {
    this.updateInteractionState(CALCULATING_PRICE);
    this.postToCalculationService();
  }

=======
>>>>>>> f250b11444550038776a8fd990e7671d7c8ee9ac
  getGeoCode($event) {
    const lat = $event.coords.lat;
    const lng = $event.coords.lng;
    const latlng = {lat: lat, lng: lng};
<<<<<<< HEAD
=======

>>>>>>> f250b11444550038776a8fd990e7671d7c8ee9ac
    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location': latlng}, (res, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        } else {
          this.callback(res[0]);
        }
    });
  }

  callback(result: google.maps.GeocoderResult) {
    this.ngZone.run(() => {
      if (this.isFirstClick) {
        this.pickupInputElementRef.nativeElement.value = result.formatted_address;
        this.updateLocations('pickup', result);
        this.isFirstClick = false;
      } else {
        this.pickupOutputElementRef.nativeElement.value = result.formatted_address;
        this.updateLocations('dest', result);
        this.isFirstClick = true;
      }
<<<<<<< HEAD
=======
    });
}


  getTripEstimate(event) {
    // authPort is in reference to the port that user-service is running on
    // Until user-service is configured we will have to hit directly user service to get JWT token to contact edge-service
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('front-end:front-end')
    });

    const data = 'grant_type=password&scope=webclient&username=passenger&password=password';

    const options = {
      headers,
      withCredentials: true
    };

    this.updateInteractionState(CALCULATING_PRICE);
    this.http.post(`http://localhost:8080/api/userservice/auth/oauth/token`, data, options).subscribe(res => {
      if (res) {
        localStorage.setItem('accessToken', (res as any).access_token);
        this.postToCalculationService();
      }
    }, err => {
      this.updateInteractionState(SERVER_ERROR);
      console.warn(`Failed to communicate with the user service. Err: ${JSON.stringify(err)}`);
>>>>>>> f250b11444550038776a8fd990e7671d7c8ee9ac
    });
 }

// Request to communicate with calculation service via JWT token
  postToCalculationService() {
    const headers = this.requestHeaders('application/json', 'Bearer');
    const resOptions = {
      headers,
      withCredentials: true,
      responseType: 'text' as 'text'
    };
<<<<<<< HEAD
=======

>>>>>>> f250b11444550038776a8fd990e7671d7c8ee9ac

    const inputElem = JSON.stringify({
      'origin': this.pickupInputElementRef.nativeElement.value,
      'destination': this.pickupOutputElementRef.nativeElement.value,
      'userId': localStorage.getItem('userId')
    });

    this.http.post('http://edgeservice:8080/api/calculationservice/api/v1/cost', inputElem, resOptions).subscribe(() => {}, err => {
      this.updateInteractionState(SERVER_ERROR);
      console.warn(`Failed to communicate with edge service. Err: ${JSON.stringify(err)}`);
    });
  }

  requestHeaders(contentType, authorization: string): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Content-Type': contentType,
      'Authorization': `${authorization} ${token}`
    });
  }

  isTripEstimateButtonDisabled$(): Observable<boolean> {
    return this.interactionState
      .pipe(map(state => state !== PRICE_CALCULATION_REQUIRED && state !== SERVER_ERROR)).pipe(
        filter(val => {
          this.tripEstimateButtonDisabled = val;
          return val;
        })
      );
  }

  isFindYourRideButtonDisabled$(): Observable<boolean> {
    return this.interactionState
      .pipe(map(state => state !== FINDING_RIDE_REQUIRED)).pipe(
        filter(val => {
          this.findYourRideButtonDisabled = val;
          return val;
        })
      );
  }

  private getCurrentPriceEstimate$() {
    return this.currentRoutePlan.pipe(map(val => val.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })));
  }

  private getCurrentTimeEstimate$() {
    return this.currentRoutePlan.pipe(map(route => route.duration));
  }
}
