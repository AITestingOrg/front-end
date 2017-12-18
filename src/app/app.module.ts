import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FeCommonModule } from './common/common.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'app/common/components/smart/login/login.component';
import { DriverListComponent } from 'app/passengers/components/smart/driver-list/driver-list.component';
import { TripPlannerComponent } from 'app/passengers/components/smart/trip-planner/trip-planner.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { APIGatewayService } from 'app/common/services/api-gateway.service';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const routes:Routes = [ 
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: TripPlannerComponent},
    {path: 'pick-driver', component: DriverListComponent},
]

@NgModule({
  exports: [MatTableModule],
  declarations: [
    AppComponent, TripPlannerComponent, DriverListComponent
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
    HttpModule
  ],
  providers: [
    GoogleMapsAPIWrapper, APIGatewayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
