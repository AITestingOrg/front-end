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
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {GMapsDirectionsService} from 'app/common/states/gmaps.service';
import {HttpModule} from '@angular/http';
import {NotificationService} from 'app/common/states/notification.service';
import {EventSourceService} from 'app/common/states/event-source.service';
import 'rxjs/add/operator/map';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {reducers} from './action-reducer-map';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import 'rxjs/add/operator/map';

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
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    GoogleMapsAPIWrapper, GMapsDirectionsService, NotificationService, EventSourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
