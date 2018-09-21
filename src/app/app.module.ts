import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routes, RouterModule} from '@angular/router';
import {FeCommonModule} from './common/common.module';
import {AppComponent} from './app.component';
import {LoginComponent} from 'app/common/components/smart/login/login.component';
import {TripPlannerComponent} from 'app/passengers/components/smart/trip-planner/trip-planner.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {PlacesAutocompleteComponent} from 'app/passengers/components/presentation/places-autocomplete/places-autocomplete.component';
import {StoreModule} from '@ngrx/store';
import {MatInputModule} from '@angular/material';
import {GMapsDirectionsService} from 'app/common/states/gmaps.service';
import {NotificationService} from 'app/common/states/notification.service';
import {EventSourceService} from 'app/common/states/event-source.service';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {reducers} from './action-reducer-map';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FormsModule} from '@angular/forms';
import { AuthenticationService } from './common/states/authentication.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: TripPlannerComponent}
];

@NgModule({
  declarations: [
    AppComponent, TripPlannerComponent, PlacesAutocompleteComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FeCommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-A_VJjmiAKM-xwZpv7RdxDKkV5hzMh4Y',
      libraries: ['places']
    }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  exports: [
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    GoogleMapsAPIWrapper, GMapsDirectionsService, NotificationService, EventSourceService, AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
