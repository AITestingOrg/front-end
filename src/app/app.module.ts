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
import { LoginAuthenticationService } from 'app/services/login-authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AvailableRidesComponent } from './drivers/components/smart/available-rides/available-rides.component';
import { AvailableRidesService } from 'app/services/available-rides.service';
import { TripCreatedComponent } from './passengers/components/smart/trip-created/trip-created/trip-created.component';

const routes:Routes = [ 
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: TripPlannerComponent},
    {path: 'driver-dashboard', component: AvailableRidesComponent},
    {path: 'trip-created', component: TripCreatedComponent}
]

@NgModule({
  declarations: [
    AppComponent, TripPlannerComponent, PlacesAutocompleteComponent, AvailableRidesComponent, TripCreatedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FeCommonModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-A_VJjmiAKM-xwZpv7RdxDKkV5hzMh4Y',
      libraries: ['places']
    }),
    StoreModule.forRoot({
    }),
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    GoogleMapsAPIWrapper, GMapsDirectionsService, LoginAuthenticationService, AvailableRidesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
