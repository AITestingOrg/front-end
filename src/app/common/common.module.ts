import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TextBoxComponent } from './components/presentation/text-box/text-box.component';
import { LoginComponent } from './components/smart/login/login.component';
import { CheckBoxComponent } from './components/presentation/check-box/check-box.component';
import { ToolbarComponent } from './components/presentation/toolbar/toolbar.component';
import { RaisedButtonComponent } from './components/presentation/raised-button/raised-button.component';
import { BasicButtonComponent } from './components/presentation/basic-button/basic-button.component';
import { IconButtonComponent } from './components/presentation/icon-button/icon-button.component';
import { GMapsDirectionsService} from './states/gmaps.service';
import { MatToolbarModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatIconModule, MatCardModule, MatAutocompleteModule } from '@angular/material';
import { HeaderComponent } from './components/presentation/header/header.component';
import { GetEstimateButtonComponent } from './components/presentation/get-estimate-button/get-estimate-button.component';

@NgModule({
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatCardModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatAutocompleteModule, 
    AgmCoreModule, 
    RouterModule
  ],
  declarations: [
    TextBoxComponent, 
    LoginComponent, 
    CheckBoxComponent, 
    ToolbarComponent, 
    RaisedButtonComponent, 
    BasicButtonComponent, 
    IconButtonComponent, 
    GMapsDirectionsService, 
    HeaderComponent, GetEstimateButtonComponent
  ],
  exports: [
    ToolbarComponent, 
    MatCardModule,
    GetEstimateButtonComponent,
    RaisedButtonComponent, 
    ReactiveFormsModule, 
    MatAutocompleteModule, 
    GMapsDirectionsService, 
    HeaderComponent,
    TextBoxComponent,
    FormsModule
  ],
})

export class FeCommonModule { }
