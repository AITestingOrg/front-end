import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GMapsDirectionsService } from 'app/common/states/gmaps.service';
import { } from '@types/googlemaps';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { error } from 'util';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Route } from 'app/common/models/route';
import { SELECT_ORIGIN, SELECT_DESTINATION, PLAN_ROUTE } from 'app/common/states/reducers/trip-router.reducer';

interface AppState {
  tripplanner: Route;
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
  @Input() private origin: any;
  @Input() private destinationInput: FormControl;
  @Input() private destinationOutput: FormControl;
  @Input() private destination: any;
  @Input() private estimatedTime: any;
  @Input() private estimatedDistance: any;
  @Input() private initialLat: number;
  @Input() private initialLng: number;
  @Input() private pickupTextboxValue: any;
  @Input() private destinationTextboxValue: any;
  private geocoder: any;

  tripplanner: Observable<Route>;

  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild(GMapsDirectionsService) service: GMapsDirectionsService;

  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private gmapsservice: GMapsDirectionsService
  ) {
      this.tripplanner = this.store.select<Route>(AppState => AppState.tripplanner);
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

  getLatandLong(callback, address) {
    address = address || '416 Sailboat Circle';
    this.geocoder = new google.maps.Geocoder();
    if (this.geocoder) {
      this.geocoder.geolocation({
        'address': address
      },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            callback(results[0]);
          }
        })
    }
  }

  selectOrigin(event) {
    console.log("Selected origin");
    //Save origin input as place id
    this.service.origin;
    this.pickupTextboxValue;
    this.store.dispatch({ type: SELECT_ORIGIN });
  }

  selectDestination() {
    //Save destination as place id
    //Route trip with service
    this.store.dispatch({ type: SELECT_DESTINATION });
  }

  planRoute() {
    this.store.dispatch({ type: PLAN_ROUTE });
  }

  showResult(result) {
    console.log("Lat: " + result.geometry.location.lat() + " Lng: " + result.geometry.location.lng());
  }

  onFindRideClick(event) {
    var address = this.pickupTextboxValue;
    this.getLatandLong(this.showResult, address);
  }

  location : string;
  result : any;

  findLocation(): void {
    this.location = this.pickupTextboxValue;
    this.gmapsservice.getLocation(this.location)
        .then((response) => 
        this.result = response.results[0])
        .catch((error) => 
        console.error(error));
}
  
}
