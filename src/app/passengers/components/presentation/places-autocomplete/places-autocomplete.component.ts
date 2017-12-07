import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Location } from 'app/common/models/location'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from 'app/common/models/route'
import 'rxjs/add/operator/startWith'; 
import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements OnInit {

  myGroup: FormGroup;
  myControl: FormControl = new FormControl();

  constructor() {
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

}
