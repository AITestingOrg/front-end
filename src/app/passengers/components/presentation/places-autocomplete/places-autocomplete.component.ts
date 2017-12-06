import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Location } from 'app/common/models/location'
import { RESET, DECREMENT, INCREMENT } from 'app/common/states/reducers/counter.reducer';
import { SELECT_ORIGIN, SELECT_DESTINATION } from 'app/common/states/reducers/trip-router.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from 'app/common/models/route'
import 'rxjs/add/operator/startWith'; 
import 'rxjs/add/operator/map'; 

interface AppState {
  counter: number;
  tripplanner: Route;
}

@Component({
  selector: 'app-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements OnInit {

  myGroup: FormGroup;
  myControl: FormControl = new FormControl();

  counter: Observable<number>;
  tripplanner: Observable<Route>;

  location = new Location();

  constructor(private store: Store<AppState>, private store2: Store<AppState>) {
    this.counter = this.store.select<number>(AppState => AppState.counter);
    this.tripplanner = this.store2.select<Route>(AppState => AppState.tripplanner);
  }

  options = [ 
    'One', 
    'Two', 
    'Three' 
   ]; 

   filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges 
    .startWith(null) 
    .map(val => val ? this.filter(val) : this.options.slice()); 
  }

  filter(val: string): string[] { 
    return this.options.filter(option => 
      option.toLowerCase().indexOf(val.toLowerCase()) === 0); 
  }

  // Testing Purposes only

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
		this.store.dispatch({ type: RESET });
  }

}
