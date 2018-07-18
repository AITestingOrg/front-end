import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FeCommonModule } from './common/common.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'app/common/components/smart/login/login.component';
import { TripPlannerComponent } from 'app/passengers/components/smart/trip-planner/trip-planner.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { PlacesAutocompleteComponent } from 'app/passengers/components/presentation/places-autocomplete/places-autocomplete.component';
import { StoreModule, Store } from '@ngrx/store';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { GMapsDirectionsService } from 'app/common/states/gmaps.service';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: TripPlannerComponent}
];

@NgModule({
  declarations: [
    AppComponent, TripPlannerComponent, PlacesAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FeCommonModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPs_IyBxZNsYKEh8JplMe8a91URajuqic',
      libraries: ['places']
    }),
    StoreModule.forRoot({
    }),
    MatFormFieldModule,
    MatInputModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    GoogleMapsAPIWrapper, GMapsDirectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
