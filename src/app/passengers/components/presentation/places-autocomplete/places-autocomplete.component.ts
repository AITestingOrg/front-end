import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';



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
    .pipe(
      startWith(null)
    ).pipe(map(val => val ? this.filter(val) : this.options.slice()));
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
