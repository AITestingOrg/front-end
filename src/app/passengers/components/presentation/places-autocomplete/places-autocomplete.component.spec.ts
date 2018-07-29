import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesAutocompleteComponent } from './places-autocomplete.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PlacesAutocompleteComponent', () => {
  let component: PlacesAutocompleteComponent;
  let fixture: ComponentFixture<PlacesAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesAutocompleteComponent ],
      imports: [ FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
